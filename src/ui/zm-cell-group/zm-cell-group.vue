<template>
  <view class="zm-cell-group" :class="[customClass]" :style="[style]">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { useStyle, useUnit, useColor, useChildren } from "../hooks"
import { cellGroupEmits, cellGroupProps, cellGroupKey } from "./index"

defineOptions({ name: "zm-cell-group" })

const props = defineProps(cellGroupProps)
const emits = defineEmits(cellGroupEmits)
const { childrens, linkChildren } = useChildren(cellGroupKey)

const style = computed(() => {
  const style: any = {}
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.borderRadius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

linkChildren({ props, childrens })
defineExpose({ name: "zm-cell-group" })
</script>
<script lang="ts">
export default {
  name: "zm-cell-group",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-cell-group {
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  background-color: #fff;
}
</style>
