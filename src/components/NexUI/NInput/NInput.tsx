import "./NInput.scss";

export default defineComponent({
    name: "NInput",

    props: [
        "modelValue"
    ],

    setup() {
        return () => {
            return <input class={["n-input"]} />;
        };
    },
});
