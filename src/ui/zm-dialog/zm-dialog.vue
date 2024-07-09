<template>
  <view class="zm-dialog" :style="[style]" @touchmove.prevent.stop="noop">
    <zm-overlay v-if="useOptions.overlay" :show="visible" :duration="useOptions.duration" :custom-style="useOptions.overlayStyle" @click="clickOverlay"></zm-overlay>
    <zm-transition
      name="fade-zoom"
      :show="visible"
      :duration="useOptions.duration"
      :custom-style="transitionStyle"
      @before-enter="onOpen"
      @after-enter="onOpened"
      @before-leave="onClose"
      @after-leave="onClosed"
      @click="clickOverlay"
    >
      <view class="zm-dialog__fixed" :style="[fixedStyle]">
        <view class="zm-dialog__body" :style="[bodyStyle]" @click.stop="noop">
          <slot name="title">
            <view v-if="useOptions.title" class="zm-dialog__title">{{ useOptions.title }}</view>
          </slot>

          <scroll-view class="zm-dialog__scroll" :style="[scrollStyle]" scroll-y enable-flex>
            <view class="zm-dialog__content" :style="[contentStyle]">
              <slot>
                <view class="zm-dialog__content__text" :class="[textClass]">{{ useOptions.content }}</view>
              </slot>
            </view>
          </scroll-view>

          <view class="zm-dialog__footer" :class="[footerClass]" :style="[footerStyle]">
            <slot name="footer">
              <slot name="cancel">
                <zm-button
                  v-if="useOptions.showCancelButton"
                  block
                  :loading="cancelLoading"
                  loading-text=""
                  loading-icon-size="32rpx"
                  type="default"
                  height="100rpx"
                  text-size="32rpx"
                  text-weight="500"
                  border-radius="0rpx"
                  border-width="0rpx"
                  :text-color="useOptions.cancelButtonColor"
                  @click="cancel"
                >
                  {{ useOptions.cancelButtonText }}
                </zm-button>
              </slot>
              <view v-if="useOptions.showCancelButton && useOptions.showConfirmButton" class="zm-dialog__footer__line"></view>
              <slot name="confirm">
                <zm-button
                  v-if="useOptions.showConfirmButton"
                  block
                  :loading="confirmLoading"
                  loading-text=""
                  loading-icon-size="32rpx"
                  type="default"
                  height="100rpx"
                  text-size="32rpx"
                  text-weight="500"
                  border-radius="0rpx"
                  border-width="0rpx"
                  :text-color="useOptions.confirmButtonColor"
                  @click="confirm"
                >
                  {{ useOptions.confirmButtonText }}
                </zm-button>
              </slot>
            </slot>
          </view>
        </view>
        <slot name="outside"></slot>
      </view>
    </zm-transition>
  </view>
</template>

<script setup lang="ts">
import { merge } from "../utils/utils"
import { isFunction } from "../utils/check"
import { useStyle, useUnit, useColor, useUnitToPx, useElRect } from "../hooks"
import { dialogEmits, dialogProps, DialogOptions, DoneAction, CloseAction, OpenAction } from "./index"

defineOptions({ name: "zm-dialog" })
const emits = defineEmits(dialogEmits)
const props = defineProps(dialogProps)

const visible = ref(false)
const openAction = ref<OpenAction>("outside")
const cancelLoading = ref(false)
const confirmLoading = ref(false)
const useOptions = ref<DialogOptions>({})
const propOptions = ref<DialogOptions>({})
const baseOptions = ref<DialogOptions>({
  show: false,
  title: "",
  width: "",
  height: "",
  content: "",
  contentAlign: "center",
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: "确认",
  confirmButtonColor: "var(--primary-color)",
  cancelButtonText: "取消",
  cancelButtonColor: "",
  buttonReverse: false,
  overlay: true,
  overlayStyle: {},
  closeOnClickOverlay: false,
  padding: "",
  offsetTop: "",
  asyncClose: false,
  zIndex: "",
  duration: 300,
  background: "",
  borderRadius: "",
  customStyle: {},
  onConfirm: null,
  onCancel: null,
  onOverlay: null,
})

const style = computed(() => {
  const style: any = {}
  style.zIndex = useOptions.value.zIndex
  return useStyle(style)
})

const transitionStyle = computed(() => {
  const style: any = {}
  style.top = 0
  style.left = 0
  style.right = 0
  style.bottom = 0
  style.position = "fixed"
  return useStyle(style)
})

const fixedStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(useOptions.value.width)
  style.marginTop = useUnit(useOptions.value.offsetTop)
  return useStyle({ ...style, ...useStyle(useOptions.value.customStyle) })
})

const bodyStyle = computed(() => {
  const style: any = {}
  style.background = useColor(useOptions.value.background)
  style.borderRadius = useUnit(useOptions.value.borderRadius)
  return useStyle({ ...style, ...useStyle(useOptions.value.customStyle) })
})

const scrollStyle = computed(() => {
  const style: any = {}
  style.height = useUnit(useOptions.value.height)
  return useStyle(style)
})

const contentStyle = computed(() => {
  const style: any = {}
  style.padding = useUnit(useOptions.value.padding)
  return useStyle(style)
})

const footerStyle = computed(() => {
  const style: any = {}
  style.borderBottomLeftRadius = useUnit(useOptions.value.borderRadius)
  style.borderBottomRightRadius = useUnit(useOptions.value.borderRadius)
  return useStyle(style)
})

