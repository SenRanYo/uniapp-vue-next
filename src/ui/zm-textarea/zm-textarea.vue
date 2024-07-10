<template>
  <view class="zm-textarea" :class="[classs, customClass]" :style="[style]">
    <textarea
      class="zm-textarea__textarea"
      :style="[textareaStyle]"
      :value="value"
      :fixed="fixed"
      :focus="focus"
      :disabled="disabled"
      :placeholder="placeholder"
      :placeholder-style="placeholderStyle"
      :cursor="+cursor"
      :cursor-spacing="+cursorSpacing"
      :auto-height="autoHeight"
      :show-confirm-bar="showConfirmBar"
      :selection-start="+selectionStart"
      :selection-end="+selectionEnd"
      :adjust-position="adjustPosition"
      :disable-default-padding="disableDefaultPadding"
      :hold-keyboard="holdKeyboard"
      :maxlength="+maxlength"
      :confirm-type="confirmType"
      :ignore-composition-event="ignoreCompositionEvent"
      @focus="onFocus"
      @blur="onBlur"
      @linechange="onLinechange"
      @input="onInput"
      @confirm="onConfirm"
      @keyboardheightchange="onKeyboardheightchange"
    />
    <view class="zm-textarea__count" :style="[countStyle]" v-if="showCount">{{ valueLength }}</view>
  </view>
</template>
<script setup lang="ts">
import { textareaEmits, textareaProps } from "./index"
import { useStyle, useColor, useUnit } from "../hooks"
import { InputOnInputEvent, TextareaOnLinechangeEvent } from "@uni-helper/uni-app-types/index"

defineOptions({ name: "zm-textarea" })

const props = defineProps(textareaProps)
const emits = defineEmits(textareaEmits)

const value = ref("")

const style = computed(() => {
  const style: any = {}
  style.border = props.border
  style.width = useUnit(props.width)
  style.minHeight = useUnit(props.minHeight)
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.borderRadius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (props.disabled) list.push("zm-textarea--disabled")
  if (props.clearable) list.push("zm-textarea--clearable")
  return list
})

const textareaStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  style.fontWeight = props.fontWeight
  return useStyle(style)
})

const placeholderStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.placeholderColor)
  return useStyle({ ...style, ...useStyle(props.placeholderStyle) }, "string")
})

const countStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.countColor)
  style.fontSize = useUnit(props.countSize)
  style.fontWeight = props.countWeight
  return useStyle(style)
})

const valueLength = computed(() => {
  return props.maxlength === -1 ? String(props.modelValue).length : `${String(props.modelValue).length}/${props.maxlength}`
})

function onBlur() {
  emits("blur", value.value)
}

function onLinechange(event: TextareaOnLinechangeEvent) {
  emits("linechange", event)
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

async function upadteValue(value: string) {
  emits("change", value)
  emits("update:modelValue", value)
}

defineExpose({ name: "zm-textarea", close })
</script>
<script lang="ts">
export default {
  name: "zm-textarea",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-textarea {
  padding: 16rpx;
  border-radius: 8rpx;
  border: 1rpx solid #dadbde;

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &__textarea {
    width: 100%;
    font-size: inherit;
  }

  &__count {
    color: #909193;
    text-align: right;
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
}
</style>
