import { defineStore } from 'pinia'
import type Config from "@/types/Config";
import Api from "../lib/api";

const defaultConfig: Config = {
    configVersion: "Manual Build",
    language: "en_us",
    theme: "auto",
    updateCheck: "ask",
};

export default defineStore('config', () => {
    const config = ref(defaultConfig)
    const init = ref(false)
    Api().getConfig((result: any) => {
        if (typeof result != 'object') {
            Api().setConfig(defaultConfig);
            config.value = defaultConfig
        } else {
            config.value = result
            console.log(result)
        }
    });

    function setConfig (config: Config) {
        Api().setConfig(config)
    }

    function setLang (lang: string) {
        config.value.language = lang
        Api().setConfig(config)
    }

    return { config, init, setConfig, setLang }
})
