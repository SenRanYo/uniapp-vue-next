<template>
  <view class="zm-line" :class="[props.customClass]" :style="[style]"></view>
</template>

<script setup lang="ts">
import { lineEmits, lineProps } from "./index"
import { useStyle, useColor, useUnit } from "../hooks"

defineOptions({ name: "zm-line" })
const emits = defineEmits(lineEmits)
const props = defineProps(lineProps)

const style = computed(() => {
  const style: any = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.margin = useUnit(props.margin)
  if (props.vertical) {
    style.borderLeft = `${useUnit(props.width)} ${props.type} ${useColor(props.color)}`
  } else {
    style.borderTop = `${useUnit(props.height)} ${props.type} ${useColor(props.color)}`
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

defineExpose({ name: "zm-line" })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-line {
  display: flex;
  flex-shrink: 0;
  box-sizing: border-box;
}
</style>
