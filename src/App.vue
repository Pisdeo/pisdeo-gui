<template>
    <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides" style="height: 100%">
        <KeepAlive>
            <Welcome v-if="page === 'Welcome'" @goStart="page = 'Start'" />
        </KeepAlive>
        <KeepAlive>
            <Start
                v-if="page === 'Start'"
                :isInit="startIsInit"
                :documentsPath="documentsPath"
                @createProject="createProject"
                @openSetting="page = 'Setting'"
                @open-local-project="openLocalProject"
            />
        </KeepAlive>
        <!-- <KeepAlive>
            <Setting
                v-show="page === 'Setting'"
                @goToStartPage="page = 'Start'"
                @sendCommand="SettingCommand"
            />
        </KeepAlive>
        <KeepAlive>
            <Project v-if="page === 'Project'" @goToStartPage="page = 'Start'" />
        </KeepAlive>
        <n-window :open="WindowOpen" @close="WindowOpen = false">
            <div class="solution-container">
                <div class="solution-title">{{ $t("start.choosesolution") }}</div>
                <div class="solution-list">
                    <div
                        v-for="item in solution"
                        :key="item.solutionName"
                        class="flex card rounded-lg p-4 shadow justify-between flex-col"
                    >
                        <div class="text-xl">
                            {{ item.solutionName }}
                        </div>
                        <div class="text-base">
                            {{ item.solutionDescription }}
                        </div>
                        <div class="btn text-right">
                            <button
                                class="w-16 h-8 rounded-md bg-gray-700 hover:bg-opacity-75 transition"
                                @click="choosedSolution(item)"
                            >
                                {{
                                    createOrLoad == "create" ? $t("start.create") : $t("start.load")
                                }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </n-window> -->
    </n-config-provider>
</template>
<script lang="ts">
import type { Ref } from "vue";
import { defaultConfig, getConfig } from "./lib/config";
// import { ElLoading, ElMessage } from "element-plus";
import { darkTheme } from "naive-ui";
import Start from "./views/Start.vue";
// import Project from "./views/Project";
// import Setting from "./views/Setting.vue";
import Welcome from "./views/Welcome.vue";
// import platform from "./lib/platform/platform";
// import Tool from "./components/developtool/tool.vue";
// import "./lib/project/web/web";
import JSZip from "jszip";
// import extension from "./store/extension";
import { useI18n } from "vue-i18n";
import axios from "axios";
// import project from "./store/project";
// import Console from "./lib/console";
import type Config from "@/types/Config";

import { getApi, setApi } from "./lib/api";
import type Pisdeo_API from "./types/Api";

import useConfig from "./stores/config"

export default defineComponent({
    data() {
        return {
            startIsInit: false,
            documentsPath: "",
            errorCode: "",
            warningShow: false,
            title: "Pisdeo",
            version: "Manual Build",
            isDevelopment: process.env.NODE_ENV === "development" ? true : false,
        };
    },
    components: {
        Start,
        // Project,
        Welcome,
        // Tool,
        // Setting,
    },
    mounted() {
        this.startIsInit = true;
    },
    setup() {
        setApi(<Pisdeo_API>inject("api"));

        const page: Ref<string> = ref("Blank");
        // const console = Console("App");
        // watch(page, () => {
        //     console.log(`Page changed to ${page.value}`);
        // });

        const createOrLoad = ref("create");
        const WindowOpen = ref(false);
        const solution: Ref<any> = ref([]);
        const i18n = useI18n();
        const t = i18n.t;
        const template = reactive({});
        const templateRequires = reactive({}) as RequireForm;
        // const extstore = extension();
        // const projectstore = project();
        // extstore.$onAction(({ name, store, args, after, onError }) => {
        //     if (name == "addTemplate") {
        //         template[args[0].id] = args[0];
        //         templateRequires[args[0].id] = args[0].require;
        //     }
        // });
        // projectstore.$onAction(({ name, store, args, after, onError }) => {
        //     if (name == "activateProject") {
        //         page.value = "Project";
        //     }
        // });

        const configStore = useConfig();
        page.value = configStore.init ? "Welcome" : "Start";
        i18n.locale.value = configStore.config;
        if (configStore.config.language.indexOf("zh") == 0) {
            i18n.fallbackLocale.value = "zh_cn";
        } else {
            i18n.fallbackLocale.value = "en_us";
        }

        const clientSize: WinSize = reactive({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        });
        window.onresize = () => {
            return (() => {
                clientSize.width = document.documentElement.clientWidth;
                clientSize.height = document.documentElement.clientHeight;
            })();
        };
        provide("clientSize", clientSize);

        // function loadTestProject() {
        //     const loading = ElLoading.service({
        //         lock: true,
        //         text: "Loading",
        //         background: "rgba(0, 0, 0, 0.7)",
        //     });
        //     axios({
        //         method: "get",
        //         url: "test/test.pisp",
        //         responseType: "arraybuffer",
        //     }).then((res: any) => {
        //         const content = res.data;
        //         afterGetContent(content, loading);
        //     });
        // }

        // function openLocalProject() {
        //     const uploader = document.createElement("input");
        //     uploader.type = "file";
        //     uploader.click();
        //     uploader.onchange = (e) => {
        //         const file = (e.target as any).files[0];
        //         const loading = ElLoading.service({
        //             lock: true,
        //             text: "Loading",
        //             background: "rgba(0, 0, 0, 0.7)",
        //         });
        //         const reader = new FileReader();
        //         reader.onload = (e) => {
        //             const content = (e.target as any).result;
        //             afterGetContent(content, loading);
        //         };
        //         reader.readAsArrayBuffer(file);
        //     };
        // }

        // function afterGetContent(content, loading) {
        //     let pisp = new JSZip();
        //     pisp.loadAsync(content).then((pisp) => {
        //         projectContent = pisp;
        //         projectstore
        //             .findSolution({ pisp })
        //             .then(({ allSolution, info }) => {
        //                 projectInfo = info;
        //                 createOrLoad.value = "load";
        //                 // WindowOpen.value = true;
        //                 solution.value = allSolution;

        //                 choosedSolution(allSolution[0]);
        //             })
        //             .catch(() => {
        //                 ElMessage({
        //                     showClose: true,
        //                     message: t("project.cannotfindsolution"),
        //                     type: "error",
        //                 });
        //             })
        //             .finally(() => {
        //                 loading.close();
        //             });
        //     });
        // }

        // function choosedSolution(solution: string) {
        //     // WindowOpen.value = false;
        //     page.value = "Project";
        //     nextTick(() => {
        //         projectstore.loadProject({
        //             solution,
        //             content: projectContent,
        //             ...projectInfo,
        //         });
        //     });
        // }

        // function createProject(info: any) {
        //     page.value = "Project";
        //     nextTick(() => {
        //         projectstore.createProject(info);
        //     });
        // }

        const themeOverrides = {
            common: {
                bodyColor: "rgb(24, 24, 24)",
                cardColor: "rgb(24, 24, 24)",
            },
            Menu: {
                itemIconColorActive: "#63e2b7",
            },
        };

        window.oncontextmenu = function (e) {
            // Disable browser context menu
            e.preventDefault();
        };

        return {
            darkTheme,
            themeOverrides,
            template,
            templateRequires,
            // openLocalProject,
            // loadTestProject,
            createOrLoad,
            WindowOpen,
            solution,
            // createProject,
            // choosedSolution,
            page,
        };
    },
    methods: {
        pushPage: function (page: string) {
            this.page = page;
        },
        // SettingCommand: function(command: string) {
        //     switch (command) {
        //         case "setToolState.always":
        //             localStorage.setItem("nwddevtool", "always");
        //             this.openNWDDevTool = "always";
        //             break;
        //         case "setToolState.development":
        //             localStorage.setItem("nwddevtool", "development");
        //             this.openNWDDevTool = "development";
        //             break;
        //         case "setToolState.never":
        //             localStorage.setItem("nwddevtool", "never");
        //             this.openNWDDevTool = "never";
        //             break;
        //         case "loadTestProject":
        //             this.loadTestProject();
        //             break;
        //         default:
        //             console.log(`Cannot find command '${command}'`);
        //     }
        // },
        // closeDevToolOneTime: function() {
        //     // Set any value to close devtool:)
        //     this.openNWDDevTool = "23333333333333";
        // },
    },
});
</script>
<style>
* {
    font-family: Helvetica;
    margin: 0;
    padding: 0;
    color: #eee;
    box-sizing: border-box;
}

html {
    overflow-y: hidden !important;
}

body {
    background-color: var(--nex-color-bg) !important;
    min-height: 100%;
}

a {
    text-decoration: none;
}

.titleBar {
    width: 100%;
    height: 28px;
    box-sizing: border-box;
    width: 100%;
    padding: 0 70px;
    overflow: hidden;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    user-select: none;
    -webkit-user-select: none;
    -webkit-app-region: drag;
    zoom: 1;
    line-height: 22px;
    display: flex;
    background-color: rgb(60, 60, 60);
}

.window-title {
    color: rgb(204, 204, 204);
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    zoom: 1;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0px);
    max-width: calc(100vw - 160px);
    flex: 0 1 auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: auto;
    margin-right: auto;
}

.console {
    transition: 0.3s;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 1;
    overflow: hidden;
    z-index: 2000;
    backdrop-filter: blur(2px);
    background-color: rgba(50, 50, 50, 0.7);
}

*::-webkit-scrollbar,
*::-webkit-scrollbar-thumb {
    width: 26px;
    height: 26px;
    border-radius: 13px;
    background-clip: padding-box;
    border: 10px solid transparent;
}

*::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0 10px;
}

*::-webkit-scrollbar-corner {
    background: unset;
}

.scroll {
    color: rgba(0, 0, 0, 0);
    transition: color 0.3s ease;

    &:hover {
        color: rgba(0, 0, 0, 0.3);
    }
}

input,
select {
    &:focus-visible {
        outline: none;
    }
}

.solution-container {
    .solution-title {
        font-size: 30px;
        font-weight: 700;
    }

    .solution-list {
        margin-top: 10px;

        .card {
            background-color: #444;
            width: 100%;
            margin: 0 20px 20px 0;
            display: inline-flex;
        }
    }
}
</style>
