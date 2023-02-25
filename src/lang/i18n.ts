import { createI18n } from "vue-i18n";

/**
 * Load locale messages
 */
function loadLocaleMessages() {
    const locales = require.context("../../locales", true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const messages: any = {};
    locales.keys().forEach((key) => {
        const langMatched = key.match(/\/([A-Za-z0-9-_-]+)\//i);
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (langMatched && langMatched.length > 1 && matched) {
            const locale = langMatched[1];
            messages[locale] = messages[locale]
                ? Object.assign(messages[locale], locales(key).default)
                : locales(key).default;
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
