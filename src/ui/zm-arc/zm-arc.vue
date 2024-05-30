<template>
  <view class="zm-arc" :class="[customClass]" :style="[style]" @click="onClick">
    <view class="zm-arc__inner" :style="[innerStyle]"></view>
  </view>
</template>

<script setup lang="ts">
import { arcEmits, arcProps } from "./index"
import { useStyle, useUnit, useColor } from "../hooks"

defineOptions({ name: "zm-arc" })
const emits = defineEmits(arcEmits)
const props = defineProps(arcProps)

const width = computed(() => {
  return Math.max(Number(props.percent), 100)
})

const style = computed(() => {
  const style: any = {}
  style.top = useUnit(props.top)
  style.left = useUnit(props.left)
  style.height = useUnit(props.height)
  style.zIndex = props.zIndex
  if (props.fixed) style.position = "fixed"
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const innerStyle = computed(() => {
  const style: any = {}
  style.height = useUnit(props.height)
  style.left = "-" + (width.value - 100) / 2 + "%"
  style.right = "-" + (width.value - 100) / 2 + "%"
  style.paddingLeft = (width.value - 100) / 2 + "%"
  style.paddingRight = (width.value - 100) / 2 + "%"
  style.background = useColor(props.background)
  return useStyle(style)
})

function onClick(event: TouchEvent) {
  emits("click", event)
}

defineExpose({ name: "zm-arc" })
</script>
<script lang="ts">
export default {
  name: "zm-arc",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-arc {
  width: 100%;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;

  &__inner {
    top: 0;
    overflow: hidden;
    position: absolute;
    border-radius: 0 0 100% 100%;
    background-color: var(--primary-color);
  }
}
</style>
