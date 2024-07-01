<template>
  <view v-if="visible" class="zm-tag" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <view class="zm-tag__icon" v-if="icon || slots.icon">
      <slot name="icon"><zm-icon :name="icon" :color="iconColor" :size="iconSize" :weight="iconWeight"></zm-icon></slot>
    </view>
    <view class="zm-tag__text" :style="[textStyle]">
      <slot>{{ text }}</slot>
    </view>
    <view class="zm-tag__close" v-if="closeable || slots.close" @click="onClose">
      <slot name="close"><zm-icon name="cross" :color="iconColor" :size="iconSize" :weight="iconWeight"></zm-icon></slot>
    </view>
  </view>
</template>
<script setup lang="ts">
import { tagEmits, tagProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "zm-tag" })

const slots = useSlots()
const props = defineProps(tagProps)
const emits = defineEmits(tagEmits)

const visible = ref(true)

const style = computed(() => {
  const style: any = {}
  style.padding = props.padding
  style.color = useColor(props.textColor)
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.borderRadius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  list.push(`zm-tag--${props.type}`)
  if (props.round) list.push("zm-tag--round")
  if (props.plain) list.push("zm-tag--plain")
  if (props.closeable) list.push("zm-tag--closeable")
  return list
})

const textStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.textColor)
  style.fontSize = useUnit(props.textSize)
  style.fontWeight = props.textWeight
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.borderRadius)
  return useStyle(style)
})

watch(
  () => props.show,
  (val) => {
    visible.value = val
  },
  { immediate: true },
)

watch(
  () => visible.value,
  (val) => {
    emits("update:show", val)
  },
)

function onClick(event: TouchEvent) {
  emits("click", event)
}

function onClose(event: TouchEvent) {
  visible.value = false
  emits("close", event)
}

defineExpose({ name: "zm-tag" })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-tag {
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  padding: 4rpx 8rpx;
  border-width: 1rpx;
  border-style: solid;
  border-color: currentcolor;
  align-items: center;
  border-radius: 4rpx;
  display: inline-flex;
  box-sizing: border-box;
  justify-content: center;
  background-color: var(--primary-color);

  &__icon {
    display: flex;
    align-items: center;
    margin-right: 4rpx;
  }

  &__text {
    font-size: 20rpx;
    white-space: nowrap;
  }

  &__close {
    display: flex;
    margin-left: 4rpx;
    align-items: center;
  }

  &--round {
    border-radius: 9999px;
  }

  &--plain {
    background-color: #fff;
  }

  @each $type in (primary, success, warning, error, info) {
    &--#{$type} {
      color: #fff;
      border-color: var(--#{$type}-color);
      background-color: var(--#{$type}-color);

      &.zm-tag--plain {
        color: var(--#{$type}-color);
        background-color: #fff;
      }
    }
  }
}
</style>
