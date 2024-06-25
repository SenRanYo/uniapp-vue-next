<template>
  <view
    class="zm-view"
    :class="[customClass]"
    :style="[style]"
    @touchend="onTouchend"
    @touchmove="onTouchmove"
    @touchstart="onTouchstart"
    @mousedown="onMousedown"
    @mouseup="onMouseup"
  >
    <slot></slot>
  </view>
</template>
<script setup lang="ts">
import { colorVars } from "../config"
import { viewEmits, viewProps, viewKey } from "./index"
import { useMitt, useUnit, useColor, useStyle, useElRect, useChildren } from "../hooks"

defineOptions({ name: "zm-view" })
const emits = defineEmits(viewEmits)
const props = defineProps(viewProps)
const { linkChildren } = useChildren(viewKey)

const rect = ref({})
const mitt = useMitt()
const scrollTop = ref(0)
const instance = getCurrentInstance()

const style = computed(() => {
  const style: any = {}
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  style["--primary-color"] = colorVars.primary
  style["--success-color"] = colorVars.success
  style["--warning-color"] = colorVars.warning
  style["--error-color"] = colorVars.error
  style["--info-color"] = colorVars.info
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

linkChildren({ props, mitt, rect, scrollTop })

async function resize() {
  await nextTick()
  rect.value = await useElRect(".zm-view", instance)
}

function scroll(options: Page.PageScrollOption) {
  scrollTop.value = options.scrollTop
  emits("scroll", options)
  mitt.emit("scroll", options)
}

function reachTop() {
  emits("reachTop")
  mitt.emit("reachTop")
}

function reachBottom() {
  emits("reachBottom")
  mitt.emit("reachBottom")
}

function onTouchstart(e: any) {
  emits("touchstart", e)
  mitt.emit("touchstart", e)
}

function onTouchend(e: any) {
  emits("touchend", e)
  mitt.emit("touchend", e)
}

function onTouchmove(e: any) {
  emits("touchmove", e)
  mitt.emit("touchmove", e)
}

function onMousedown(e: any) {
  emits("mousedown", e)
  mitt.emit("mousedown", e)
}

function onMouseup(e: any) {
  emits("mouseup", e)
  mitt.emit("mouseup", e)
}

onBeforeMount(() => resize())
defineExpose({ name: "zm-view", mitt, scroll, reachTop, reachBottom })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-view {
  width: 100%;
  display: flex;
  position: relative;
  min-height: 100vh;
  flex-direction: column;
}
</style>
