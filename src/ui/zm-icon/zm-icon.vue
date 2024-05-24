<template>
  <image
    v-if="isImage"
    :class="[prefix, `${prefix}-${props.name}`, props.customClass, isHover ? props.hoverClass : '']"
    :style="[imageStyle]"
    :src="props.name"
    :mode="imageMode"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @mousedown="onTouchStart"
    @mouseup="onTouchEnd"
    @click="onClick"
  />
  <text
    v-else
    :class="[prefix, `${prefix}-${props.name}`, props.customClass, isHover ? props.hoverClass : '']"
    :style="[iconStyle]"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @mousedown="onTouchStart"
    @mouseup="onTouchEnd"
    @click="onClick"
  ></text>
</template>

<script setup lang="ts">
import { merge } from "../utils/utils"
import { iconEmits, iconProps } from "./index"
import { useStyle, useUnit, useColor } from "../utils/style"

defineOptions({ name: "zm-icon" })

const emits = defineEmits(iconEmits)
const props = defineProps(iconProps)
const isHover = ref(false)

const prefix = computed(() => {
  return props.customPrefix || "zm-icon"
})

const isImage = computed(() => {
  return /\.(jpeg|jpg|gif|png|bmp|webp)$/i.test(props.name)
})

const imageMode: any = computed(() => props.imageMode)

const iconStyle = computed(() => {
  let style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.size)
  style.fontWeight = props.weight
  style.borderRadius = useUnit(props.radius)
  style.background = useColor(props.background)
  if (isHover.value) {
    style = merge(style, useStyle(props.hoverStyle))
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const imageStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.width || props.size)
  style.height = useUnit(props.height || props.size)
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

function onClick(event: TouchEvent) {
  emits("click", event)
}

function onTouchStart() {
  this.isHover = true
}

function onTouchEnd() {
  this.isHover = false
}

defineExpose({ name: "zm-icon" })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-icon {
  font-size: inherit;
  will-change: transform;
}
</style>
