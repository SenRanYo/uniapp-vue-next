<template>
  <view class="zm-form" :class="[classs, customClass]" :style="[style]">
    <slot />
  </view>
</template>
<script setup lang="ts">
import { clone } from "../utils/utils"
import { formKey } from "../zm-form"
import { formEmits, formProps } from "./index"
import { useStyle, useChildren } from "../hooks"
import { FieldValidateError, FieldValidationStatus } from "../zm-field"

defineOptions({ name: "zm-form" })

const emits = defineEmits(formEmits)
const props = defineProps(formProps)
const initialModel = ref(clone(props.model))
const { childrens, linkChildren } = useChildren(formKey)

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (props.readonly) list.push("zm-form-readonly")
  if (props.disabled) list.push("zm-form-disabled")
  return list
})

/**
 * 计算最长label宽度
 */
const maxLabelWidth = computed(() => {
  return Math.max(...childrens.map((child) => toRef(child.exposed.labelRect).value.width))
})

/**
 * 提交表单
 */
function submit() {
  const values = getValues()
  validate()
    .then(() => emits("submit", values))
    .catch((errors: FieldValidateError[]) => {
      emits("failed", { values, errors })
    })
}

/**
 * 根据参数类型调用不同的验证函数
 * @param prop 待验证的属性，可以是字符串或字符串数组
 * @returns 验证结果
 */
function validate(prop?: string | string[]) {
  if (typeof prop === "string") {
    return validateField(prop)
  }
  return props.validateFirst ? validateSeq(prop) : validateAll(prop)
}

/**
 * 验证指定字段的数据序列，并返回一个 Promise 对象
 * @param props 一个可选的字符串数组，包含要验证的字段的属性名称
 * @returns 一个 Promise 对象，当验证成功时 resolve，当验证失败时 reject，并返回包含错误信息的 FieldValidateError 数组
 */
function validateSeq(props?: string[]) {
  return new Promise<void>((resolve, reject) => {
    const errors: FieldValidateError[] = []
    const fields = getFieldsByProps(props)

    fields
      .reduce(
        (promise, field) =>
          promise.then(() => {
            if (!errors.length) {
              return field.exposed.validate().then((error?: FieldValidateError) => {
                if (error) {
                  errors.push(error)
                }
              })
            }
          }),
        Promise.resolve(),
      )
      .then(() => {
        if (errors.length) {
          reject(errors)
        } else {
          resolve()
        }
      })
  })
}

/**
 * 验证所有字段
 * @param props 字段属性数组
 * @returns Promise，验证结果为void
 */
function validateAll(props?: string[]) {
  return new Promise<void>((resolve, reject) => {
    const fields = getFieldsByProps(props)
    Promise.all(fields.map((item) => item.exposed.validate())).then((errors) => {
      errors = errors.filter(Boolean)
      if (errors.length) {
        reject(errors)
      } else {
        resolve()
      }
    })
  })
}

/**
 * 验证单个字段
 * @param prop 字段属性
 * @returns Promise，验证结果
 */
function validateField(prop: string) {
  const children = childrens.find((item) => item.exposed.prop === prop)
  if (children) {
    return new Promise<void>((resolve, reject) => {
      children.exposed.validate().then((error?: FieldValidateError) => {
        error ? reject(error) : resolve()
      })
    })
  }
  return Promise.reject()
}

/**
 * 重置单项，将其重置为初始值，并移除校验结果
 * @param prop 字段属性
 */
function resetFields(prop?: string | string[]) {
  if (typeof prop === "string") prop = [prop]
  const fields = getFieldsByProps(prop)
  fields.forEach((item) => item.exposed.resetField())
}

/**
 * 清除字段验证
 * @param prop 待重置验证的属性，可以是字符串或字符串数组
 */
function clearValidate(prop?: string | string[]) {
  if (typeof prop === "string") {
    prop = [prop]
  }
  const fields = getFieldsByProps(prop)
  fields.forEach((item) => {
    item.exposed.resetValidate()
  })
}

/**
 * 获取所有字段的值
 * @returns 所有字段的值组成的对象
 */
function getValues() {
  return childrens.reduce<Record<string, unknown>>((form, field) => {
    if (field.exposed.prop !== undefined) {
      form[field.exposed.prop] = field.exposed.modelValue
    }
    return form
  }, {})
}

/**
 * 根据props数组获取对应的字段
 * @param props 字段属性数组
 * @returns 符合条件的字段数组
 */
function getFieldsByProps(props?: string[]) {
  return props ? childrens.filter((field) => props.includes(field.exposed.prop)) : childrens
}

/**
 * 获取所有字段的验证状态
 * @returns 所有字段的验证状态组成的对象
 */
function getValidateStatus() {
  childrens.reduce<Record<string, FieldValidationStatus>>((form, field) => {
    form[field.exposed.prop] = field.exposed.getValidationStatus()
    return form
  }, {})
}

linkChildren({ props, model: props.model, rules: props.rules, initialModel, maxLabelWidth })
defineExpose({ name: "zm-form", submit, validate, validateField, resetFields, getValues, clearValidate, getValidateStatus })
</script>
<script lang="ts">
export default {
  name: "zm-form",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss"></style>
