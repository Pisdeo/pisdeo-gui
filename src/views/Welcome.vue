<template>
    <n-window class="window" :open="true">
        <div class="stepW scroll s1" v-if="step == 1">
            <div>
                <n-icon class="img"><Language style="display: inline-block;" /></n-icon>
                <div class="title">{{ $t("welcome.lang.choose") }}</div>
            </div>
            <n-select
                v-model:value="lang"
                class="m-2 select"
                placeholder="Select"
                size="large"
                :options="supportLang"
            />
            <n-btn @click="setLanguage()" class="nS">{{ $t("common.nextstep") }}</n-btn>
        </div>
        <div class="stepW" v-else-if="step == 2" style="height: 100%">
            <div class="title">{{ $t("welcome.legal") }}</div>
            <Legal style="height: 80%" />
            <n-btn @click="step++" class="nS">{{ $t("common.agree") }}</n-btn>
        </div>
        <div class="stepW" v-else-if="step == 3" style="height: 100%">
            <div class="title">{{ $t("welcome.complete") }}</div>
            <n-btn @click="complete()" class="nS">{{ $t("common.enter") }}</n-btn>
        </div>
    </n-window>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
// import { ElMessage } from "element-plus";
import useConfig from "../stores/config";
// import Legal from "../components/legal.vue";
import { Language } from "@vicons/ionicons5";

export default defineComponent({
    name: "WelcomePage",
    emits: ["goStart"],
    components: { Language },
    data() {
        return {
            step: 1,
            lang: "",
            supportLang: [] as any,
        };
    },
    setup () {
        const lang = ref("");
        const supportLang = reactive([]);
        const configStore = useConfig();
        const i18n = useI18n();
        const t = i18n.t;
        const systenLang = configStore.getEnvLang;
        lang.value = i18n.availableLocales.includes(systenLang) ? systenLang : "en_us";
        i18n.availableLocales.forEach((lang) => {
            supportLang.push({
                value: lang,
                label: t(`language.${lang}`),
            });
        });
        if (lang.value.indexOf("zh") == 0) {
            i18n.fallbackLocale = "zh_cn";
        } else {
            i18n.fallbackLocale = "en_us";
        }
        return {lang,supportLang}
    },
    watch: {
        lang(lang) {
            this.$i18n.locale = lang;
            if (lang.indexOf("zh") == 0) {
                this.$i18n.fallbackLocale = "zh_cn";
            } else {
                this.$i18n.fallbackLocale = "en_us";
            }
        },
    },
    methods: {
        setLanguage: async function() {
            this.$i18n.locale = this.lang;
            // if (platform === "desktop") {
                // const setResult = await setLocale(this.lang);
                // if (setResult == "successful") {
                //     this.step++;
                // } else {
                //     // ElMessage.error(this.$t("welcome.setlocaleerror"));
                // }
            // } else {
                setLang(this.lang);
                this.step++;
            // }
        },
        complete: async function() {
            // if (platform === "desktop") {
            //     const setResult = await inited();
            //     if (setResult == "successful") {
            //         this.$emit("goStart");
            //     } else {
            //         // ElMessage.error(this.$t("welcome.initerror"));
            //     }
            // } else {
                inited();
                this.$emit("goStart");
            // }
        },
    },
});
</script>
<style lang="scss" scoped>
.window {
    .stepW {
        display: flex;
        flex-direction: column;
        overflow: auto;
        height: 100%;

        &.s1 {
            justify-content: space-around;
        }
    }
}

.nS {
    width: 130px;
    align-self: center;
}

.img {
    font-size: 96px;
    text-align: center;
    width: 100%;
    display: block;
}

.title {
    font-weight: 500;
    font-size: 32px;
    text-align: center;
    width: 100%;
}

.select {
    width: 60%;
    margin: 30px 20%;

    .option {
        width: 60%;
    }
}
.desktop {
    height: calc(100% - 28px);
    top: 28px;
}
</style>
