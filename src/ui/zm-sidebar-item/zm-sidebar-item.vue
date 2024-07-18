<template>
  <view class="zm-sidebar-item" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <slot>
      <view class="zm-sidebar-item__title" :style="[titleStyle]">{{ title }}</view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { isDef } from "../utils/check"
import { sidebarKey } from "../zm-sidebar"
import { sidebarItemEmits, sidebarItemProps } from "./index"
import { useStyle, useColor, useUnit, useParent, useElRect } from "../hooks"

defineOptions({ name: "zm-sidebar-item" })

const emits = defineEmits(sidebarItemEmits)
const props = defineProps(sidebarItemProps)
const instance = getCurrentInstance()
const { index, parent } = useParent(sidebarKey)

const rect = ref<UniApp.NodeInfo>({})

const classs = computed(() => {
  const list: any = []
  if (parent.props.modelValue === props.name) list.push("zm-sidebar-item--active")
  return list
})

const style = computed(() => {
  const style: any = {}
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  if (props.name === parent.props.modelValue) {
    style.background = useColor(prop("activeBackground"))
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const titleStyle = computed(() => {
  const style: any = {}
  style.color = useColor(prop("color"))
  style.fontSize = useUnit(prop("fontSize"))
  style.fontWeight = prop("fontWeight")
  if (props.name === parent.props.modelValue) {
    style.color = useColor(prop("activeColor") || prop("color"))
    style.fontSize = useColor(prop("activeFontSize") || prop("fontSize"))
    style.fontWeight = useColor(prop("activeFontWeight") || prop("fontWeight"))
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (isDef(parent.props[name])) return parent.props[name]
  return ""
}

async function resize() {
  rect.value = await useElRect(".zm-sidebar-item", instance)
}

function onClick() {
  if (props.name === parent.props.modelValue) return
  parent.scrollTo(props.name)
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

  &__title {
    flex: 1;
    padding: 0 24rpx;
    overflow: hidden;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
