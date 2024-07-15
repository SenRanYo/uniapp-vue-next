<template>
  <view class="zm-textarea" :class="[classs, customClass]" :style="[style]">
    <view class="zm-textarea__content">
      <textarea
        class="zm-textarea__textarea"
        :style="[textareaStyle]"
        :value="current"
        :fixed="fixed"
        :focus="focus"
        :cursor="+cursor"
        :disabled="disabled"
        :maxlength="+maxlength"
        :placeholder="placeholder"
        :auto-height="autoHeight"
        :confirm-type="confirmType"
        :hold-keyboard="holdKeyboard"
        :selection-end="+selectionEnd"
        :cursor-spacing="+cursorSpacing"
        :adjust-position="adjustPosition"
        :show-confirm-bar="showConfirmBar"
        :selection-start="+selectionStart"
        :placeholder-style="placeholderStyle"
        :disable-default-padding="disableDefaultPadding"
        :ignore-composition-event="ignoreCompositionEvent"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        @confirm="onConfirm"
        @linechange="onLinechange"
        @keyboardheightchange="onKeyboardheightchange"
      />
      <view class="zm-textarea__clear" :style="[clearStyle]" v-if="clearable && current && isFocus" @click="onClickClear">
        <zm-icon :name="clearIcon" :size="clearIconSize" :color="clearIconColor" :weight="clearIconWeight"></zm-icon>
      </view>
    </view>
    <view class="zm-textarea__count" :style="[countStyle]" v-if="showCount">{{ valueLength }}</view>
  </view>
</template>
<script setup lang="ts">
import { formItemKey } from "../zm-form-item"
import { textareaEmits, textareaProps } from "./index"
import { useStyle, useColor, useUnit, useParent } from "../hooks"
import { InputOnInputEvent, TextareaOnLinechangeEvent } from "@uni-helper/uni-app-types/index"

defineOptions({ name: "zm-textarea" })

const props = defineProps(textareaProps)
const emits = defineEmits(textareaEmits)

const { parent } = useParent(formItemKey)

const current = ref("")
const isFocus = ref(false)

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

const clearStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.clearIconSize)
  style.height = useUnit(props.clearIconSize)
  return useStyle(style)
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
  setTimeout(() => (isFocus.value = false), 100)
  emits("blur", current.value)
  parent?.onBlur(current.value)
}

function onLinechange(event: TextareaOnLinechangeEvent) {
  emits("linechange", event)
}

function onFocus() {
  isFocus.value = true
  emits("focus")
}

function onConfirm() {
  emits("confirm", current.value)
}

function onKeyboardheightchange() {
  emits("keyboardheightchange")
}

function onInput(event: InputOnInputEvent) {
  current.value = event.detail.value
  upadteValue(event.detail.value)
  parent?.onChange(current.value)
}

async function upadteValue(value: string) {
  emits("change", value)
  emits("update:modelValue", value)
}

function onClickClear() {
  current.value = ""
  upadteValue("")
}

defineExpose({ name: "zm-textarea" })
</script>
<script lang="ts">
export default {
  name: "zm-textarea",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-textarea {
  flex: 1;
  display: flex;
  flex-direction: column;

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &__textarea {
    width: 100%;
    font-size: inherit;
  }

  &__content {
    display: flex;
    align-items: center;
  }

  &__count {
    color: #909193;
    text-align: right;
  }

  &__clear {
    display: flex;
    padding: 4rpx;
    margin-left: 8rpx;
    align-items: center;
    border-radius: 9999px;
    justify-content: center;
    box-sizing: content-box;
    background-color: #c6c7cb;
  }
}
</style>
