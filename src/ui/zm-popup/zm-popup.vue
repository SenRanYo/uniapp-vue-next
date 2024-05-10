<template>
  <view class="zm-popup" :class="[customClass]" :style="[style]">
    <zm-overlay v-if="overlay" :show="visible" :duration="duration" :custom-style="overlayStyle" @click="onClickOverlay"></zm-overlay>
    <zm-transition
      :show="visible"
      :duration="duration"
      :mode="_mode"
      :timing-function="timingFunction"
      :custom-style="bodyTransitionStyle"
      @click="onClickBodyTransition"
      @open="onOpen"
      @opened="onOpened"
      @close="onClose"
      @closed="onClosed"
      @touchmove.prevent.stop="noop"
    >
      <view class="zm-popup__body" :style="[bodyStyle]" @touchmove.prevent.stop="noop">
        <view v-if="closeable" class="zm-popup__close" :style="[closeStyle]" @click.stop="onClickClose">
          <slot name="close"><zm-icon :name="closeIcon" size="36rpx" color="#333333" bold hover-class="active-opacity"></zm-icon></slot>
        </view>
        <zm-safe-area-top :show="safeAreaInsetTop"></zm-safe-area-top>
        <slot name="header"></slot>
        <scroll-view enable-flex scroll-y :style="[scrollViewStyle]" @click.stop="onClickBody">
          <slot></slot>
        </scroll-view>
        <slot name="footer"></slot>
        <zm-safe-area-bottom :show="safeAreaInsetBottom"></zm-safe-area-bottom>
        <slot name="outside"></slot>
      </view>
    </zm-transition>
  </view>
</template>

