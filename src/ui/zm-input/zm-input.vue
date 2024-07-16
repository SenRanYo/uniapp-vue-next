<template>
  <view class="zm-input" :class="[classs, customClass]" :style="[style]">
    <input
      class="zm-input__input"
      :style="[inputStyle]"
      :value="current"
      :type="type"
      :focus="focus"
      :cursor="+cursor"
      :password="password"
      :disabled="disabled"
      :maxlength="+maxlength"
      :auto-blur="autoBlur"
      :confirm-type="confirmType"
      :confirm-hold="confirmHold"
      :hold-keyboard="holdKeyboard"
      :placeholder="placeholder"
      :cursor-color="cursorColor"
      :adjust-position="adjustPosition"
      :cursor-spacing="+cursorSpacing"
      :selection-end="+selectionEnd"
      :selection-start="+selectionStart"
      :placeholder-style="placeholderStyle"
      :ignore-composition-event="ignoreCompositionEvent"
      @blur="onBlur"
      @input="onInput"
      @focus="onFocus"
      @confirm="onConfirm"
      @keyboardheightchange="onKeyboardheightchange"
    />
    <view class="zm-input__clear" :style="[clearStyle]" v-if="clearable && current && isFocus" @click="onClickClear">
      <zm-icon :name="clearIcon" :size="clearIconSize" :color="clearIconColor" :weight="clearIconWeight"></zm-icon>
    </view>
  </view>
</template>
<script setup lang="ts">
import { formItemKey } from "../zm-form-item"
import { inputEmits, inputProps } from "./index"
import { useStyle, useColor, useUnit, useParent } from "../hooks"
import { InputOnInputEvent } from "@uni-helper/uni-app-types/index"

defineOptions({ name: "zm-input" })

const props = defineProps(inputProps)
const emits = defineEmits(inputEmits)

const { parent } = useParent(formItemKey)

const current = ref("")
const isFocus = ref(false)

const style = computed(() => {
  const style: any = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
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

const type = computed(() => {
  return props.type === "password" ? "text" : props.type
})

const password = computed(() => {
  return props.type === "password" ? true : props.password
})

const disabled = computed(() => {
  return props.disabled || props.readonly
})

watch(
  () => props.modelValue,
  (val) => {
    current.value = String(val)
  },
  { immediate: true },
)

function reset(value: any) {
  current.value = value
  upadteValue(value)
}

async function upadteValue(value: string) {
  emits("input", value)
  emits("change", value)
  emits("update:modelValue", value)
}

function onBlur() {
  setTimeout(() => (isFocus.value = false), 100)
  emits("blur", current.value)
  parent?.onBlur(current.value)
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

function onClickClear() {
  current.value = ""
  upadteValue("")
  emits("clear")
}

defineExpose({ name: "zm-input", reset })
</script>
<script lang="ts">
export default {
  name: "zm-input",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-input {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &__input {
    flex: 1;
    height: 100%;
    font-size: 24rpx;
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
