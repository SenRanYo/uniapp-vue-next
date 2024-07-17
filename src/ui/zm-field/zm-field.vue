<template>
  <view class="zm-field" :class="[classs, customClass]" :style="[style]">
    <view class="zm-field__label" :class="[labelClass]" :style="[labelStyle]" v-if="label || slots.label">
      <slot name="label">{{ label }}{{ colon ? ":" : "" }}</slot>
    </view>
    <view class="zm-field__prefix" v-if="prefixIcon || slots.prefixIcon">
      <slot name="prefix">
        <zm-icon :name="prefixIcon" :size="prefixIconSize" :color="prefixIconColor" :weight="prefixIconWeight"></zm-icon>
      </slot>
    </view>
    <zm-textarea
      v-if="type === 'textarea'"
      :style="[textareaStyle]"
      v-model="current"
      :fixed="fixed"
      :focus="focus"
      :disabled="disabled"
      :placeholder="placeholder"
      :placeholder-style="placeholderStyle"
      :cursor="+cursor"
      :input-align="inputAlign"
      :cursor-spacing="+cursorSpacing"
      :auto-height="autosize"
      :show-confirm-bar="showConfirmBar"
      :selection-start="+selectionStart"
      :selection-end="+selectionEnd"
      :adjust-position="adjustPosition"
      :disable-default-padding="disableDefaultPadding"
      :hold-keyboard="holdKeyboard"
      :maxlength="+maxlength"
      :confirm-type="confirmType"
      :ignore-composition-event="ignoreCompositionEvent"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      @clear="onClear"
      @confirm="onConfirm"
      @linechange="onLinechange"
      @keyboardheightchange="onKeyboardheightchange"
    />
    <zm-input
      v-else
      :style="[inputStyle]"
      v-model="current"
      :type="type"
      :focus="focus"
      :cursor="+cursor"
      :disabled="disabled"
      :maxlength="+maxlength"
      :auto-blur="autoBlur"
      :input-align="inputAlign"
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
      @clear="onClear"
      @focus="onFocus"
      @confirm="onConfirm"
      @keyboardheightchange="onKeyboardheightchange"
    />
    <view class="zm-field__suffix" v-if="suffixIcon || slots.suffixIcon">
      <zm-icon :name="suffixIcon" :size="suffixIconSize" :color="suffixIconColor" :weight="suffixIconWeight"></zm-icon>
    </view>
  </view>
</template>
<script setup lang="ts">
import { useStyle, useColor, useUnit, useParent } from "../hooks"
import { fieldEmits, fieldProps, FieldValidationStatus } from "./index"
import { TextareaOnLinechangeEvent } from "@uni-helper/uni-app-types/index"

defineOptions({ name: "zm-field" })

const slots = useSlots()
const props = defineProps(fieldProps)
const emits = defineEmits(fieldEmits)

const current = ref("")
const isFocus = ref(false)

const style = computed(() => {
  const style: any = {}
  style.border = props.border
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.minHeight = useUnit(props.minHeight)
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.borderRadius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  list.push(`zm-field--${props.type}`)
  if (props.readonly) list.push("zm-field--readonly")
  if (props.disabled) list.push("zm-field--disabled")
  if (props.labelAlign) list.push(`zm-field--${props.labelAlign}`)
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

const labelStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.labelWidth)
  style.color = useColor(props.labelColor)
  style.fontSize = useUnit(props.labelSize)
  style.fontWeight = props.labelWeight
  style.textAlign = props.labelAlign
  return useStyle(style)
})

const labelClass = computed(() => {
  const list: string[] = []
  if (props.labelAlign) list.push(`zm-field__label--${props.labelAlign}`)
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

const type = computed(() => {
  return props.type as any
})

const disabled = computed(() => {
  return props.disabled || props.readonly
})

watch(
  () => props.modelValue,
  (val) => (current.value = String(val)),
  { immediate: true },
)

function reset(value: any) {
  current.value = value
  upadteValue(value)
}

async function upadteValue(value: string) {
  emits("change", value)
  emits("update:modelValue", value)
}

function onInput(value: any) {
  current.value = value
  upadteValue(value)
}

function onClear() {
  emits("clear")
  upadteValue("")
}

function onBlur() {
  setTimeout(() => (isFocus.value = false), 100)
  emits("blur", current.value)
}

function onFocus() {
  isFocus.value = true
  emits("focus")
}

function onConfirm() {
  emits("confirm", current.value)
}

function onLinechange(event: TextareaOnLinechangeEvent) {
  emits("linechange", event)
}

function onKeyboardheightchange() {
  emits("keyboardheightchange")
}

defineExpose({ name: "zm-field", prop: props.prop, modelValue: props.modelValue, reset })
</script>
<script lang="ts">
export default {
  name: "zm-field",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-field {
  flex: 1;
  display: flex;

  &--top {
    display: flex;
    flex-direction: column;
  }

  &--center:not(&--textarea) {
    display: flex;
    align-items: center;
  }

  &--right:not(&--textarea) {
    display: flex;
    align-items: center;
  }

  &--disabled {
    opacity: 0.6;
  }

  &__input {
    flex: 1;
    height: 100%;
    display: flex;
    font-size: inherit;
  }

  &__textarea {
    width: 100%;
    font-size: inherit;
  }

  &__count {
    flex: 1;
    color: #909193;
    margin-top: 8rpx;
    text-align: right;
  }

  &__label {
    height: max-content;
    margin-right: 16rpx;

    &--top {
      width: 100%;
      display: flex;
      text-align: left;
      margin-bottom: 16rpx;
      overflow-wrap: break-word;
    }

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }
  }

  &__value {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    position: relative;
    word-wrap: break-word;
    vertical-align: middle;
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
    margin-right: 16rpx;
  }

  &__suffix {
    margin-left: 16rpx;
  }
}
</style>
