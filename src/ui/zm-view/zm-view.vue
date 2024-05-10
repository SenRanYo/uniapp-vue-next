<template>
  <view class="zm-view" :class="[customClass]" :style="[style]" @touchend="onTouchend" @touchmove="onTouchmove" @touchstart="onTouchstart">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { useMitt, useStyle, useCurrentRouter } from "../hooks"
const emits = defineEmits(["scroll", "scrolltoupper", "scrolltolower", "touchstart", "touchmove", "touchend"])
const props = defineProps({
  scroll: { type: Boolean, default: true },
  background: { type: String, default: "" },
  customClass: { type: String, default: "" },
  customStyle: { type: [String, Object], default: "" },
})
const mitt = useMitt()
const router = useCurrentRouter()

// 自定义样式
const style = computed(() => {
  const style: any = {}
  style.background = props.background
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 监听全局事件
onGlobalEvents()
function onGlobalEvents() {
  // 监听页面滚动
  uni.$on("onPageScroll", (e) => {
    // 滚动事件
    emits("scroll", e.scrollTop, { route: router.route })
    this.mitt.emit("scroll", e.scrollTop, { route: router.route })
    // 滚动触顶事件
    if (e.scrollTop === 0) {
      emits("scrolltoupper", { route: router.route })
      this.mitt.emit("scrolltoupper", { route: router.route })
    }
  })
  // 监听页面滚动触底
  uni.$on("onReachBottom", () => {
    emits("scrolltolower")
    this.mitt.emit("scrolltolower")
  })
}

// 屏幕按下
function onTouchstart(e: Event) {
  emits("touchstart", e)
  mitt.emit("touchstart", e)
}
// 屏幕松开
function onTouchend(e: Event) {
  emits("touchend", e)
  mitt.emit("touchend", e)
}
// 屏幕滑动
function onTouchmove(e: Event) {
  emits("touchmove", e)
  mitt.emit("touchmove", e)
}
</script>

<style lang="scss">
.zm-view {
  width: 100%;
  display: flex;
  position: relative;
  min-height: 100vh;
  flex-direction: column;
}
</style>
