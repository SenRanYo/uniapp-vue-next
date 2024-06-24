<template>
  <view class="zm-sidebar" :class="[customClass]" :style="[style]">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { useStyle, useColor, useUnit, useChildren } from "../hooks"
import { sidebarEmits, sidebarProps, sidebarKey, SidebarValue } from "./index"

defineOptions({ name: "zm-sidebar" })

const emits = defineEmits(sidebarEmits)
const props = defineProps(sidebarProps)
const { linkChildren } = useChildren(sidebarKey)
linkChildren({ props, updateValue })

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

async function updateValue(value: SidebarValue) {
  emits("update:modelValue", toRaw(value))
  await nextTick()
  emits("change", toRaw(value))
}

defineExpose({ name: "zm-sidebar" })
</script>
<script lang="ts">
export default {
  name: "zm-sidebar",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-sidebar {
  width: 300rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f7f8fa;
  justify-content: space-between;
}
</style>
