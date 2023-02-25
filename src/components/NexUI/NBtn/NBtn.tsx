import "./NBtn.scss";

export default defineComponent({
    name: "NBtn",

    props: {
        btnStyle: String,
    },

    setup(props, { slots }) {
        return () => {
            const normal = <button class={["n-btn"]}>{slots.default?.()}</button>,
                nav = (
                    <div class={["n-navbtn"]}>
                        <span>{slots.default?.()}</span>
                    </div>
                );
            const btnList = { normal, nav };
            const btnStyle = props.btnStyle ? btnList[props.btnStyle] : normal;
            return btnStyle;
        };
    },
});