const textClass = computed(() => {
  const list = []
  list.push(`zm-dialog__content__text--${useOptions.value.contentAlign}`)
  return list
})

const footerClass = computed(() => {
  const list = []
  if (useOptions.value.buttonReverse) list.push("zm-dialog__footer--reverse")
  return list
})

watch(
  () => props,
  (options) => {
    propOptions.value = merge(baseOptions.value, options)
  },
  { deep: true, immediate: true },
)

watch(
  () => props.show,
  (val) => {
    val ? open({}, "inner") : close("close")
  },
  { immediate: true },
)

function clickOverlay() {
  if (useOptions.value.closeOnClickOverlay) {
    if (useOptions.value.asyncClose) {
      cancelLoading.value = true
      if (openAction.value === "inner") {
        const _close = () => close("overlay")
        emits("click-overlay", { close: _close })
      } else {
        close("overlay")
        emits("click-overlay")
      }
    } else {
      close("overlay")
      emits("click-overlay")
    }
  }
}

function open(options: DialogOptions = {}, action: OpenAction = "outside") {
  if (visible.value) return
  openAction.value = action
  useOptions.value = merge(merge(baseOptions.value, propOptions.value), options)
  visible.value = true
  emits("update:show", true)
}

function close(action: CloseAction) {
  if (visible.value) {
    const _close = () => {
      visible.value = false
      openAction.value = "outside"
      cancelLoading.value = false
      confirmLoading.value = false
      emits("update:show", false)
    }
    if (action === "confirm" && isFunction(useOptions.value.onConfirm)) {
      if (useOptions.value.asyncClose) useOptions.value.onConfirm({ close: _close, done: () => done(action) })
      else {
        _close()
        useOptions.value.onConfirm()
      }
    } else if (action === "cancel" && isFunction(useOptions.value.onCancel)) {
      if (useOptions.value.asyncClose) useOptions.value.onCancel({ close: _close, done: () => done(action) })
      else {
        _close()
        useOptions.value.onCancel()
      }
    } else if (action === "overlay" && isFunction(useOptions.value.onOverlay)) {
      if (useOptions.value.asyncClose) useOptions.value.onOverlay({ close: _close, done: () => done(action) })
      else {
        _close()
        useOptions.value.onOverlay()
      }
    } else {
      _close()
    }
  }
}

function done(action: DoneAction) {
  switch (action) {
    case "confirm":
      confirmLoading.value = false
      break
    case "cancel":
      cancelLoading.value = false
      break
    default:
      confirmLoading.value = false
      cancelLoading.value = false
      break
  }
}

function cancel() {
  if (useOptions.value.asyncClose) {
    cancelLoading.value = true
    if (openAction.value === "inner") {
      const _done = () => done("cancel")
      const _close = () => close("cancel")
      emits("cancel", { close: _close, done: _done })
    } else {
      close("cancel")
      emits("cancel")
    }
  } else {
    close("cancel")
    emits("cancel")
  }
}

function confirm() {
  if (useOptions.value.asyncClose) {
    confirmLoading.value = true
    if (openAction.value === "inner") {
      const _done = () => done("confirm")
      const _close = () => () => close("confirm")
      emits("confirm", { close: _close, done: _done })
    } else {
      close("confirm")
      emits("confirm")
    }
  } else {
    close("confirm")
    emits("confirm")
  }
}

function onOpen() {
  emits("open")
}

function onOpened() {
  emits("opened")
}

function onClose() {
  emits("close")
}

function onClosed() {
  emits("closed")
}

function noop() {
  return false
}

defineExpose({ name: "zm-dialog", open, close })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-dialog {
  z-index: 14500;
  position: relative;

  &__fixed {
    top: 50%;
    left: 0;
    right: 0;
    display: flex;
    margin: 0 auto;
    position: fixed;
    max-height: 100%;
    border-radius: 12rpx;
    max-width: calc(100vw - 96rpx);
    flex-direction: column;
    transform: translateY(-50%);
  }

  &__body {
    overflow: hidden;
    border-radius: 16rpx;
    background-color: #fff;
  }

  &__title {
    display: flex;
    overflow: hidden;
    font-weight: bold;
    font-size: 32rpx;
    padding-top: 44rpx;
    padding-left: 48rpx;
    padding-right: 48rpx;
    justify-content: center;
  }

  &__scroll {
    max-height: 80vh;
  }

  &__content {
    font-size: 28rpx;
    padding: 44rpx 48rpx;
    word-wrap: break-word;
    white-space: pre-wrap;

    &__text {
      &--left {
        text-align: left;
      }

      &--center {
        text-align: center;
      }

      &--right {
        text-align: right;
      }
    }
  }

  &__footer {
    display: flex;
    overflow: hidden;
    position: relative;
    flex-direction: row;

    &--reverse {
      flex-direction: row-reverse;
    }

    &__line {
      top: 0;
      left: 50%;
      width: 2rpx;
      z-index: 10;
      height: 100%;
      display: flex;
      position: absolute;
      background-color: #eee;
      transform: translateX(-50%);
    }

    &::after {
      top: 0;
      left: 0;
      width: 100%;
      content: "";
      position: absolute;
      border-top: 2rpx solid #eee;
    }
  }
}
</style>
