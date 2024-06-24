<template>
  <view class="zm-radio-group" :class="[classs, customClass]" :style="[style]">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { useStyle, useChildren } from "../hooks"
import { radioGroupEmits, radioGroupProps, RadioGroupValueType, radioGroupKey } from "./index"

defineOptions({ name: "zm-radio-group" })

const emits = defineEmits(radioGroupEmits)
const props = defineProps(radioGroupProps)

const { linkChildren } = useChildren(radioGroupKey)
linkChildren({ props, updateValue })

const style = computed(() => {
  const style = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list = []
  if (props.vertical) list.push("zm-radio-group--vertical")
  return list
})

async function updateValue(value: RadioGroupValueType) {
  emits("update:modelValue", toRaw(value))
  await nextTick()
  emits("change", toRaw(value))
}

defineExpose({ name: "zm-radio-group" })
</script>
<script lang="ts">
export default {
  name: "zm-radio-group",
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
