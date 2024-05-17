<template>
  <view class="zm-col" :class="[props.customClass]" :style="[style]"><slot></slot></view>
</template>

<script setup lang="ts">
import { colProps } from "./index"
import { isNumber, isString, isNoEmpty } from "../utils/check"
import { useStyle, useUnit, useUnitToPx } from "../hooks"

defineOptions({ name: "zm-col" })

const props = defineProps(colProps)
const row = inject("zm-row", null)

const style = computed(() => {
  let style: any = {}
  // #ifdef H5 || APP-PLUS || MP-WEIXIN
  style.flex = `0 0 ${(100 / 24) * Math.min(24, +props.span)}%`
  style.marginLeft = isNumber(props.offset) ? `${(100 / 24) * props.offset}%` : isString(props.offset) ? useUnit(props.offset) : 0
  // #endif
  // #ifndef H5 || APP-PLUS || MP-WEIXIN
  if (row) {
    style.width = `${(row.width.value / 24) * props.span}px`
    style.marginLeft = isNumber(props.offset) ? `${(row.width.value / 24) * props.offset}px` : isString(props.offset) ? `${useUnitToPx(props.offset)}px` : 0
  }
  // #endif
  if (row) style.padding = `${useUnitToPx(row.gap.value || row.rowGap.value) / 2}px ${useUnitToPx(row.gap.value || row.colGap.value) / 2}px`
  switch (props.justify) {
    case "start":
    case "end":
      style.justifyContent = `flex-${props.justify}`
      break
    case "around":
    case "between":
      style.justifyContent = `space-${props.justify}`
      break
    default:
      style.justifyContent = props.justify
      break
  }
  switch (props.align) {
    case "top":
      style.alignItems = "flex-start"
      break
    case "bottom":
      style.alignItems = "flex-end"
      break
    default:
      style.alignItems = props.align
      break
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

defineExpose({ name: "zm-col" })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-col {
  display: flex;
}
</style>
