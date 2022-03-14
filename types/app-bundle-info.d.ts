declare module "app-bundle-info" {
    import { ReadStream } from "fs";
    type Callback<T> = (...args: ([Error, undefined] | [null, T])) => void;
    type iOSInformation = {
        CFBundleIdentifier: string;
        CFBundleDisplayName?: string;
        CFBundleName: string;
        CFBundleShortVersionString: string;
        CFBundleVersion: string;
    }
    type AndroidInformation = {
        package: string;
        versionName: string;
        versionCode: string;
    }
    
    export class iOS {
        type: 'ios';
        constructor(stream: ReadStream);
        loadInfo(cb: Callback<iOSInformation>);
        getIconFile(cb: Callback<ReadStream>);
    }
    
    export class Android {
        type: 'android';
        constructor(stream: ReadStream);
        loadInfo(cb: Callback<AndroidInformation>);
        getIconFile(cb: Callback<ReadStream>);
    }

    export function autodetect(stream: ReadStream, cb: Callback<(Android|iOS)>);
}
