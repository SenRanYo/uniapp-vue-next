<template>
  <view class="zm-radio-group" :class="[classs, customClass]" :style="[style]">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { useStyle } from "../hooks"
import { radioGroupEmits, radioGroupProps, RadioGroupValueType, RadioGroupChildrenType } from "./index"

defineOptions({ name: "zm-cell-group" })
const emits = defineEmits(radioGroupEmits)
const props = defineProps(radioGroupProps)
const childrens = ref([])

const style = computed(() => {
  const style = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list = []
  if (props.vertical) list.push("zm-radio-group--vertical")
  return list
})

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => updateValue(value),
})

async function updateValue(value: RadioGroupValueType) {
  emits("update:modelValue", toRaw(value))
  await nextTick()
  emits("change", toRaw(value))
}

function addChildren(children: RadioGroupChildrenType) {
  const index = childrens.value.findIndex(({ name }) => name === children.name)
  if (index === -1) childrens.value.push(children)
}

provide("zm-radio-group", { ...toRefs(props), modelValue, childrens, addChildren, updateValue })
defineExpose({ name: "zm-radio-group" })
</script>
<script lang="ts">
export default {
  name: "zm-cell-group",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-radio-group {
  display: flex;

  &--vertical {
    flex-direction: column;
  }
}
</style>
