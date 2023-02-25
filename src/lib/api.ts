import type Pisdeo_API from "@/types/Api";

let Api: Pisdeo_API = {
    getConfig: function () {
        throw new Error("Function not implemented.");
    },
    setConfig: function () {
        throw new Error("Function not implemented.");
    },
};

function setApi(api: Pisdeo_API) {
    Api = api;
}

function getApi() {
    return Api;
}

export default getApi;
export { getApi, setApi };
