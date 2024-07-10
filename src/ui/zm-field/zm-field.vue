<template>
  <view class="zm-field" :class="[classs, customClass]" :style="[style]">
    <block v-if="type === 'textarea'">
      <textarea
        class="zm-field__textarea"
        :style="[textareaStyle]"
        :value="current"
        :fixed="fixed"
        :focus="focus"
        :disabled="disabled"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        :cursor="+cursor"
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
        @focus="onFocus"
        @blur="onBlur"
        @linechange="onLinechange"
        @input="onInput"
        @confirm="onConfirm"
        @keyboardheightchange="onKeyboardheightchange"
      />
      <view class="zm-field__count"></view>
    </block>
    <block v-else>
      <view class="zm-field__label" :style="[labelStyle]" v-if="label || slots.label">
        <slot name="label">{{ label }}</slot>
      </view>
      <view class="zm-field__prefix" v-if="prefixIcon || slots.prefixIcon">
        <slot name="prefix">
          <zm-icon :name="prefixIcon" :size="prefixIconSize" :color="prefixIconColor" :weight="prefixIconWeight"></zm-icon>
        </slot>
      </view>
      <input
        class="zm-field__input"
        :style="[inputStyle]"
        :value="current"
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
      <view class="zm-field__clear" :style="[clearStyle]" v-if="clearable && current && focus" @click="onClickClear">
        <zm-icon :name="clearIcon" :size="clearIconSize" :color="clearIconColor" :weight="clearIconWeight"></zm-icon>
      </view>
      <view class="zm-field__suffix" v-if="suffixIcon || slots.suffixIcon">
        <zm-icon :name="suffixIcon" :size="suffixIconSize" :color="suffixIconColor" :weight="suffixIconWeight"></zm-icon>
      </view>
    </block>
  </view>
</template>
<script setup lang="ts">
import { formKey } from "../zm-form"
import { fieldEmits, fieldProps } from "./index"
import { useStyle, useColor, useUnit, useParent } from "../hooks"
import { TextareaOnLinechangeEvent } from "@uni-helper/uni-app-types/index"

defineOptions({ name: "zm-field" })

const slots = useSlots()
const props = defineProps(fieldProps)
const emits = defineEmits(fieldEmits)

const { index, parent } = useParent(formKey)

const focus = ref(false)
const current = ref("")

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
  if (props.readonly) list.push("zm-field-readonly")
  if (props.disabled) list.push("zm-field-disabled")
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

const labelStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.labelWidth)
  style.color = useColor(props.labelColor)
  style.fontSize = useUnit(props.labelSize)
  style.fontWeight = props.labelWeight
  style.textAlign = props.labelAlign
  return useStyle(style)
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

async function upadteValue(value: string) {
  emits("change", value)
  emits("update:modelValue", value)
}

function onBlur() {
  setTimeout(() => (focus.value = false), 100)
  emits("blur", current.value)
}

function onFocus() {
  focus.value = true
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

function onInput(event: any) {
  current.value = event.detail.value
  upadteValue(event.detail.value)
}

function onClickClear() {
  current.value = ""
  upadteValue("")
}

defineExpose({ name: "zm-field", prop: props.prop })
</script>
<script lang="ts">
export default {
  name: "zm-field",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-field {
  display: flex;
  padding: 16rpx;
  align-items: center;
  border-radius: 8rpx;
  border: 1rpx solid #dadbde;

  &--textarea {
    display: block;
  }

  &__input {
    flex: 1;
    height: 100%;
    font-size: inherit;
  }

  &__textarea {
    font-size: inherit;
  }

  &__label {
    margin-right: 16rpx;
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
