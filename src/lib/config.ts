import type Config from "@/types/Config";
import Api from "./api";

const defaultConfig: Config = {
    configVersion: "Manual Build",
    language: "en_us",
    theme: "auto",
    updateCheck: "ask",
};

let userConfig: Config = defaultConfig;

async function getConfig(callback: any) {
    Api().getConfig((result: any) => {
        if (typeof result != 'object') {
            Api().setConfig(defaultConfig);
            callback(defaultConfig, true);
        } else {
            userConfig = result;
            callback(userConfig, false);
        }
    });
}

async function setLang(lang: string) {
    let reback;
    userConfig.language = lang;
    Api().setConfig(userConfig);
    return reback;
}

function getEnvLang() {
    return Api().getEnvLang();
}

export { defaultConfig, getConfig, getEnvLang, setLang };
