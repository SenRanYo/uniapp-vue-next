<template>
  <view class="zm-dropdown-menu" :class="[classs, customClass]" :style="[style]">
    <view class="zm-dropdown-menu__item" v-for="(item, index) in childrens" :key="index" @click="onClick(item, index)">
      <text class="zm-dropdown-menu__item__title" :style="[titleStyle(item)]">{{ item.exposed.title }}</text>
      <view class="zm-dropdown-menu__item__icon">
        <zm-icon v-if="showIcon" :name="icon" :size="iconSize" :color="iconColor"></zm-icon>
      </view>
    </view>
    <slot></slot>
  </view>
</template>
<script setup lang="ts">
import { dropdownMenuEmits, dropdownMenuProps, dropdownMenuKey } from "./index"
import { useStyle, useColor, useUnit, useUnitToPx, useElRect, useChildren } from "../hooks"

defineOptions({ name: "zm-dropdown-menu" })

const props = defineProps(dropdownMenuProps)
const emits = defineEmits(dropdownMenuEmits)
const { childrens, linkChildren } = useChildren(dropdownMenuKey)

const rect = ref<UniApp.NodeInfo>({})
const instance = getCurrentInstance()

linkChildren({ props, rect, close })

const style = computed(() => {
  const style: any = {}
  style.zIndex = props.zIndex
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  return list
})

const titleStyle = computed(() => {
  return (item: any) => {
    const style: any = {}
    style.color = useColor(props.titleColor)
    style.fontSize = useUnit(props.titleSize)
    style.fontWeight = props.titleWeight
    return useStyle(style)
  }
})

async function resize() {
  rect.value = await useElRect(".zm-dropdown-menu", instance)
}

function onClick(item: any, index: number) {
  if (item.props.disabled) return
  toggleItem(index)
}

function close() {
  childrens.forEach((item: any) => item.exposed.toggle(false))
}

async function toggleItem(active: number) {
  await resize()
  childrens.forEach((item: any, index) => {
    if (index === active) {
      item.exposed.toggle()
    } else if (item.exposed.active) {
      item.exposed.toggle(false)
    }
  })
}

onMounted(() => resize())
defineExpose({ name: "zm-dropdown-menu", close })
</script>
<script lang="ts">
export default {
  name: "zm-dropdown-menu",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-dropdown-menu {
  height: 80rpx;
  display: flex;
  align-items: center;
  background-color: #fff;

  &__item {
    /* #ifndef MP-WEIXIN */
    cursor: pointer;
    /* #endif */
    flex: 1;
    height: 100%;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    &__icon {
      margin-left: 8rpx;
    }
  }
}
</style>
