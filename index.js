"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qr = void 0;
const core = require("@actions/core");
const fs = require("fs");
const glob = require("glob");
const ipa_bundler_1 = require("ipa-bundler");
const ABI = require("app-bundle-info");
const path = require("path");
const os = require("os");
const util_1 = require("util");
const path_1 = require("path");
const child_process_1 = require("child_process");
run().catch(console.error);
async function run() {
    const bucket = s3name(core.getInput("bucket", { required: true }));
    const destinationPath = core.getInput("destinationPath", { required: false }) || "/";
    const destinationUrl = core.getInput("destinationUrl", { required: false }) || `https://${bucket}.s3.amazonaws.com${path.join("/", destinationPath, "/")}`;
    const sourcePaths = core.getInput("sourcePaths", { required: true });
    // Temporary directory to collect files
    const dest = await (0, util_1.promisify)(fs.mkdtemp)(path.join(os.tmpdir(), "hubrise"));
    // Process each input file
    const files = await glop(sourcePaths, {});
    const data = await Promise.all(files.map((file, index) => handleFile(file, index).catch((e) => {
        console.error(`Failed to process file '${file}': ${e}`);
    })));
    const apps = data.filter((v) => v && true);
    // Write landing page
    console.log(data);
    await (0, util_1.promisify)(fs.writeFile)(path.join(dest, "index.json"), JSON.stringify(data, null, 2));
    await (0, util_1.promisify)(fs.writeFile)(path.join(dest, "index.html"), landing(apps, `${destinationUrl}/index.html`));
    core.setOutput("url", `${destinationUrl}/index.html`);
    // Sync dest to bucket
    const remote = `s3://${path.join(bucket, destinationPath)}`;
    console.log(`Syncing ${dest} to ${remote}`);
    await (0, util_1.promisify)(child_process_1.exec)(`aws s3 sync ${dest} ${remote} --acl public-read;`);
    // Processing of individual files
    async function handleFile(file, index) {
        // Read bundle info
        const bundle = await autodetect(fs.createReadStream(file)).catch((e) => { throw e; });
        // Drop to target
        const destFile = `${index}-${(0, path_1.basename)(file)}`;
        await (0, util_1.promisify)(fs.copyFile)(file, path.join(dest, destFile));
        const destUrl = new URL(destFile, destinationUrl).toString();
        // Write icon
        const icon = await parseImage(bundle);
        await (0, util_1.promisify)(fs.writeFile)(path.join(path.join(dest, `${index}-icon.${extension(icon)}`)), icon);
        // Write manifest
        if (bundle.type === "ios") {
            const info = await new Promise((r, e) => bundle.loadInfo((err, info) => err ? e(err) : r(info)));
            const details = {
                bundleIdentifier: info.CFBundleIdentifier,
                bundleVersion: info.CFBundleVersion,
                bundleMarketingVersion: info.CFBundleShortVersionString,
                appTitle: info.CFBundleDisplayName || info.CFBundleName,
            };
            await (0, util_1.promisify)(fs.writeFile)(path.join(path.join(dest, `${index}-manifest.plist`)), (0, ipa_bundler_1.manifest)(destUrl, { ...details, appIcon: icon }));
            return {
                ...details,
                appFile: file,
                urls: {
                    abi: destUrl,
                    manifest: new URL(`${index}-manifest.plist`, destinationUrl).toString(),
                    icon: new URL(`${index}-icon.${extension(icon)}`, destinationUrl).toString(),
                },
            };
        }
        else {
            const info = await new Promise((r, e) => bundle.loadInfo((err, info) => err ? e(err) : r(info)));
            return {
                bundleIdentifier: info.package,
                bundleVersion: info.versionCode || info.versionName,
                bundleMarketingVersion: info.versionName,
                appTitle: info.package,
                appFile: file,
                urls: {
                    abi: destUrl,
                    icon: new URL(`${index}-icon.${extension(icon)}`, destinationUrl).toString(),
                },
            };
        }
    }
}
function s3name(s3scheme) {
    if (s3scheme.startsWith("s3://")) {
        s3scheme = s3scheme.replace(/^s3:\/\/\/?/, "");
    }
    return s3scheme;
}
function autodetect(stream) {
    return new Promise((resolve, reject) => ABI.autodetect(stream, (err, data) => err ? reject(err) : resolve(data)));
}
function glop(glb, options) {
    return new Promise((resolve, reject) => glob(glb, {}, (err, paths) => err ? reject(err) : resolve(paths)));
}
function parseImage(bundle) {
    return new Promise((resolve, reject) => bundle.getIconFile((err, iconStream) => {
        if (err) {
            return reject(err);
        }
        var bufs = [];
        iconStream.on('data', (d) => bufs.push(d));
        iconStream.on('end', () => resolve(Buffer.concat(bufs)));
    }));
}
// https://stackoverflow.com/questions/27886677/javascript-get-extension-from-base64-image
function extension(buf) {
    switch (buf.slice(0, 2).toString("hex")) {
        case "ffd8": return "jpg";
        case "8950": return "png";
        default: return "unknown"; // probably not ideal
    }
}
function landing(data, rootUrl) {
    const items = data.map((options) => {
        const maybeImage = options.urls.icon ? `<img width=200 height=200 src="${options.urls.icon}" /> ` : "";
        const href = options.urls.manifest ? (0, ipa_bundler_1.link)(options.urls.manifest) : options.urls.abi;
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
function qr(url, size) {
    size = encodeURIComponent(size || "150");
    if (!url) {
        console.log("Usage: qr <url> <size>");
        process.exit(1);
    }
    else {
        return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;
    }
}
exports.qr = qr;
