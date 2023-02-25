import { createApp } from "vue";
import { createPinia } from "pinia";
import "vue-global-api";
import naive from "naive-ui";

import type Config from "@/types/Config";
import type Pisdeo_API from "@/types/Api";

import i18n from "./lang/i18n";

import App from "./App.vue";
import component from "./components/NexUI";

class Pisdeo {
    app = createApp(App);
    constructor(api: Pisdeo_API) {
        this.app.use(createPinia()).use(i18n).use(naive).use(component);
        this.provide("api", api);
    }

    mount(el: string | HTMLElement) {
        this.app.mount(el);
    }

    provide(key: string | Symbol, value: any) {
        this.app.provide(key, value);
    }

    unmount() {
        this.app.unmount();
    }
}

const api: Pisdeo_API = {
    getConfig: (reback: Function) => {
        reback(config);
    },
    setConfig: (newConfig: Config) => {
        config = newConfig;
    },
};

let config: Config = {
    init: false,
    configVersion: "Manual Build",
    language: "en_us",
    theme: "auto",
    updateCheck: true,
};

config = ""

const pisdeo = new Pisdeo(api);
pisdeo.mount("#_pisdeo");
