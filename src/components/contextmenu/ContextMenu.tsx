import { Teleport } from "vue";
import "./ContextMenu.scss";
import ContentMenuItem from "./ContextMenuItem";
import ContentMenuSubmenu from "./ContextMenuSubmenu";

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
    name: "ContextMenu",
    props: {
        contextmenu: {
            type: Object,
            default: () => {
                return {
                    visible: false,
                    left: 0,
                    top: 0,
                };
            },
        },
        menu: {
            default: [] as MenuItem[],
        },
        size: {
            type: String,
            default: "normal",
        },
        showArrow: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        return () => (
            <Teleport to="body">
                <ul
                    style={[
                        props.contextmenu.left ? `left:${props.contextmenu.left}px` : "",
                        props.contextmenu.top ? `top:${props.contextmenu.top}px` : "",
                        props.contextmenu.visible ? "display:block" : "display:none",
                    ]}
                    class={["contextmenu", props.size, props.showArrow ? "show-arrow" : ""]}
                >
                    {props.menu.map((item: MenuItem) => {
                        return item.submenu ? (
                            <ContentMenuSubmenu item={item as MenuItemSubmenu} />
                        ) : (
                            <ContentMenuItem item={item} />
                        );
                    })}
                </ul>
            </Teleport>
        );
    },
});
