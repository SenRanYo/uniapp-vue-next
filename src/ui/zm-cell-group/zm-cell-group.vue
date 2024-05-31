<template>
  <view class="zm-cell-group" :class="[customClass]" :style="[style]">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { cellGroupEmits, cellGroupProps } from "./index"
import { useStyle, useUnit, useColor } from "../hooks"

defineOptions({ name: "zm-cell-group" })
const emits = defineEmits(cellGroupEmits)
const props = defineProps(cellGroupProps)
const cells = ref([])

const style = computed(() => {
  const style: any = {}
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.borderRadius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

function addCell(id: string) {
  const index = cells.value.findIndex((cellId) => cellId === id)
  if (index === -1) cells.value.push(id)
}

provide("zm-cell-group", { ...toRefs(props), cells, addCell })
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
