<template>
  <view class="zm-checkbox-group" :class="[classs, customClass]" :style="[style]">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { isBoolean } from "../utils/check"
import { useStyle, useChildren } from "../hooks"
import { checkboxGroupEmits, checkboxGroupProps, CheckboxGroupValueType, checkboxGroupKey } from "./index"

defineOptions({ name: "zm-checkbox-group" })
const emits = defineEmits(checkboxGroupEmits)
const props = defineProps(checkboxGroupProps)

const { childrens, linkChildren } = useChildren(checkboxGroupKey)
linkChildren({ props, updateValue })

const style = computed(() => {
  const style = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list = []
  if (props.vertical) list.push("zm-checkbox-group--vertical")
  return list
})

function toggleAll(checked: boolean) {
  if (isBoolean(checked)) {
    if (checked) {
      const value: any[] = childrens.map((item) => item.props.name)
      updateValue(value)
    } else {
      updateValue([])
    }
  } else {
    const value = []
    childrens.forEach((children) => {
      if (props.modelValue.includes(children.props.name as any)) value.push(children.props.name)
    })
    updateValue(value)
  }
}

async function updateValue(value: CheckboxGroupValueType) {
  emits("update:modelValue", toRaw(value))
  await nextTick()
  emits("change", toRaw(value))
}

defineExpose({ name: "zm-checkbox-group", toggleAll })
</script>
<script lang="ts">
export default {
  name: "zm-checkbox-group",
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
