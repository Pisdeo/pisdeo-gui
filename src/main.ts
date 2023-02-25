import { createApp } from "vue";
import { createPinia } from "pinia";
import "vue-global-api";
import naive from "naive-ui";

import i18n from "./lang/i18n";

import App from "./App.vue";

import "./assets/main.css";

class Pisdeo {
    app = createApp(App);
    constructor() {
        this.app.use(createPinia()).use(i18n).use(naive);
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

const config = {
    init: true,
    configVersion: "Manual Build",
    language: "en_us",
    theme: "auto",
    updateCheck: true,
};

const pisdeo = new Pisdeo();
pisdeo.provide("config", config);
pisdeo.mount("#_pisdeo");
