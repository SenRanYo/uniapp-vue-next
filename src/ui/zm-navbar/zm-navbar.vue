<template>
  <view class="zm-navbar">
    <view class="zm-navbar__inner" :class="{ 'is-fixed': fixed, 'is-border': borderBottom }" :style="[innerStyle]">
      <view class="zm-navbar__content" :style="[contentStyle]">
        <view v-if="$slots.left" class="zm-navbar__left">
          <slot name="left"></slot>
        </view>
        <view v-else-if="isBack" class="zm-navbar__back" @tap="handleBack">
          <zm-icon :name="backIcon" :color="backIconColor" :size="backIconSize"></zm-icon>
          <view v-if="backText" class="zm-navbar__back__text" :style="[backTextStyle]">{{ backText }}</view>
        </view>
        <view v-if="$slots.default" class="zm-navbar__default">
          <slot></slot>
        </view>
        <view v-else-if="title || $slots.title" class="zm-navbar__title" :style="[titleStyle]">
          <slot name="title">{{ title }}</slot>
        </view>
        <view v-if="$slots.right" class="zm-navbar__right">
          <slot name="right"></slot>
        </view>
      </view>
    </view>
    <view class="zm-navbar__placeholder" :style="[placeholderStyle]"></view>
  </view>
</template>
<script setup lang="ts">
import { useRgb } from "../utils/style"
import { navbarEmits, navbarProps } from "./index"
import { useStyle, useUnit, useUnitToPx } from "../hooks"

defineOptions({ name: "zm-navbar" })

const systemInfo = uni.getSystemInfoSync()
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
// #endif
const rect = ref<UniApp.NodeInfo>({})
const bRgb = ref({})
const route = ref("")
const routes = ref([])
const scrollTop = ref(0)
const statusBarHeight = systemInfo.statusBarHeight

defineExpose({ name: "zm-navbar" })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-navbar {
  width: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  &__inner {
    flex: 1;
    display: flex;
    position: relative;
    flex-direction: column;

    &.is-fixed {
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      position: fixed;
    }

    &.is-border::before {
      left: 0;
      right: 0;
      bottom: 0;
      content: "";
      position: absolute;
      border-bottom: 1rpx solid #e4e7ed;
    }
  }

  &__left {
    height: 100%;
    display: flex;
    flex-shrink: 0;
    align-items: center;
  }

  &__content {
    height: 100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
  }

  &__default {
    flex: 1;
  }

  &__back {
    height: 100%;
    display: flex;
    flex-shrink: 0;
    align-items: center;

    &__text {
      padding-left: 4rpx;
    }
  }

  &__title {
    flex: 1;
    flex-shrink: 0;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__right {
    height: 100%;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: flex-end;
  }

  &__placeholder {
    width: 100%;
    flex-shrink: 0;
  }
}
</style>
