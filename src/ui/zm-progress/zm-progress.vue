<template>
  <view class="zm-progress" :class="[customClass]" :style="[style]">
    <view class="zm-progress__pivot" :style="[pivotStyle]">
      <slot name="text" :percentage="percentage">
        <text class="zm-progress__text" v-if="showText" :style="[textStyle]">{{ text ? text : `${percentage}%` }}</text>
      </slot>
    </view>
    <view class="zm-progress__portion" :style="[portionStyle]"></view>
  </view>
</template>

<script setup lang="ts">
import { useStyle, useColor, useUnit } from "../hooks"
import { progressEmits, progressProps } from "./index"

defineOptions({ name: "zm-progress" })

const emits = defineEmits(progressEmits)
const props = defineProps(progressProps)

const style = computed(() => {
  const style: any = {}
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const textStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.textColor)
  style.fontSize = useUnit(props.textSize)
  style.fontWeight = props.textWeight
  return useStyle(style)
})

const pivotStyle = computed(() => {
  const style: any = {}
  style.left = `${props.percentage}%`
  style.background = useColor(props.color)
  return useStyle(style)
})

const portionStyle = computed(() => {
  const style: any = {}
  style.width = `${props.percentage}%`
  style.background = useColor(props.background)
  return useStyle(style)
})

defineExpose({ name: "zm-progress" })
</script>
<script lang="ts">
export default {
  name: "zm-progress",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-progress {
  width: 100%;
  height: 24rpx;
  display: flex;
  position: relative;
  border-radius: 9999px;
  background-color: #ebedf0;

  &__pivot {
    top: 50%;
    z-index: 2;
    display: flex;
    position: absolute;
    align-items: center;
    text-align: center;
    word-break: keep-all;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    transform: translate(-100%, -50%);
  }

  &__text {
    color: #fff;
    padding: 0 8rpx;
    font-size: 20rpx;
    border-radius: 9999px;
  }

  &__portion {
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    position: absolute;
    border-radius: 9999px;
    transition: all 0.3s ease-out;
    background-color: var(--primary-color);
  }
}
</style>
