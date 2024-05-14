<template>
  <view class="zm-view" :class="[customClass]" :style="[style]" @touchend="onTouchend" @touchmove="onTouchmove" @touchstart="onTouchstart">
    <slot></slot>
  </view>
</template>
<script setup lang="ts">
import { colorVars } from "../config"
import { useMitt, useStyle } from "../hooks"

defineOptions({ name: "zm-view" })
const emits = defineEmits(["scroll", "scrolltoupper", "scrolltolower", "touchstart", "touchmove", "touchend"])
const props = defineProps({
  scroll: { type: Boolean, default: true },
  background: { type: String, default: "" },
  customClass: { type: String, default: "" },
  customStyle: { type: [String, Object], default: "" },
})

const mitt = useMitt()

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

function onTouchstart(e: Event) {
  emits("touchstart", e)
  mitt.emit("touchstart", e)
}

function onTouchend(e: Event) {
  emits("touchend", e)
  mitt.emit("touchend", e)
}

function onTouchmove(e: Event) {
  emits("touchmove", e)
  mitt.emit("touchmove", e)
}

provide("zm-view", { mitt })
defineExpose({ mitt })
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
