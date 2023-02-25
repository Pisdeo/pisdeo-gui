import { createI18n } from "vue-i18n";

type ImportContent = {
    default: string;
    [x: string]: any;
};

/**
 * Load locale messages
 */
function loadLocaleMessages() {
    const locales = import.meta.glob("./locales/*/*.json", { eager: true });
    const messages: any = {};
    Object.keys(locales).forEach((key) => {
        const langMatched = key.match(/\/locales\/([A-Za-z0-9-_-]+)\//i);
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (langMatched && langMatched.length > 1 && matched) {
            const locale = langMatched[1];
            messages[locale] = messages[locale]
                ? Object.assign(messages[locale], (<ImportContent>locales[key]).default)
                : (<ImportContent>locales[key]).default;
        }
    });
    return messages;
}

const noTransl = ["element", "css", "nt"];

export default createI18n({
    locale: "en_us",
    fallbackLocale: "en_us",
    legacy: false,
    messages: loadLocaleMessages(),
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    missing: (lang, context: any) => {
        if (noTransl.includes(context.split(".").shift())) {
            return context.split(".").pop();
        }
    },
});
