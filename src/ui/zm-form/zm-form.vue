<template>
  <view class="zm-form" :class="[classs, customClass]" :style="[style]">
    <slot />
  </view>
</template>
<script setup lang="ts">
import { formKey } from "../zm-form"
import { formEmits, formProps } from "./index"
import { useStyle, useColor, useUnit, useChildren } from "../hooks"

defineOptions({ name: "zm-form" })

const props = defineProps(formProps)
const emits = defineEmits(formEmits)

const { childrens, linkChildren } = useChildren(formKey)
linkChildren({ props })

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

function getFieldsByProps(props?: string[]) {
  return props ? childrens.filter((field) => props.includes(field.exposed.prop)) : childrens
}

function submit() {
  const values = getValues()
}

function validate() {}

function getValues() {
  childrens.reduce<Record<string, unknown>>((form, field) => {
    if (field.exposed.prop !== undefined) {
      form[field.exposed.prop] = field.exposed.modelValue
    }
    return form
  }, {})
}

function scrollToField() {}

function resetValidation() {}

function getValidationStatus() {}

defineExpose({ name: "zm-form", submit, validate, getValues, scrollToField, resetValidation, getValidationStatus })
</script>
<script lang="ts">
export default {
  name: "zm-form",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss"></style>
