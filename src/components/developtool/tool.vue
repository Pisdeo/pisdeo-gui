<template>
    <div id="codetool" ref="codetool" @mouseover="showList = true" @mouseleave="showList = false">
        <div :class="showList ? 'suspension listopen' : 'suspension'">
            <n-icon class="toolsvg" size="20"><Tools /></n-icon>
        </div>
        <div v-if="showList" class="list">
            <p>Developer Tool</p>
            <div v-for="value in toolFunction" :key="value.label">
                <n-button
                    size="tiny"
                    secondary
                    v-if="value.type == 'btn'"
                    @click="
                        showList = false;
                        value.command();
                    "
                >
                    {{ value.label }}
                </n-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Tools } from "@vicons/fa";

export default defineComponent({
    data() {
        return {
            showList: false,
        };
    },
    components: { Tools },
    props: ["toolFunction"],
    mounted: function() {
        dragElement(document.getElementById("codetool"));

        function dragElement(elmnt: any) {
            var pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;
            if (document.getElementById(elmnt.id + "header")) {
                document.getElementById(elmnt.id + "header")!.onmousedown = dragMouseDown;
            } else {
                elmnt.onmousedown = dragMouseDown;
            }

            function dragMouseDown(e) {
                e = e || window.event;
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                elmnt.style.top = elmnt.offsetTop - pos2 + "px";
                elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
            }

            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    },
});
</script>
<style scoped>
#codetool {
    display: flex;
    position: fixed;
    z-index: 10000;
    top: 200px;
    left: 10px;
}

#codetool * {
    box-sizing: border-box;
    transition: 0.2s;
    margin: 0;
    padding: 0;
}

#codetool .suspension {
    background-color: #222;
    height: 36px;
    width: 36px;
    border-radius: 50%;
    box-shadow: rgb(0 0 0 / 14%) 0px 2px 4px 0px;
    padding: 8px;
}

#codetool .suspension .toolsvg {
    fill: currentColor;
    color: #fff;
}

#codetool .suspension.listopen {
    border-radius: 50% 0px 0 50%;
}

#codetool .list {
    background-color: #222;
    width: auto;
    height: auto;
    padding: 10px;
    box-shadow: rgb(0 0 0 / 14%) 0px 2px 4px 0px;
    border-radius: 4px;
}

#codetool .list p {
    color: #fff;
    margin-bottom: 10px;
}

#codetool .list div {
    display: flex;
}
</style>
