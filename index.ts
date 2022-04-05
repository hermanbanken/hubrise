import * as core from "@actions/core";
import * as fs from "fs";
import glob from "glob";
import { link, manifest } from "ipa-bundler";
import ABI = require('app-info-parser');
import * as path from "path";
import * as os from "os";
import { promisify } from "util";
import { basename } from "path";
import { exec } from "child_process";

type AppDetails = {
  bundleIdentifier: string;
  bundleVersion: string;
  bundleMarketingVersion: string;
  appTitle: string;
  appFile: string;
  urls: {
    abi: string;
    manifest?: string;
    icon: string;
  };
};

run().catch(console.error);
async function run() {
  const bucket = s3name(core.getInput("bucket", { required: true }));
  const destinationPath = core.getInput("destinationPath", { required: false }) || "/";
  const destinationUrl = core.getInput("destinationUrl", { required: false }) || `https://${bucket}.s3.amazonaws.com${path.join("/", destinationPath, "/")}`;
  const sourcePaths = core.getInput("sourcePaths", { required: true });
  const extraArgs = core.getInput("extraArgs", { required: false });
  
  // Temporary directory to collect files
  const dest = await promisify(fs.mkdtemp)(path.join(os.tmpdir(), "hubrise"));

  // Process each input file
  const files = await glop(sourcePaths, {});
  const data = await Promise.all(files.map((file, index) => handleFile(file, index).catch((e) => {
    console.error(`Failed to process file '${file}': ${e}`);
  })));
  const apps = data.filter((v): v is AppDetails => v && true);

  // Write landing page
  console.log(apps);
  const indexUrl = `${destinationUrl}index.html`;
  await promisify(fs.writeFile)(path.join(dest, "index.json"), JSON.stringify(apps, null, 2));
  await promisify(fs.writeFile)(path.join(dest, "index.html"), landing(apps, indexUrl));
  core.setOutput("url", indexUrl);

  // Sync dest to bucket
  if (process.env.SKIP_UPLOAD) {
    console.log("Skipping upload", dest);
    return;
  }
  const remote = `s3://${path.join(bucket, destinationPath)}`;
  console.log(`Syncing ${dest} to ${remote}`);
  await promisify(exec)(`aws s3 sync ${dest} ${remote} --acl public-read ${extraArgs};`);

  // Processing of individual files
  async function handleFile(file: string, index: number): Promise<AppDetails> {
    // Read bundle info
    const bundle = await (new ABI(file)).parse().catch((e) => { throw e; });

    // Drop to target
    const destFile = `${index}-${basename(file)}`;
    await promisify(fs.copyFile)(file,  path.join(dest, destFile));
    const destUrl = new URL(destFile, destinationUrl).toString();

    // Write icon
    const icon = await parseImage(bundle);
    await promisify(fs.writeFile)(path.join(path.join(dest, `${index}-icon.${extension(icon)}`)), icon);

    // Write manifest
    if ("CFBundleName" in bundle) {
      const info: ABI.iOS = bundle as ABI.iOS;
      const details = {
        bundleIdentifier: info.CFBundleIdentifier,
        bundleVersion: info.CFBundleVersion,
        bundleMarketingVersion: info.CFBundleShortVersionString,
        appTitle: info.CFBundleDisplayName || info.CFBundleName,
      };
      await promisify(fs.writeFile)(path.join(path.join(dest, `${index}-manifest.plist`)), manifest(destUrl, { ...details, appIcon: icon }));
      return {
        ...details,
        appFile: file,
        urls: {
          abi: destUrl,
          manifest: new URL(`${index}-manifest.plist`, destinationUrl).toString(),
          icon: new URL(`${index}-icon.${extension(icon)}`, destinationUrl).toString(),
        },
      }
    } else {
      const info: ABI.Android = bundle as ABI.Android;
      return {
        bundleIdentifier: info.package,
        bundleVersion: info.versionCode.toString() || info.versionName,
        bundleMarketingVersion: info.versionName,
        appTitle: info.package,
        appFile: file,
        urls: {
          abi: destUrl,
          icon: new URL(`${index}-icon.${extension(icon)}`, destinationUrl).toString(),
        },
      }
    }
  }
}

function s3name(s3scheme: string) {
  if (s3scheme.startsWith("s3://")) {
    s3scheme = s3scheme.replace(/^s3:\/\/\/?/, "");
  }
  return s3scheme;
}

function glop(glb: string, options: Parameters<typeof glob>[1]) {
  return new Promise<string[]>((resolve, reject) =>
    glob(glb, {}, (err, paths) => err ? reject(err) : resolve(paths)));
}


function parseImage(bundle: ABI.iOS | ABI.Android) {
  if (!bundle || !bundle.icon) return Buffer.alloc(0);
  return Buffer.from(bundle.icon.substring(bundle.icon.indexOf(",")), "base64");
}

// https://stackoverflow.com/questions/27886677/javascript-get-extension-from-base64-image
function extension(buf: Buffer) {
  switch (buf.slice(0, 2).toString("hex")) {
      case "ffd8": return "jpg";
      case "8950": return "png";
      default: return "unknown" // probably not ideal
  }
}

function landing(data: AppDetails[], rootUrl: string) {
  const items = data.map((options) => {
    const maybeImage = options.urls.icon ? `<img width=90 height=90 src="${options.urls.icon}" /> ` : "";
    const href = options.urls.manifest ? link(options.urls.manifest) : options.urls.abi;
    return `
<a href="${href}">
  ${maybeImage}
  <span class="caption">Install <span class="title">${options.appTitle}</span> (${options.bundleMarketingVersion} / ${options.bundleVersion})</span>
  <div><span class="file">${options.appFile}</span></div>
</a>`.trim();
  });
  return `
<div>
  <a href="${rootUrl}"><img src="${qr(rootUrl, 200)}" />
  Scan the QR to open this page on a mobile device.
</a></div>
<ul>${items.map((html) => `<li>${html}</li>`).join("")}</ul>
`.trim();
}

// Formats a QR code of a variable url & size
export function qr(url, size) {
  size = encodeURIComponent(size || "150");
  if (!url) {
    console.log("Usage: qr <url> <size>");
    process.exit(1);
  } else {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;
  }
}
