<template>
  <view class="zm-checkbox-group" :class="[classs, customClass]" :style="[style]">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { useStyle } from "../hooks"
import { isBoolean } from "../utils/check"
import { checkboxGroupEmits, checkboxGroupProps, CheckboxGroupValueType, CheckboxGroupChildrenType } from "./index"

defineOptions({ name: "zm-cell-group" })
const emits = defineEmits(checkboxGroupEmits)
const props = defineProps(checkboxGroupProps)
const childrens = ref([])

const style = computed(() => {
  const style = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list = []
  if (props.vertical) list.push("zm-checkbox-group--vertical")
  return list
})

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    updateValue(value)
  },
})

function toggleAll(checked: boolean) {
  if (isBoolean(checked)) {
    if (checked) {
      const value = childrens.value.map((item) => item.name)
      updateValue(value)
    } else {
      updateValue([])
    }
  } else {
    const value = []
    childrens.value.forEach((children) => {
      if (props.modelValue.includes(children.name || children.index)) value.push(children.name)
    })
    updateValue(value)
  }
}

async function updateValue(value: CheckboxGroupValueType) {
  emits("update:modelValue", toRaw(value))
  await nextTick()
  emits("change", toRaw(value))
}

function addChildren(children: CheckboxGroupChildrenType) {
  const index = childrens.value.findIndex(({ name }) => name === children.name)
  if (index === -1) childrens.value.push(children)
}

provide("zm-checkbox-group", { ...toRefs(props), modelValue, childrens, addChildren, toggleAll, updateValue })
defineExpose({ name: "zm-checkbox-group", toggleAll })
</script>
<script lang="ts">
export default {
  name: "zm-cell-group",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-checkbox-group {
  display: flex;

  &--vertical {
    flex-direction: column;
  }
}
</style>
