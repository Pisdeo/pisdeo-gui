import NBtn from "./NBtn/NBtn";
import NInput from "./NInput/NInput";
import NWindow from "./NWindow/NWindow";

import "./Style/color.scss";

const component = {
    install: function(Vue: any) {
        Vue.component("n-btn", NBtn);
        // Vue.component("n-input", NInput);
        Vue.component("n-window", NWindow);
    },
};

export default component;
