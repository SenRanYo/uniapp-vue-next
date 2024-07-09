<template>
  <view class="zm-dropdown-menu" :class="[customClass]" :style="[style]">
    <view
      class="zm-dropdown-menu__item"
      :class="{ 'is-active': item.exposed.active, 'is-disabled': item.props.disabled }"
      v-for="(item, index) in childrens"
      :key="index"
      @click="onClick(item, index)"
    >
      <text class="zm-dropdown-menu__item__title" :style="[titleStyle(item)]">{{ item.exposed.title }}</text>
      <view class="zm-dropdown-menu__item__icon" :style="[iconStyle(item)]" v-if="prop(item, 'showIcon')">
        <zm-icon :name="prop(item, 'icon')" :size="prop(item, 'iconSize')" :weight="prop(item, 'iconWeight')" :color="iconColor(item)"></zm-icon>
      </view>
    </view>
    <slot></slot>
  </view>
</template>
<script setup lang="ts">
import { useStyle, useColor, useUnit, useElRect, useChildren } from "../hooks"
import { dropdownMenuEmits, dropdownMenuProps, dropdownMenuKey } from "./index"

defineOptions({ name: "zm-dropdown-menu" })

const props = defineProps(dropdownMenuProps)
const emits = defineEmits(dropdownMenuEmits)

const { childrens, linkChildren } = useChildren(dropdownMenuKey)

const rect = ref<UniApp.NodeInfo>({})
const instance = getCurrentInstance()

linkChildren({ props, rect, close })

/**
 * 元素样式
 */
const style = computed(() => {
  const style: any = {}
  style.zIndex = props.zIndex
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

/**
 * 标题样式
 */
const titleStyle = computed(() => {
  return (item: any) => {
    const style: any = {}
    style.color = item.exposed.active ? useColor(prop(item, "activeTitleColor")) : useColor(prop(item, "titleColor"))
    style.fontSize = useUnit(prop(item, "titleSize"))
    style.fontWeight = prop(item, "titleWeight")
    return useStyle(style)
  }
})

/**
 * 图标样式，旋转样式
 */
const iconStyle = computed(() => {
  return (item: any) => {
    const style: any = {}
    if (item.exposed.active) style.transform = "rotate(180deg)"
    return useStyle(style)
  }
})

/**
 * 根据状态获取菜单图标颜色
 */
const iconColor = computed(() => {
  return (item: any) => {
    return item.exposed.active ? useColor(prop(item, "activeIconColor")) : useColor(prop(item, "iconColor"))
  }
})

/**
 * 获取指定菜单实例prop值
 */
function prop(item: any, name: string) {
  return item.props[name] ?? props[name]
}

/**
 * 获取节点信息
 */
async function resize() {
  rect.value = await useElRect(".zm-dropdown-menu", instance)
}

/**
 * 点击菜单
 * @param item 菜单项
 * @param index 菜单索引
 */
function onClick(item: any, index: number) {
  if (item.props.disabled) return
  toggleItem(index)
}

/**
 * 关闭所有菜单
 */
function close() {
  childrens.forEach((item: any) => item.exposed.toggle(false))
}

/**
 * 切换菜单展开状态
 * @param active 菜单索引
 */
async function toggleItem(active: number) {
  await resize()
  childrens.forEach((item, index) => {
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
      transition: transform 0.3s ease-out;
    }

    &.is-active {
      color: var(--primary-color);
    }

    &.is-disabled {
      opacity: 0.6;
    }
  }
}
</style>
