<template>
    <div style="height: 100%;">
        <div class="nav">
            <div class="nav-left">
                <h1 class="text-3xl">{{ $t("start.title") }}</h1>
                <n-btn v-if="isInit" @click="$emit('openLocalProject')" btnStyle="nav">{{
                    $t("start.open")
                }}</n-btn>
                <n-btn v-if="isInit" @click="$emit('openStore')" btnStyle="nav">{{
                    $t("start.extensions")
                }}</n-btn>
            </div>
            <div class="nav-right">
                <n-btn @click="$emit('openSetting')" btnStyle="nav">{{
                    $t("start.setting")
                }}</n-btn>
            </div>
        </div>
        <div class="main">
            <!-- <div v-if="activeProjects.length > 0" class="activeProjects">
                <h2 class="npt text-2xl">{{ $t("start.openedProject") }}</h2>
                <div class="npc scroll">
                    <div
                        v-for="item in activeProjects"
                        @click="openActiveProject(item.id)"
                        class="project"
                    >
                        <div class="project-name">{{ item.name }}</div>
                    </div>
                </div>
            </div> -->
            <div v-if="isInit" class="newProject">
                <h2 class="npt text-2xl">{{ $t("start.pageNewproject") }}</h2>
                <div class="npc scroll">
                    <div @click="projectWindow = true" class="card">
                        <div
                            class="img"
                            style="display: flex;align-items: center;justify-content: center;"
                        >
                            <icon-add-one theme="outline" size="80" fill="#ccc" :strokeWidth="2" />
                        </div>
                        <div class="title">{{ $t("project.newproject") }}</div>
                    </div>
                </div>
            </div>
            <!-- <n-window :open="projectWindow" @close="projectWindow = false">
                <div class="title">
                    <h1 class="text-2xl">
                        {{ $t("project.newproject") }}
                    </h1>
                </div>
                <div>
                    <div class="form">
                        <div>
                            <div>{{ $t("newproject.solution") }}:</div>
                            <n-select
                                :options="getAllSolution()"
                                v-model:value="ProjectForm.solution"
                            />
                        </div>
                        <div>
                            <div>{{ $t("newproject.projectname") }}:</div>
                            <n-input
                                spellcheck="false"
                                v-model:value="ProjectForm.name"
                                placeholder=" "
                            />
                        </div>
                    </div>
                    <n-button :onclick="createProject">
                        {{ $t("newproject.create") }}
                    </n-button>
                </div>
            </n-window> -->
        </div>
    </div>
</template>
<script lang="ts">
import type { Ref } from "vue";
// import project, { solutionManager } from "../store/project";

interface RequireForm {
    [propName: string]: any;
}

export default defineComponent({
    name: "Start",
    props: ["isInit"],
    emits: ["openSetting", "openStore", "openLocalProject", "createProject"],
    setup(props, { emit }) {
        // const projectWindow = ref(false);
        // const activeProjects: Ref<Project.Info[]> = ref([]);
        // const projectstore = project();
        // const ProjectForm = reactive({
        //     name: "Project1",
        //     solution: "org.pisdeo.website",
        // });

        // onActivated(() => {
        //     activeProjects.value = projectstore.project;
        // });

        // function openActiveProject(projectId: string) {
        //     projectstore.activateProject(projectId);
        // }

        // function getAllSolution() {
        //     return Object.keys(solutionManager.solutions).map((item) => {
        //         const solution = solutionManager.solutions[item];
        //         return { label: solution.solutionName, value: solution.solutionId };
        //     });
        // }

        // function createProject() {
        //     projectWindow.value = false
        //     emit("createProject", {
        //         name: ProjectForm.name,
        //         author: "None<none@pisdeo.org>",
        //         solution: solutionManager.solutions[ProjectForm.solution],
        //     });
        // }

        // return {
        //     projectWindow,
        //     activeProjects,
        //     openActiveProject,
        //     ProjectForm,
        //     getAllSolution,
        //     createProject,
        // };
    },
});
</script>

<style lang="scss" scoped>
#newProject.hide .mask {
    opacity: 0;
}

#newProject.none {
    display: none;
}

#newProject {
    display: unset;
}

.create {
    position: absolute;
    bottom: 43px;
    right: 43px;
}

.form {
    margin-top: 16px;
    display: flex;
    margin-bottom: 16px;
    overflow-y: auto;
    flex-direction: column;

    & > div {
        margin: 10px;
        display: flex;
        align-items: center;

        & > div {
            min-width: 100px;
        }
    }
}

.nav {
    padding: 12px;
    background-color: #222;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;

    .nav-left {
        align-items: center;
        display: flex;
        * {
            display: inline;
            margin: 0 10px;
        }
    }
    .nav-right {
        align-items: center;
        display: flex;
        * {
            display: inline;
            margin: 0 10px;
        }
    }
}
.main {
    padding: 24px;
    height: 100%;
    .activeProjects {
        .npt {
            margin: 10px;
        }

        .npc {
            display: inline-flex;
            overflow-x: auto;
            .project {
                width: 300px;
                margin: 12px;
                background-color: #222;
                border-radius: 12px;
                border-color: #444444;
                border-width: 1px;
                padding: 12px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                transition: 0.3s;

                &:hover {
                    background-color: #333;
                    border-color: #646464;
                }

                &:active {
                    background-color: #444;
                    border-color: #777;
                }

                .project-name {
                    font-size: 18px;
                    font-weight: bold;
                    color: #fff;
                    margin: 0;
                }
                .project-info {
                    display: flex;
                    justify-content: space-between;
                    .project-info-item {
                        color: #fff;
                        font-size: 14px;
                        margin: 0;
                    }
                }
            }
        }
    }

    .newProject {
        display: flex;
        flex-direction: column;
        .npt {
            margin: 10px;
        }
        .npc {
            display: inline-flex;
            overflow-x: auto;

            .card {
                background-color: #2c2c2c;
                min-width: 300px;
                width: 300px;
                height: 230px;
                border-radius: 8px;
                margin: 10px;
                display: inline-flex;
                flex-direction: column;
                transition: 0.5s;
                border-style: solid;
                border-color: #2c2c2c;
                .title {
                    height: 40px;
                    padding: 10px;
                }
                .img {
                    width: 100%;
                    height: 100%;
                    background-size: 80%;
                    background-repeat: no-repeat;
                    background-position: center;
                    transition: 0.5s;
                }
                &:hover {
                    border-color: #474747;
                    background-color: #242424;
                    .img {
                        transform: scale(1.03);
                    }
                }
            }
        }
    }
}
</style>
