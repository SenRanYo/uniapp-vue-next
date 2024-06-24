<template>
  <view class="zm-sidebar-item" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <view class="zm-sidebar-item__text">{{ title }}</view>
  </view>
</template>

<script setup lang="ts">
import { sidebarKey } from "../zm-sidebar"
import { sidebarItemEmits, sidebarItemProps } from "./index"
import { useStyle, useColor, useUnit, useParent, useElRect } from "../hooks"

defineOptions({ name: "zm-sidebar-item" })

const emits = defineEmits(sidebarItemEmits)
const props = defineProps(sidebarItemProps)
const instance = getCurrentInstance()
const { index, parent } = useParent(sidebarKey)

const rect = ref<UniApp.NodeInfo>({})

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: any = []
  if (parent.props.modelValue === props.name) list.push("zm-sidebar-item--active")
  return list
})

async function resize() {
  rect.value = await useElRect(".zm-sidebar-item", instance)
}

function onClick() {
  parent.updateValue(props.name)
}

onMounted(() => resize())
defineExpose({ name: "zm-sidebar-item", rect, index: index.value })
</script>
<script lang="ts">
export default {
  name: "zm-sidebar-item",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-sidebar-item {
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &--active {
    background-color: #fff;
  }

  &__text {
    flex: 1;
    padding: 0 24rpx;
    overflow: hidden;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
