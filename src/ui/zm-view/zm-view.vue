<template>
  <view class="zm-view" :class="[customClass]" :style="[style]" @touchend="onTouchend" @touchmove="onTouchmove" @touchstart="onTouchstart">
    <slot></slot>
  </view>
</template>
<script setup lang="ts">
import { viewEmits } from "./index"
import { colorVars } from "../config"
import { useMitt, useStyle } from "../hooks"

defineOptions({ name: "zm-view" })

const emits = defineEmits(viewEmits)
const props = defineProps({
  scroll: { type: Boolean, default: true },
  background: { type: String, default: "" },
  customClass: { type: String, default: "" },
  customStyle: { type: [String, Object], default: "" },
})

const mitt = useMitt()
const scrollTop = ref(0)

const style = computed(() => {
  const style: any = {}
  style.background = props.background
  style["--primary-color"] = colorVars.primary
  style["--success-color"] = colorVars.success
  style["--warning-color"] = colorVars.warning
  style["--error-color"] = colorVars.error
  style["--info-color"] = colorVars.info
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

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

function onTouchstart(e: TouchEvent) {
  console.log(e)
  emits("touchstart", e)
  mitt.emit("touchstart", e)
}

function onTouchend(e: TouchEvent) {
  emits("touchend", e)
  mitt.emit("touchend", e)
}

function onTouchmove(e: TouchEvent) {
  emits("touchmove", e)
  mitt.emit("touchmove", e)
}

provide("zm-view", { mitt })
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
