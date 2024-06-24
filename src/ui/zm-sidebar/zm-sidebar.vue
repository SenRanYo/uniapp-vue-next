<template>
  <view class="zm-sidebar" :class="[customClass]" :style="[style]">
    <scroll-view scroll-y>
      <view class="zm-sidebar__line" :style="[lineStyle]"></view>
      <slot></slot>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { useStyle, useColor, useUnit, useChildren, useElRect, useUnitToPx } from "../hooks"
import { sidebarEmits, sidebarProps, sidebarKey, SidebarValue } from "./index"

defineOptions({ name: "zm-sidebar" })

const instance = getCurrentInstance()
const emits = defineEmits(sidebarEmits)
const props = defineProps(sidebarProps)
const rect = ref<UniApp.NodeInfo>(null)
const lineRect = ref<UniApp.NodeInfo>(null)
const { childrens, linkChildren } = useChildren(sidebarKey)
linkChildren({ props, updateValue })

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const lineStyle = computed(() => {
  const style: any = {}
  const childrenRect = getActiveChildrenRect()
  style.width = useUnit(props.lineWidth)
  style.height = useUnit(props.lineHeight)
  style.backgroundColor = useColor(props.lineColor)

  if (childrenRect && lineRect.value?.height && rect.value?.top) {
    const lineY = childrenRect.top + childrenRect.height / 2
    style.top = lineY - useUnitToPx(lineRect.value.height) - rect.value.top + "px"
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

async function updateValue(value: SidebarValue) {
  emits("update:modelValue", toRaw(value))
  await nextTick()
  emits("change", toRaw(value))
}

function getActiveChildrenRect() {
  let rect = null
  const children = childrens.find((item) => item.props.name === props.modelValue)
  if (children) rect = children.exposed.rect
  return rect
}

async function resize() {
  rect.value = await useElRect(".zm-sidebar", instance)
  lineRect.value = await useElRect(".zm-sidebar__line", instance)
}

onMounted(() => resize())
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
  position: relative;
  flex-direction: column;
  background-color: #f7f8fa;
  justify-content: space-between;

  &__line {
    left: 2rpx;
    width: 8rpx;
    height: 32rpx;
    position: absolute;
    transition: all 0.3s;
    border-radius: 4rpx;
    background-color: var(--primary-color);
  }
}
</style>
