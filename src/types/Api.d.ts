import type Config from "./Config";

type Pisdeo_API = {
    getConfig: (reback: Function) => any;
    setConfig: (config: Config) => any;
    [x: string]: any;
};
export default Pisdeo_API;
