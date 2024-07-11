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
    <view class="zm-field__value" v-if="type === 'textarea'">
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
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        @confirm="onConfirm"
        @linechange="onLinechange"
        @keyboardheightchange="onKeyboardheightchange"
      />
      <view class="zm-field__count" :style="[countStyle]" v-if="showCount">{{ valueLength }}</view>
    </view>
    <view class="zm-field__value" v-else>
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
    </view>
    <view class="zm-field__suffix" v-if="suffixIcon || slots.suffixIcon">
      <zm-icon :name="suffixIcon" :size="suffixIconSize" :color="suffixIconColor" :weight="suffixIconWeight"></zm-icon>
    </view>
  </view>
</template>
<script setup lang="ts">
import { formKey } from "../zm-form"
import { isEmpty, isFunction, isNoEmpty, isPromise } from "../utils/check"
import { fieldEmits, fieldProps, FieldRule, FieldValidateError, FieldValidationStatus } from "./index"
import { useStyle, useColor, useUnit, useParent } from "../hooks"
import { TextareaOnLinechangeEvent } from "@uni-helper/uni-app-types/index"

defineOptions({ name: "zm-field" })

const slots = useSlots()
const props = defineProps(fieldProps)
const emits = defineEmits(fieldEmits)

const { index, parent } = useParent(formKey)

const current = ref("")
const isFocus = ref(false)
const state = reactive({
  status: "unvalidated" as FieldValidationStatus,
  focused: false,
  validateMessage: "",
})

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

const countStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.countColor)
  style.fontSize = useUnit(props.countSize)
  style.fontWeight = props.countWeight
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

const showCount = computed(() => {
  return props.showCount && String(props.modelValue).length > 0
})

const valueLength = computed(() => {
  return props.maxlength === -1 ? String(props.modelValue).length : `${String(props.modelValue).length}/${props.maxlength}`
})

watch(
  () => props.modelValue,
  (val) => (current.value = String(val)),
  { immediate: true },
)

function runRules(rules: FieldRule[]): Promise<void> {
  return rules.reduce(
    (promise, rule) =>
      promise.then(() => {
        if (state.status === "failed") return
        let value = props.modelValue
        if (rule.formatter) {
          value = rule.formatter(value, rule)
        }

        if (!runSyncRule(value, rule)) {
          state.status = "failed"
          state.validateMessage = getRuleMessage(value, rule)
          return
        }

        if (rule.validator) {
          if (isEmpty(value) && rule.validateEmpty === false) {
            return
          }

          return runRuleValidator(value, rule).then((result) => {
            if (result && typeof result === "string") {
              state.status = "failed"
              state.validateMessage = result
            } else if (result === false) {
              state.status = "failed"
              state.validateMessage = getRuleMessage(value, rule)
            }
          })
        }
      }),
    Promise.resolve(),
  )
}

function runSyncRule(value: unknown, rule: FieldRule) {
  if (isEmpty(value)) {
    if (rule.required) {
      return false
    }
    if (rule.validateEmpty === false) {
      return true
    }
  }
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return false
  }
  return true
}

function runRuleValidator(value: unknown, rule: FieldRule) {
  return new Promise((resolve) => {
    const returnVal = rule.validator!(value, rule)

    if (isPromise(returnVal)) {
      returnVal.then(resolve)
      return
    }

    resolve(returnVal)
  })
}

function getRuleMessage(value: unknown, rule: FieldRule) {
  const { message } = rule

  if (isFunction(message)) {
    return message(value, rule)
  }
  return message || ""
}

function validate(rules = props.rules) {
  console.log(rules)
  return new Promise<FieldValidateError | void>((resolve, reject) => {
    resetValidation()
    if (isNoEmpty(props.rules)) {
      emits("startValidate")
      runRules(rules).then(() => {
        if (state.status === "failed") {
          resolve({ prop: props.prop, message: state.validateMessage })
          emits("endValidate", { status: state.status, message: state.validateMessage })
        } else {
          state.status = "passed"
          resolve()
          emits("endValidate", { status: state.status, message: state.validateMessage })
        }
      })
    } else {
      resolve()
    }
  })
}

function resetValidation() {
  state.status = "unvalidated"
  state.validateMessage = ""
}

async function upadteValue(value: string) {
  emits("change", value)
  emits("update:modelValue", value)
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

function onInput(event: any) {
  current.value = event.detail.value
  upadteValue(event.detail.value)
}

function onClickClear() {
  current.value = ""
  upadteValue("")
}

defineExpose({ name: "zm-field", prop: props.prop, validate })
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
  border-radius: 8rpx;
  border: 1rpx solid #dadbde;

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
