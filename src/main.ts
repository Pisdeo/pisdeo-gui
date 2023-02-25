import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "vue-global-api";
import naive from "naive-ui";

import App from './App.vue'

import './assets/main.css'

class Pisdeo {
	app = createApp(App)
	constructor(){
		this.app
			.use(createPinia())
			.use(naive)
	}

	mount (el: string | HTMLElement) {
		this.app.mount(el)
	}

    provide(key: string | Symbol, value: any) {
        this.app.provide(key, value);
    }

    unmount() {
        this.app.unmount();
    }
}

const config = {}

const pisdeo = new Pisdeo();
pisdeo.provide("config", config)
pisdeo.mount("#_pisdeo")