<template>
  <view class="zm-form-item" :class="[classs, customClass]" :style="[style]">
    <view class="zm-form-item__label" :class="[labelClass]" :style="[labelStyle]">
      <slot name="label">{{ label }}{{ colon ? ":" : "" }}</slot>
    </view>
    <view class="zm-form-item__content">
      <slot></slot>
      <view class="zm-form-item__error" :style="[errorStyle]">
        <view class="zm-form-item__error__text">
          <slot name="error">{{ state.validateMessage }}</slot>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { getDeepValue } from "../utils/utils"
import { formKey, FormValidateRule } from "../zm-form"
import { formItemEmits, formItemProps, formItemKey } from "./index"
import { FieldValidateError, FieldValidationStatus } from "../zm-field"
import { isEmpty, isFunction, isPromise, isNoEmpty } from "../utils/check"
import { useStyle, useColor, useUnit, useParent, useElRect, useChildren } from "../hooks"

defineOptions({ name: "zm-form-item" })

const props = defineProps(formItemProps)
const emits = defineEmits(formItemEmits)
const instance = getCurrentInstance()

const { parent } = useParent(formKey)
const { childrens, linkChildren } = useChildren(formItemKey)
linkChildren({ props, prop: props.prop })

const state = reactive({ status: "unvalidated" as FieldValidationStatus, focused: false, validateMessage: "" })
const errorRect = ref<UniApp.NodeInfo>({})

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  list.push(`zm-form-item--${props.labelAlign}`)
  return list
})

const labelClass = computed(() => {
  const list: string[] = []
  list.push(`zm-form-item__label--${props.labelAlign}`)
  return list
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

const errorStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.errorColor)
  style.fontSize = useUnit(props.errorSize)
  style.fontWeight = props.errorWeight
  style.textAlign = props.errorAlign
  if (state.status === "failed") {
    style.maxHeight = errorRect.value.height + "px"
  }
  return useStyle(style)
})

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
    const returnVal = rule.validator!(value, rule)

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

/**
 * 重置字段状态
 */
function resetField() {
  state.status = "unvalidated"
  childrens.forEach((children) => {
    const value = parent.originModel.value[props.prop]
    children.exposed?.reset(value)
  })
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
  errorRect.value = await useElRect(".zm-form-item__error__text", instance)
}

defineExpose({ name: "zm-form-item", validate, resetField, resetValidate })
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

  &--top {
    display: flex;
    flex-direction: column;
  }

  &__label {
    margin-right: 16rpx;

    &--top {
      margin-bottom: 8rpx;
    }
  }

  &__error {
    max-height: 0;
    overflow: hidden;
    margin-top: 8rpx;
    transition: 0.3s ease-out;
  }

  &__content {
    flex: 1;
  }
}
</style>
