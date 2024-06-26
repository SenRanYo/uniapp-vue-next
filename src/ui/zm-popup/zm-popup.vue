<template>
  <view class="zm-popup" :class="[customClass]" :style="[style]">
    <zm-overlay v-if="overlay" :show="visible" :duration="duration" :custom-style="overlayStyle" @click="onClickOverlay"></zm-overlay>
    <zm-transition
      :show="visible"
      :mode="mode"
      :duration="duration"
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
        <zm-safe-area-top v-if="safeAreaInsetTop" :background="background"></zm-safe-area-top>
        <slot name="header"></slot>
        <scroll-view enable-flex scroll-y :style="[scrollViewStyle]" @click.stop="onClickBody">
          <slot></slot>
        </scroll-view>
        <slot name="footer"></slot>
        <zm-safe-area-bottom v-if="safeAreaInsetBottom" :background="background"></zm-safe-area-bottom>
        <slot name="outside"></slot>
      </view>
    </zm-transition>
  </view>
</template>

<script setup lang="ts">
import { popupEmits } from "./index"
import { useStyle, useColor, useUnit } from "../hooks"

defineOptions({ name: "zm-popup" })

const emits = defineEmits(popupEmits)
const props = defineProps({
  show: { type: Boolean, default: false },
  mode: { type: String, default: "bottom", validator: (v: string) => ["top", "bottom", "left", "right", "center"].includes(v) },
  width: { type: [Number, String], default: "" },
  maxWidth: { type: [Number, String], default: "100vw" },
  height: { type: [Number, String], default: "" },
  maxHeight: { type: [Number, String], default: "70vh" },
  overlay: { type: Boolean, default: true },
  duration: { type: [Number, String], default: 300 },
  zIndex: { type: [Number, String], default: "" },
  closeable: { type: Boolean, default: false },
  closeIcon: { type: String, default: "cross" },
  closeIconPosition: { type: String, default: "", validator: (v: string) => ["", "top-left", "top-right", "bottom-left", "bottom-right"].includes(v) },
  background: { type: [String, null], default: "#ffffff" },
  borderRadius: { type: [Number, String], default: "16rpx" },
  closeOnClickOverlay: { type: Boolean, default: true },
  safeAreaInsetTop: { type: Boolean, default: false },
  safeAreaInsetBottom: { type: Boolean, default: true },
  overlayStyle: { type: [Object, String], default: "" },
  customClass: { type: String, default: "" },
  customStyle: { type: [Object, String], default: "" },
})

const action = ref("show")
const visible = ref(false)

const mode = computed(() => {
  const modes = { top: "slide-bottom", left: "slide-left", right: "slide-right", bottom: "slide-top", center: "fade-zoom" }
  return modes[props.mode]
})

const style = computed(() => {
  return useStyle({ zIndex: props.zIndex })
})

const bodyTransitionStyle = computed(() => {
  const style: any = {}
  const modes = {
    top: { left: 0, right: 0, top: 0 },
    left: { top: 0, left: 0, bottom: 0 },
    right: { top: 0, right: 0, bottom: 0 },
    bottom: { bottom: 0, left: 0, right: 0 },
    center: { top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center" },
  }
  style.display = "flex"
  style.position = "fixed"
  return useStyle({ ...style, ...modes[props.mode] })
})

const closeStyle = computed(() => {
  const modes = {
    top: { bottom: "24rpx", right: "24rpx" },
    left: { top: "24rpx", right: "24rpx" },
    right: { top: "24rpx", left: "24rpx" },
    bottom: { top: "24rpx", right: "24rpx" },
    center: { top: "24rpx", right: "24rpx" },
  }
  const positions = {
    "top-left": { top: "24rpx", left: "24rpx" },
    "top-right": { top: "24rpx", right: "24rpx" },
    "bottom-left": { bottom: "24rpx", left: "24rpx" },
    "bottom-right": { bottom: "24rpx", right: "24rpx" },
  }
  return useStyle(props.closeIconPosition ? positions[props.closeIconPosition] : modes[props.mode || "top"])
})

const bodyStyle = computed(() => {
  const style: any = {}
  const radius = useUnit(props.borderRadius)
  const sizes = { top: { width: "100%" }, left: { height: "100%" }, right: { height: "100%" }, bottom: { width: "100%" }, center: {} }
  if (radius) {
    const rects = {
      top: `0 0 ${radius} ${radius}`,
      left: `0 ${radius} ${radius} 0`,
      right: `${radius} 0 0 ${radius}`,
      bottom: `${radius} ${radius} 0 0`,
      center: radius,
    }
    style.borderRadius = rects[props.mode]
  }
  style.background = useColor(props.background)
  return useStyle({ ...style, ...sizes[props.mode], ...useStyle(props.customStyle) })
})

const scrollViewStyle = computed(() => {
  return useStyle({
    width: useUnit(props.width),
    height: useUnit(props.height),
    maxWidth: useUnit(props.maxWidth),
    maxHeight: useUnit(props.maxHeight),
  })
})

watch(
  () => props.show,
  (val) => {
    if (val) open()
    else close("show")
  },
  { immediate: true },
)

watch(
  () => visible.value,
  (val) => {
    emits("update:show", val)
  },
)

function open() {
  if (visible.value) return
  visible.value = true
}

function close(a = "show") {
  if (visible.value) {
    action.value = a
    visible.value = false
  }
}

function onOpen() {
  emits("open")
}

function onOpened() {
  emits("opened")
}

function onClose() {
  emits("close", action.value)
}

function onClosed() {
  emits("closed", action.value)
}

function onClickClose(event: MouseEvent) {
  close("close")
  emits("click-close", event)
}

function onClickBodyTransition(event: MouseEvent) {
  if (mode.value === "center") {
    onClickOverlay(event)
  }
}

function onClickBody(event: MouseEvent) {
  emits("click", event)
}

function onClickOverlay(event: MouseEvent) {
  if (props.closeOnClickOverlay) {
    close("overlay")
    emits("click-overlay", event)
  }
}

function noop() {
  return false
}

defineExpose({ name: "zm-popup", open, close })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
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
