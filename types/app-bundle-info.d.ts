declare module "app-info-parser" {
    class AppInfoParser {
        constructor(ipaApk: string);
        parse(): Promise<AppInfoParser.iOS|AppInfoParser.Android>;
    }
    namespace AppInfoParser {
        type iOS = {
            CFBundleName: string;
            CFBundleDisplayName?: string;
            CFBundlePackageType: "APPL";
            CFBundleShortVersionString: string;
            CFBundleVersion: string;
            CFBundleIdentifier: string;
            mobileProvision: {
                Name: string;
                ProvisionsAllDevices: boolean;
            },
            icon: string;
        }
        type Android = {
            versionCode: number,
            versionName: string,
            package: string,
            icon: string;
        }
    }
    export = AppInfoParser;
}
