<template>
  <view class="zm-sidebar-item" :class="[customClass]" :style="[style]"></view>
</template>

<script setup lang="ts">
import { sidebarKey } from "../zm-sidebar"
import { sidebarItemEmits, sidebarItemProps } from "./index"
import { useStyle, useColor, useUnit, useParent } from "../hooks"

defineOptions({ name: "zm-sidebar-item" })

const emits = defineEmits(sidebarItemEmits)
const props = defineProps(sidebarItemProps)
const { parent } = useParent(sidebarKey)

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

defineExpose({ name: "zm-sidebar-item" })
</script>
<script lang="ts">
export default {
  name: "zm-sidebar-item",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-sidebar-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
