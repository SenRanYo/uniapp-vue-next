<template>
  <view class="zm-badge">
    <view class="zm-badge__inner" :class="[classs, customClass]" :style="[style]" @click="onClick">
      <slot name="content">
        <zm-icon v-if="isShowIcon" :name="icon"></zm-icon>
        <view v-else class="zm-badge__value" :style="[valueStyle]">{{ formatValue }}</view>
      </slot>
    </view>
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { isNumber } from "../utils/check"
import { badgeEmits, badgeProps } from "./index"
import { useStyle, useUnit, useColor } from "../hooks"

defineOptions({ name: "zm-badge" })
const slots = useSlots()
const emits = defineEmits(badgeEmits)
const props = defineProps(badgeProps)

const style = computed(() => {
  const style: any = {}
  style.background = useColor(props.color)
  if (props.dot) {
    style.width = useUnit(props.dotSize)
    style.height = useUnit(props.dotSize)
  } else {
    style.height = useUnit(props.height)
    style.minWidth = useUnit(props.height)
    style.borderRadius = useUnit(props.radius)
  }
  if (isShowIcon.value) {
    style.padding = "4rpx"
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list = []
  list.push(`zm-badge__inner--${props.position}`)
  props.dot && list.push("zm-badge__inner--dot")
  slots.default && list.push("zm-badge__inner--absolute")
  return list
})

const valueStyle = computed(() => {
  let style: any = {}
  style.color = useColor(props.fontColor)
  style.fontSize = useUnit(props.fontSize)
  style.fontWeight = props.fontWeight
  return useStyle(style)
})

const formatValue = computed(() => {
  if (isNumber(props.value) && isNumber(props.max)) {
    return Number(props.value) > Number(props.max) ? props.max + "+" : props.value
  }
  return props.value
})

const isShowIcon = computed(() => {
  return props.icon && !props.dot
})

function onClick(event: TouchEvent) {
  emits("click", event)
}

defineExpose({ name: "zm-badge" })
</script>
<script lang="ts">
export default {
  name: "zm-arc",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-badge {
  position: relative;

  &__inner {
    display: flex;
    color: #fff;
    padding: 4rpx;
    font-size: 24rpx;
    line-height: 1em;
    align-items: center;
    border-radius: 999px;
    justify-content: center;
    background-color: #ee0b24;

    &--absolute {
      top: 0;
      right: 0;
      position: absolute;
      transform-origin: 100%;
      transform: translate(50%, -50%);
    }
  }

  &__value {
    padding-left: 5rpx;
    padding-right: 5rpx;
  }
}
</style>
