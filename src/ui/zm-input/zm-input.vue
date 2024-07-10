<template>
  <view class="zm-input" :class="[classs, customClass]" :style="[style]">
    <view class="zm-input__prefix" v-if="prefixIcon">
      <zm-icon :name="prefixIcon" :size="prefixIconSize" :color="prefixIconColor" :weight="prefixIconWeight"></zm-icon>
    </view>
    <view class="zm-input__main">
      <input
        class="zm-input__input"
        :style="[inputStyle]"
        :value="value"
        :type="type"
        :focus="focus"
        :cursor="+cursor"
        :disabled="disabled"
        :maxlength="+maxlength"
        :auto-blur="autoBlur"
        :confirm-type="confirmType"
        :confirm-hold="confirmHold"
        :hold-keyboard="holdKeyboard"
        :placeholder="placeholder"
        :adjust-position="adjustPosition"
        :cursor-spacing="+cursorSpacing"
        :selection-end="+selectionEnd"
        :selection-start="+selectionStart"
        :placeholder-style="placeholderStyle"
        :ignoreCompositionEvent="ignoreCompositionEvent"
        @blur="onBlur"
        @input="onInput"
        @focus="onFocus"
        @confirm="onConfirm"
        @keyboardheightchange="onKeyboardheightchange"
      />
      <view class="zm-input__clear" :style="[clearStyle]" v-if="clearable && value" @click="onClickClear">
        <zm-icon :name="clearIcon" :size="clearIconSize" :color="clearIconColor" :weight="clearIconWeight"></zm-icon>
      </view>
    </view>
    <view class="zm-input__suffix" v-if="suffixIcon">
      <zm-icon :name="suffixIcon" :size="suffixIconSize" :color="suffixIconColor" :weight="suffixIconWeight"></zm-icon>
    </view>
  </view>
</template>
<script setup lang="ts">
import { inputEmits, inputProps } from "./index"
import { useStyle, useColor, useUnit } from "../hooks"
import { InputOnInputEvent } from "@uni-helper/uni-app-types/index"

defineOptions({ name: "zm-input" })

const props = defineProps(inputProps)
const emits = defineEmits(inputEmits)

const value = ref("")

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
  if (props.round) list.push("zm-input--round")
  if (props.readonly) list.push("zm-input--readonly")
  if (props.disabled) list.push("zm-input--disabled")
  if (props.clearable) list.push("zm-input--clearable")
  return list
})

const inputStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  style.fontWeight = props.fontWeight
  style.textAlign = props.inputAlign
  return useStyle(style)
})

const clearStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.clearIconSize)
  style.height = useUnit(props.clearIconSize)
  return useStyle(style)
})

const placeholderStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.placeholderColor)
  return useStyle({ ...style, ...useStyle(props.placeholderStyle) }, "string")
})

const disabled = computed(() => {
  return props.disabled || props.readonly
})

watch(
  () => props.modelValue,
  (val) => {
    value.value = String(val)
  },
  { immediate: true },
)

async function upadteValue(value: string) {
  emits("change", value)
  emits("update:modelValue", value)
}

function onBlur() {
  emits("blur", value.value)
}

function onFocus() {
  emits("focus")
}

function onConfirm() {
  emits("confirm", value.value)
}

function onKeyboardheightchange() {
  emits("keyboardheightchange")
}

function onInput(event: InputOnInputEvent) {
  value.value = event.detail.value
  upadteValue(event.detail.value)
}

function onClickClear() {
  upadteValue("")
}

defineExpose({ name: "zm-input" })
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
