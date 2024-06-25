<template>
  <view class="zm-index-bar" :class="[customClass]" :style="[style]">
    <view class="zm-index-bar__list">
      <view class="zm-index-bar__item" :class="[itemClass(item)]" v-for="(item, index) in indexList" :key="index" @click.stop="onClick(item)" @touchmove.stop.prevent="onTouchMove">
        {{ item }}
      </view>
    </view>
    <scroll-view class="zm-index-bar__scroll" scroll-y :scroll-top="scrollTop" @scroll="onScroll">
      <slot></slot>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { indexBarKey } from "../zm-index-bar"
import { indexBarEmits, indexBarProps } from "./index"
import { useStyle, useElRect, useElRects, useChildren } from "../hooks"
import { ScrollViewOnScrollEvent, TouchEvent } from "@uni-helper/uni-app-types/index"

defineOptions({ name: "zm-index-bar" })

const emits = defineEmits(indexBarEmits)
const props = defineProps(indexBarProps)
const instance = getCurrentInstance()
const { childrens, linkChildren } = useChildren(indexBarKey)

const rect = ref<UniApp.NodeInfo>(null)
const itemRects = ref<UniApp.NodeInfo[]>([])
const isClick = ref(false)
const scrollTop = ref(-1)
const stickyIndexValue = ref(null)
const touching = ref(false)

const style = computed(() => {
  const style: any = {}
  style.zIndex = props.zIndex
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const itemClass = computed(() => {
  return (item: string | number) => {
    return stickyIndexValue.value === item ? "zm-index-bar__item--active" : ""
  }
})

const stickyIndex = computed(() => {
  return childrens.findIndex((children) => children.props.index === stickyIndexValue.value)
})

linkChildren({ props, rect, scrollTop, stickyIndex, stickyIndexValue })

async function resize() {
  rect.value = await useElRect(".zm-index-bar", instance)
  itemRects.value = await useElRects(".zm-index-bar__item", instance)
  childrens.forEach((child) => child.exposed.resize())
}

function onClick(index: number | string) {
  const children = childrens.find((children) => children.props.index === index)
  if (children) {
    isClick.value = true
    scrollTop.value = children.exposed.rect.top - rect.value.top
    stickyIndexValue.value = children.props.index
    emits("select", index)
    setTimeout(() => {
      isClick.value = false
    }, 30)
  }
}

function onTouchMove(event: TouchEvent) {
  const y = event.changedTouches[0].pageY
  itemRects.value.forEach((item, index) => {
    const top = item.top - rect.value.top
    const bottom = item.bottom - rect.value.top
    if (y >= top && y <= bottom) {
      onClick(props.indexList[index])
    }
  })
}

function onScroll(event: ScrollViewOnScrollEvent) {
  if (isClick.value) return
  scrollTop.value = event.detail.scrollTop

  const children = childrens.find((children, index) => {
    if (!children.exposed.rect) return
    const currentTop = children.exposed.rect.top - rect.value.top
    const nextTop = (childrens[index + 1]?.exposed.rect.top || childrens[childrens.length - 1]?.exposed.rect.top) - rect.value.top
    return scrollTop.value >= currentTop && scrollTop.value < nextTop
  })

  if (children) stickyIndexValue.value = children.props.index
  if (scrollTop.value === 0) stickyIndexValue.value = ""
}

onMounted(() => resize())
defineExpose({ name: "zm-index-bar", resize })
</script>
<script lang="ts">
export default {
  name: "zm-index-bar",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-index-bar {
  flex: 1;
  display: flex;
  position: relative;
  flex-direction: column;

  &__list {
    top: 50%;
    right: 12rpx;
    z-index: 3;
    display: flex;
    position: absolute;
    flex-direction: column;
    transform: translateY(-50%);
  }

  &__item {
    display: flex;
    padding: 4rpx 8rpx;
    align-items: center;
    justify-content: center;

    &--active {
      color: var(--primary-color);
    }
  }

  &__scroll {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
}
</style>
