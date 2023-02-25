import "./ContextMenu.scss";
import { useI18n } from "vue-i18n";
import ContentMenuItem from "./ContextMenuItem";
import ContentMenuSubmenu from "./ContextMenuItem";

type MenuItem = {
    label: string;
    run: any;
    disabled?: boolean;
    submenu?: MenuItem[];
};

type MenuItemSubmenu = {
    label: string;
    run: any;
    disabled?: boolean;
    submenu: MenuItem[];
};

export default defineComponent({
    name: "ContextMenuSubmenu",
    props: {
        item: {
            default: {
                label: "",
                run: () => {},
                submenu: [],
            } as MenuItemSubmenu,
        },
    },
    setup(props) {
        const { t } = useI18n();
        const state = reactive({
            visible: false,
            left: 0,
            top: 0,
        });
        const isHover = reactive({
            parent: false,
            child: false,
        });

        watch(isHover, (value) => {
            if (value.parent || value.child) {
                state.visible = true;
            } else {
                state.visible = false;
            }
        });

        return () => (
            <li
                class={{ disabled: props.item.disabled }}
                onMouseenter={(e) => {
                    const node = e.target as HTMLElement;
                    state.left = node.offsetLeft + node.offsetWidth;
                    state.top = node.offsetTop;
                    isHover.parent = true;
                }}
                onMouseleave={() => {
                    isHover.parent = false;
                }}
            >
                {t(props.item.label)}
                <ul
                    style={[
                        state.left ? `left:${state.left}px` : "",
                        state.top ? `top:${state.top}px` : "",
                        state.visible ? "display:block" : "display:none",
                    ]}
                    onMouseenter={(e) => {
                        isHover.child = true;
                    }}
                    onMouseleave={() => {
                        isHover.child = false;
                    }}
                    class={["contextmenu"]}
                >
                    {props.item.submenu.map((item: MenuItem) => {
                        return item.submenu ? (
                            <ContentMenuSubmenu item={item} />
                        ) : (
                            <ContentMenuItem item={item} />
                        );
                    })}
                </ul>
            </li>
        );
    },
});
