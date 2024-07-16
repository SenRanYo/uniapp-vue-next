<template>
  <view class="zm-form-item" :class="[customClass]" :style="[style]">
    <view class="zm-form-item__content" :class="[contentClass]">
      <view class="zm-form-item__label" :class="[labelClass]" :style="[labelStyle]" v-if="label || slots.label">
        <slot name="label">{{ label }}{{ colon ? ":" : "" }}</slot>
      </view>
      <slot></slot>
    </view>
    <view class="zm-form-item__error" :style="[errorStyle]">
      <view class="zm-form-item__error__text">
        <slot name="error">{{ state.validateMessage }}</slot>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { toArray, getDeepValue } from "../utils/utils"
import { formKey, FormValidateRule, FormValidateTrigger } from "../zm-form"
import { formItemEmits, formItemProps, formItemKey } from "./index"
import { FieldValidateError, FieldValidationStatus } from "../zm-field"
import { isDef, isEmpty, isFunction, isPromise, isNoEmpty, isArray, isString } from "../utils/check"
import { useStyle, useColor, useUnit, useParent, useElRect, useChildren } from "../hooks"

defineOptions({ name: "zm-form-item" })

const slots = useSlots()
const props = defineProps(formItemProps)
const emits = defineEmits(formItemEmits)
const instance = getCurrentInstance()

const state = reactive({ status: "unvalidated" as FieldValidationStatus, focused: false, validateMessage: "" })
const errorRect = ref<UniApp.NodeInfo>({})
const labelRect = ref<UniApp.NodeInfo>({})

const { parent } = useParent(formKey)
const { childrens, linkChildren } = useChildren(formItemKey)
linkChildren({ props, prop: props.prop, onBlur, onChange })

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const contentClass = computed(() => {
  const list: string[] = []
  list.push(`zm-form-item__content--align-${props.labelAlign}`)
  list.push(`zm-form-item__content--position-${props.labelPosition}`)
  return list
})

const labelClass = computed(() => {
  const list: string[] = []
  list.push(`zm-form-item__label--position-${props.labelPosition}`)
  return list
})

const labelStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.labelColor)
  style.fontSize = useUnit(props.labelSize)
  style.lineHeight = useUnit(props.labelLineHeight)
  style.textAlign = props.labelAlign
  style.fontWeight = props.labelWeight
  style.width = prop("labelWidth") === "auto" ? parent.maxLabelWidth.value + "px" : useUnit(prop("labelWidth"))
  return useStyle(style)
})

const errorStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.errorColor)
  style.fontSize = useUnit(props.errorSize)
  style.fontWeight = props.errorWeight
  style.textAlign = props.errorAlign
  style.paddingLeft = labelRect.value.width + "px"
  if (state.status === "failed") {
    style.marginTop = "8rpx"
    style.maxHeight = errorRect.value.height + "px"
  }
  return useStyle(style)
})

function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (isDef(parent.props[name])) return parent.props[name]
  return ""
}

/**
 * 执行一组验证规则
 * @param rules 表单验证规则数组
 * @returns 返回一个 Promise<void> 对象
 */
function runRules(rules: FormValidateRule[]): Promise<void> {
  return rules.reduce(
    (promise, rule) =>
      promise.then(() => {
        if (state.status === "failed") return
        let value = getPropValue()
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

/**
 * 执行同步验证规则
 * @param value 待验证的值
 * @param rule 表单验证规则对象
 * @returns 返回验证结果，true表示验证通过，false表示验证失败
 */
function runSyncRule(value: unknown, rule: FormValidateRule) {
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

/**
 * 执行验证规则的验证器
 * @param value 待验证的值
 * @param rule 表单验证规则对象
 * @returns 返回一个 Promise 对象
 */
function runRuleValidator(value: unknown, rule: FormValidateRule) {
  return new Promise((resolve) => {
    const returnVal = rule.validator!(value, toRaw(rule))

    if (isPromise(returnVal)) {
      returnVal.then(resolve)
      return
    }

    resolve(returnVal)
  })
}

/**
 * 获取验证规则的消息
 * @param value 待验证的值
 * @param rule 表单验证规则对象
 */
function getRuleMessage(value: unknown, rule: FormValidateRule) {
  const { message } = rule

  if (isFunction(message)) {
    return message(value, rule)
  }
  return message || ""
}

/**
 * 执行表单验证
 * @param rules 表单验证规则，默认为获取属性规则
 * @returns 返回一个 Promise，可能包含 FieldValidateError 对象或 void
 */
function validate(rules = getPropRules()) {
  return new Promise<FieldValidateError | void>((resolve) => {
    resetValidate()
    if (isNoEmpty(rules)) {
      runRules(rules).then(() => {
        if (state.status === "failed") {
          resolve({ prop: props.prop, message: state.validateMessage })
        } else {
          state.status = "passed"
          resolve()
        }
        resize()
      })
    } else {
      resolve()
    }
  })
}

function validateWithTrigger(trigger: FormValidateTrigger) {
  const rules = getPropRules()
  if (parent && isNoEmpty(rules)) {
    const { validateTrigger } = parent.props
    const defaultTrigger = toArray(validateTrigger).includes(trigger)
    const result = rules.filter((rule: FormValidateRule) => {
      if (rule.trigger) {
        return toArray(rule.trigger).includes(trigger)
      }
      return defaultTrigger
    })
    if (result.length) {
      validate(result)
    }
  }
}

/**
 * 重置字段状态
 */
function resetField() {
  childrens.forEach((children) => {
    const value = parent.originModel.value[props.prop]
    children.exposed?.reset(value)
  })
  state.status = "unvalidated"
}

/**
 * 重置验证状态
 */
function resetValidate() {
  state.status = "unvalidated"
}

/**
 * 获取属性值
 * @returns 返回属性值
 */
function getPropValue() {
  return getDeepValue(parent.model, props.prop)
}

/**
 * 获取属性验证规则
 * @returns 返回属性值
 */
function getPropRules() {
  return getDeepValue(parent.rules, props.prop)
}

/**
 * 重新获取元素rect
 */
async function resize() {
  labelRect.value = await useElRect(".zm-form-item__label", instance)
  errorRect.value = await useElRect(".zm-form-item__error__text", instance)
}

/**
 * 失去焦点事件处理函数
 */
function onBlur() {
  validateWithTrigger("blur")
}

/**
 * 值变化处理函数
 */
function onChange() {
  validateWithTrigger("change")
}

onMounted(() => resize())
defineExpose({ name: "zm-form-item", labelRect, validate, resetField, resetValidate })
</script>
<script lang="ts">
export default {
  name: "zm-form-item",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-form-item {
  flex: 1;
  display: flex;
  padding: 16rpx;
  flex-direction: column;

  &__content {
    flex: 1;
    display: flex;
    align-items: center;

    &--align-top {
      align-items: flex-start;
    }

    &--align-center {
      align-items: center;
    }

    &--align-bottom {
      align-items: flex-end;
    }

    &--position-top {
      flex-direction: column;
    }

    &--position-left {
      text-align: left;
    }

    &--position-center {
      text-align: center;
    }

    &--position-right {
      text-align: right;
    }
  }

  &__label {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    padding-right: 16rpx;
  }

  &__error {
    max-height: 0;
    overflow: hidden;
    transition: 0.3s ease-out;
  }
}
</style>