<script>
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
import { useStyle, useColor, useUnit } from "@/utils/style"
export default {
  name: "zm-popup",
  mixins: [hook, weixin],
  props: {
    // 是否显示
    show: {
      type: Boolean
    },
    // 模式
    mode: {
      type: String,
      default: "bottom",
      validator: (v) => ["top", "bottom", "left", "right", "center"].includes(v)
    },
    // 宽度
    width: {
      type: [Number, String],
      default: ""
    },
    // 最大宽度
    maxWidth: {
      type: [Number, String],
      default: "100vw"
    },
    // 高度
    height: {
      type: [Number, String],
      default: ""
    },
    // 最大高度
    maxHeight: {
      type: [Number, String],
      default: "70vh"
    },
    // 是否显示覆盖层
    overlay: {
      type: Boolean,
      default: true
    },
    // 持续时间
    duration: {
      type: [Number, String],
      default: 300
    },
    // z-index值
    zIndex: {
      type: [Number, String],
      default: ""
    },
    // 是否显示关闭图标
    closeable: {
      type: Boolean,
      default: false
    },
    // 关闭图标
    closeIcon: {
      type: String,
      default: "cross"
    },
    // 关闭图标位置
    closeIconPosition: {
      type: String,
      default: "",
      validator: (v) => ["", "top-left", "top-right", "bottom-left", "bottom-right"].includes(v)
    },
    // 背景
    background: {
      type: [String, null],
      default: "#ffffff"
    },
    // 圆角值
    borderRadius: {
      type: [Number, String],
      default: "16rpx"
    },
    // 是否在点击覆盖层时关闭
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    // 安全区域插入顶部
    safeAreaInsetTop: {
      type: Boolean
    },
    // 安全区域插入底部
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    // 覆盖层样式
    overlayStyle: {
      type: [Object, String],
      default: ""
    },
    // 自定义类名
    customClass: {
      type: String,
      default: ""
    },
    // 自定义样式
    customStyle: {
      type: [Object, String],
      default: ""
    }
  },
  data() {
    return {
      action: "show",
      visible: false,
      timingFunction: "ease-out"
    }
  },
  computed: {
    // 弹出方向
    _mode() {
      const modes = { top: "slide-bottom", left: "slide-left", right: "slide-right", bottom: "slide-top", center: "fade-zoom" }
      return modes[this.mode]
    },
    // 容器样式
    style() {
      return useStyle({
        zIndex: this.zIndex
      })
    },
    // body过渡样式
    bodyTransitionStyle() {
      const style = {}
      const modes = {
        top: { left: 0, right: 0, top: 0 },
        left: { top: 0, left: 0, bottom: 0 },
        right: { top: 0, right: 0, bottom: 0 },
        bottom: { bottom: 0, left: 0, right: 0 },
        center: { top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center" }
      }
      style.display = "flex"
      style.position = "fixed"
      return useStyle({ ...style, ...modes[this.mode] })
    },
    // 关闭按钮样式
    closeStyle() {
      const modes = {
        top: { bottom: "24rpx", right: "24rpx" },
        left: { top: "24rpx", right: "24rpx" },
        right: { top: "24rpx", left: "24rpx" },
        bottom: { top: "24rpx", right: "24rpx" },
        center: { top: "24rpx", right: "24rpx" }
      }
      const positions = {
        "top-left": { top: "24rpx", left: "24rpx" },
        "top-right": { top: "24rpx", right: "24rpx" },
        "bottom-left": { bottom: "24rpx", left: "24rpx" },
        "bottom-right": { bottom: "24rpx", right: "24rpx" }
      }
      return useStyle(this.closeIconPosition ? positions[this.closeIconPosition] : modes[this.mode || "top"])
    },
    // body样式
    bodyStyle() {
      const style = {}
      const radius = useUnit(this.borderRadius)
      const sizes = { top: { width: "100%" }, left: { height: "100%" }, right: { height: "100%" }, bottom: { width: "100%" }, center: {} }
      if (radius) {
        const rects = {
          top: `0 0 ${radius} ${radius}`,
          left: `0 ${radius} ${radius} 0`,
          right: `${radius} 0 0 ${radius}`,
          bottom: `${radius} ${radius} 0 0`,
          center: radius
        }
        style.borderRadius = rects[this.mode]
      }
      style.background = useColor(this.background)
      return useStyle({ ...style, ...sizes[this.mode], ...useStyle(this.customStyle) })
    },
    // scrollView样式
    scrollViewStyle() {
      return useStyle({
        width: useUnit(this.width),
        height: useUnit(this.height),
        maxWidth: useUnit(this.maxWidth),
        maxHeight: useUnit(this.maxHeight)
      })
    }
  },
  watch: {
    show: {
      handler(v) {
        if (v) this.open()
        else this.close("show")
      },
      immediate: true
    },
    visible: {
      handler(v) {
        this.$emit("update:show", v)
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    open() {
      if (this.visible) return
      this.timingFunction = "ease-out"
      this.visible = true
    },
    close(action = "show") {
      if (this.visible) {
        const _close = () => {
          this.timingFunction = "ease-in"
          this.action = action
          this.visible = false
        }
        _close()
      }
    },
    onOpen() {
      this.$emit("open")
    },
    onOpened() {
      this.$emit("opened")
    },
    onClose() {
      this.$emit("close", this.action)
    },
    onClosed() {
      this.$emit("closed", this.action)
    },
    onClickClose(event) {
      this.close("close")
      this.$emit("click-close", event)
    },
    onClickBodyTransition(event) {
      if (this.mode === "center") {
        this.onClickOverlay(event)
      }
    },
    onClickBody(event) {
      this.$emit("click", event)
    },
    onClickOverlay(event) {
      if (this.closeOnClickOverlay) {
        this.close("overlay")
        this.$emit("click-overlay", event)
      }
    },
    noop() {
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-popup {
  z-index: 14000;
  position: relative;
  &__close {
    z-index: 1;
    position: absolute;
  }
  &__body {
    display: flex;
    position: relative;
    flex-direction: column;
    &__content {
      overflow: hidden;
    }
  }
}
</style>
