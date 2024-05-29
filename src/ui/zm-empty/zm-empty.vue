<template>
  <view v-if="show" class="zm-empty" :class="[props.customClass]" :style="[style]">
    <slot name="icon">
      <image v-if="icon" class="zm-empty__icon" :src="icon" mode="widthFix" :style="[iconStyle]"></image>
      <image v-else class="zm-empty__icon" src="./lib/empty.png" mode="widthFix" :style="[iconStyle]"></image>
    </slot>
    <slot name="text">
      <text class="zm-empty__text" :style="[textStyle]">{{ text }}</text>
    </slot>
    <view class="zm-empty__slot">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { emptyEmits, emptyProps } from "./index"
import { useUnit, useStyle, useColor } from "../hooks"

defineOptions({ name: "zm-empty" })
const emits = defineEmits(emptyEmits)
const props = defineProps(emptyProps)

const style = computed(() => {
  return useStyle({
    margin: useUnit(props.margin),
    padding: useUnit(props.padding),
    ...useStyle(props.customStyle),
  })
})

const iconStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.iconColor)
  style.width = useUnit(props.iconSize || props.iconWidth)
  style.height = useUnit(props.iconSize || props.iconHeight)
  style.fontWeight = props.iconWeight
  return useStyle(style)
})

const textStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.iconColor)
  style.width = useUnit(props.iconSize || props.iconWidth)
  style.height = useUnit(props.iconSize || props.iconHeight)
  style.fontWeight = props.iconWeight
  return useStyle(style)
})

defineExpose({ name: "zm-empty" })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-empty {
  flex: 1;
  display: flex;
  flex-shrink: 0;
  padding: 96rpx 0;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &__icon {
    width: 580rpx;
    height: 310rpx;
  }

  &__text {
    color: #999;
    font-size: 26rpx;
    margin-top: 24rpx;
  }

  &__slot {
    margin-top: 24rpx;
  }
}
</style>
