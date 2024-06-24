<template>
  <view class="zm-sidebar" :class="[customClass]" :style="[style]">
    <scroll-view class="zm-sidebar__scroll" scroll-y scroll-with-animation :scroll-top="scrollTop">
      <view class="zm-sidebar__line" :style="[lineStyle]"></view>
      <view>
        <slot></slot>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { useStyle, useColor, useUnit, useChildren, useElRect } from "../hooks"
import { sidebarEmits, sidebarProps, sidebarKey, SidebarValue } from "./index"

defineOptions({ name: "zm-sidebar" })

const instance = getCurrentInstance()
const emits = defineEmits(sidebarEmits)
const props = defineProps(sidebarProps)
const rect = ref<UniApp.NodeInfo>(null)
const lineRect = ref<UniApp.NodeInfo>(null)
const scrollTop = ref(0)
const { childrens, linkChildren } = useChildren(sidebarKey)
linkChildren({ props, scrollTo, updateValue })

const style = computed(() => {
  const style: any = {}
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const lineStyle = computed(() => {
  const style: any = {}
  const childrenRect = getActiveChildrenRect()
  style.width = useUnit(props.lineWidth)
  style.height = useUnit(props.lineHeight)
  style.background = useColor(props.lineColor)

  if (childrenRect && lineRect.value?.height && rect.value?.top) {
    const lineY = childrenRect.top - rect.value.top + childrenRect.height / 2
    style.top = lineY - lineRect.value.height / 2 + "px"
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

watch(() => props.modelValue, scrollTo, { immediate: true })

function scrollTo(value: SidebarValue) {
  if (props.autoScroll) {
    const current = childrens.find((item) => item.props.name === value)
    if (current) {
      const height = rect.value.height / 2
      const scrollY = current.exposed.rect.bottom
      scrollTop.value = scrollY > height ? scrollY - height : 0
    }
  }
}

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
defineExpose({ name: "zm-sidebar", scrollTo })
</script>
<script lang="ts">
export default {
  name: "zm-sidebar",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-sidebar {
  flex: 1;
  width: 300rpx;
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: #f7f8fa;
  justify-content: space-between;

  &__scroll {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
  }

  &__line {
    left: 2rpx;
    width: 8rpx;
    height: 32rpx;
    position: absolute;
    transition: all 0.3s;
    border-radius: 4rpx;
    background-color: var(--primary-color);
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
}
</style>
