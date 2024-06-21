<template>
  <swiper-item class="zm-swiper-item">
    <slot></slot>
  </swiper-item>
</template>

<script setup lang="ts">
import { useStyle, useUnit, useColor } from "../hooks"
import { swiperItemEmits, swiperItemProps } from "./index"

defineOptions({ name: "zm-swipe-item" })

const emits = defineEmits(swiperItemEmits)
const props = defineProps(swiperItemProps)

const style = computed(() => {
  const style: any = {}
  style.position = "fixed"
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

defineExpose({ name: "zm-swipe-item" })
</script>
<script lang="ts">
export default {
  name: "zm-swipe-item",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-swipe-item {
  display: flex;
}
</style>
