<template>
  <view class="zm-cell" :class="[classs, customClass]" :style="[style]" :hover-class="hoverClass" :hover-stay-time="50" @click="onClick">
    <slot name="icon">
      <view v-if="icon" class="zm-cell__icon">
        <zm-icon :name="icon" :size="iconStyle.size" :color="iconStyle.color" :weight="iconStyle.weight" :custom-prefix="iconPrefix"></zm-icon>
      </view>
    </slot>
    <view class="zm-cell__left">
      <slot name="title">
        <text v-if="title" class="zm-cell__title" :style="[titleStyle]">{{ title }}</text>
      </slot>
      <slot name="desc">
        <text v-if="desc" class="zm-cell__desc" :style="[descStyle]">{{ desc }}</text>
      </slot>
    </view>
    <view class="zm-cell__right">
      <slot name="content">
        <text v-if="content" class="zm-cell__content" :style="[contentStyle]">{{ content }}</text>
      </slot>
      <slot name="right-icon">
        <zm-icon
          v-if="isLink && rightIcon"
          :name="rightIcon"
          :size="rightIconStyle.size"
          :color="rightIconStyle.color"
          :weight="rightIconStyle.weight"
          :custom-prefix="iconPrefix"
        ></zm-icon>
      </slot>
    </view>
  </view>
</template>
<script setup lang="ts">
import { isDef } from "../utils/check"
import { cellGroupKey } from "../zm-cell-group"
import { cellEmits, cellProps } from "./index"
import { useStyle, useUnit, useColor, useParent } from "../hooks"

defineOptions({ name: "zm-cell" })
const emits = defineEmits(cellEmits)
const props = defineProps(cellProps)

const { index, parent: cellGroup } = useParent(cellGroupKey)

const style = computed(() => {
  const style: any = {}
  style.height = useUnit(props.height)
  style.padding = useUnit(props.padding)
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list = []
  const state = ["center", "clickable"]
  state.forEach((state) => props[state] && list.push(`zm-cell--${state}`))
  if (index.value !== cellGroup.childrens.length - 1) list.push("zm-cell--border")
  return list
})

const hoverClass = computed(() => {
  return props.clickable || props.isLink ? "zm-cell--active" : "none"
})

const iconStyle = computed(() => {
  return {
    color: useColor(prop("iconColor")),
    size: useUnit(prop("iconSize")),
    weight: prop("iconWeight"),
  }
})

const rightIconStyle = computed(() => {
  return {
    color: useColor(prop("rightIconColor")),
    size: useUnit(prop("rightIconSize")),
    weight: prop("rightIconWeight"),
  }
})

const titleStyle = computed(() => {
  let style: any = {}
  style.color = useColor(prop("titleColor"))
  style.fontSize = useUnit(prop("titleSize"))
  style.fontWeight = prop("titleWeight")
  return useStyle(style)
})

const descStyle = computed(() => {
  let style: any = {}
  style.color = useColor(prop("descColor"))
  style.fontSize = useUnit(prop("descSize"))
  style.fontWeight = prop("descWeight")
  return useStyle(style)
})

const contentStyle = computed(() => {
  let style: any = {}
  style.color = useColor(prop("contentColor"))
  style.fontSize = useUnit(prop("contentSize"))
  style.fontWeight = prop("contentWeight")
  return useStyle(style)
})

function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (isDef(cellGroup.props[name])) return cellGroup.props[name]
  return ""
}

function onClick(event: TouchEvent) {
  if (props.url) {
    if (uni[props.linkType]) {
      uni[props.linkType]({ url: props.url })
    }
  } else {
    emits("click", event)
  }
}

defineExpose({ name: "zm-cell", index })
</script>
<script lang="ts">
export default {
  name: "zm-cell",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-cell {
  --zm-cell-border-color: #eee;
  --zm-cell-border-width: 1rpx;

  display: flex;
  padding: 20rpx 24rpx;
  position: relative;
  background: #fff;
  vertical-align: middle;

  &::before {
    top: 50%;
    left: 50%;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: inherit;
    position: absolute;
    background: #000;
    border-color: #000;
    border-radius: inherit;
    transform: translate(-50%, -50%);
  }

  &__icon {
    display: flex;
    font-size: 28rpx;
    margin-right: 8rpx;
    align-items: center;
  }

  &__left {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  &__title {
    font-size: 28rpx;
  }

  &__desc {
    color: #909399;
    font-size: 24rpx;
    margin-top: 8rpx;
  }

  &--center {
    align-items: center;
  }

  &__right {
    display: flex;
    flex-shrink: 0;
    justify-content: flex-end;
  }

  &__content {
    color: #909399;
    font-size: 28rpx;
    margin-right: 16rpx;
    white-space: nowrap;
  }

  &--border::after {
    left: 24rpx;
    right: 24rpx;
    bottom: 0;
    content: "";
    position: absolute;
    pointer-events: none;
    border-bottom: var(--zm-cell-border-width) solid var(--zm-cell-border-color);
  }

  &--active::before {
    content: "";
    opacity: 0.05;
  }
}
</style>
