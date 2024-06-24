<template>
  <swiper
    class="zm-swiper"
    :style="[style]"
    :class="[customClass]"
    :current="current"
    :circular="circular"
    :interval="interval"
    :duration="duration"
    :vertical="vertical"
    :autoplay="autoplay"
    :indicator-dots="indicatorDots"
    :indicator-color="indicatorColor"
    :indicator-active-color="indicatorActiveColor"
  >
    <slot></slot>
  </swiper>
</template>

<script setup lang="ts">
import { merge } from "../utils/utils"
import { useStyle, useUnit, useColor } from "../hooks"
import { swiperEmits, swiperProps } from "./index"

defineOptions({ name: "zm-swiper" })

const emits = defineEmits(swiperEmits)
const props = defineProps(swiperProps)
const current = ref(0)

const ins = getCurrentInstance()
console.log(ins)
const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

function prev() {}
function next() {}
function swipeTo() {}

defineExpose({ name: "zm-swiper", prev, next, swipeTo })
</script>
<script lang="ts">
export default {
  name: "zm-swiper",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-swiper {
  display: flex;
}
</style>
