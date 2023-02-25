import type Config from "@/types/Config";
import Api from "./api";

const defaultConfig: Config = {
    init: false,
    configVersion: "Manual Build",
    language: "en_us",
    theme: "auto",
    updateCheck: "ask",
};

let userConfig: Config = defaultConfig;

async function getConfig(callback: any) {
    Api().getConfig((result: any) => {
        if (result == "") {
            console.log(1);
            Api().setConfig(defaultConfig);
            callback(defaultConfig);
        } else {
            console.log(2);
            userConfig = result;
            callback(userConfig);
        }
    });
}

async function setLocale(lang: string) {
    let reback;
    userConfig.language = lang;
    Api().setConfig(userConfig);
    return reback;
}

async function inited() {
    let reback;
    getConfig((result: Config) => {
        result.init = true;
        Api().setConfig(result);
    });
    return reback;
}

async function getSystemLocale() {
    let reback = "en_us";
    // if (platform === "desktop") {
    //     reback = await ipc.getLocale();
    // } else if (platform === "web") {
    reback = navigator.language;
    // }
    reback = reback.replace("-", "_").toLowerCase();
    return reback;
}

export { defaultConfig, getConfig, getSystemLocale, setLocale, inited };
