import "./ContextMenu.scss";
import { useI18n } from "vue-i18n";

export default defineComponent({
    name: "ContextMenuItem",
    props: ["onClick", "item"],
    setup(props) {
        const { t } = useI18n();

        return () => (
            <li
                onClick={!props.item.disabled ? props.item.run : () => {}}
                class={{ disabled: props.item.disabled }}
            >
                {t(props.item.label)}
            </li>
        );
    },
});
