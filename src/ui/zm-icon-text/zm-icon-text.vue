<template>
  <view class="zm-icon-text" :class="[classs, props.customClass]" :style="[style]" @click="click">
    <zm-icon :name="name" :size="size" :color="color" :radius="radius" :weight="weight" :custom-prefix="customPrefix"></zm-icon>
    <text v-if="text" class="icon-text" :style="[textStyle]">{{ text }}</text>
  </view>
</template>

<script setup lang="ts">
import { iconTextEmits, iconTextProps } from "./index"
import { useStyle, useColor, useUnit } from "../hooks"

defineOptions({ name: "zm-icon-text" })
const emits = defineEmits(iconTextEmits)
const props = defineProps(iconTextProps)

const style = computed(() => {
  const style: any = {}
  style.borderRadius = useUnit(props.radius)
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list = []
  if (props.textLeft) list.push("zm-icon-text--left")
  return list
})

const textStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.textColor)
  style.fontSize = useUnit(props.textSize)
  style.fontWeight = props.textWeight
  if (props.textGap) {
    if (props.textLeft) style.marginRight = useUnit(props.textGap)
    else style.marginLeft = useUnit(props.textGap)
  }
  if (props.textLeft) {
    style.marginLeft = "0"
  }
  return useStyle(style)
})

function click(event: TouchEvent) {
  emits("click", event)
}

defineExpose({ name: "zm-icon-text" })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-icon-text {
  overflow: hidden;
  display: inline-flex;
  font-size: inherit;
  align-items: center;
  flex-direction: row;
  justify-content: center;

  &--left {
    flex-direction: row-reverse;

    .zm-icon-text__text {
      margin-left: 0;
      margin-right: 8rpx;
    }
  }

  .icon-text {
    margin-left: 8rpx;
  }
}
</style>
