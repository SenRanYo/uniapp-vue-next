<template>
  <view class="zm-input" :class="[classs, customClass]" :style="[style]"></view>
</template>
<script setup lang="ts">
import { textareaEmits, textareaProps } from "./index"
import { useStyle, useColor, useUnit } from "../hooks"
import { InputOnInputEvent } from "@uni-helper/uni-app-types/index"

defineOptions({ name: "zm-input" })

const props = defineProps(textareaProps)
const emits = defineEmits(textareaEmits)

const style = computed(() => {
  const style: any = {}
  style.border = props.border
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.borderRadius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (props.disabled) list.push("zm-input--disabled")
  if (props.clearable) list.push("zm-input--clearable")
  return list
})

defineExpose({ name: "zm-input", close })
</script>
<script lang="ts">
export default {
  name: "zm-input",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-input {
  height: 80rpx;
  display: flex;
  padding: 0 16rpx;
  align-items: center;
  border-radius: 8rpx;
  border: 1rpx solid #dadbde;
  justify-content: space-between;

  &--round {
    border-radius: 9999px;
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &__main {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__input {
    flex: 1;
    height: 100%;
    font-size: 24rpx;
  }

  &__clear {
    display: flex;
    padding: 4rpx;
    align-items: center;
    border-radius: 9999px;
    justify-content: center;
    box-sizing: content-box;
    background-color: #c6c7cb;
  }

  &__prefix {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    margin-right: 8rpx;
    justify-content: center;
  }

  &__suffix {
    display: flex;
    flex-shrink: 0;
    margin-left: 8rpx;
    align-items: center;
    justify-content: center;
  }
}
</style>
