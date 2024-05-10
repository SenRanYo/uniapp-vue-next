<template>
  <view class="zm-dialog" :style="dialogStyle" @touchmove.prevent.stop="noop">
    <zm-overlay v-if="options.overlay" :show="visible" :duration="options.duration" :custom-style="options.overlayStyle" @click="onClickOverlay"></zm-overlay>
    <zm-transition
      mode="fade-zoom"
      :show="visible"
      :duration="options.duration"
      :timing-function="timingFunction"
      :custom-style="dialogTransitionStyle"
      @open="onOpen"
      @opened="onOpened"
      @close="onClose"
      @closed="onClosed"
    >
      <view class="zm-dialog__fixed" :style="[fixedStyle]">
        <view class="zm-dialog__body" :style="[bodyStyle]">
          <slot name="title">
            <view v-if="options.title" class="zm-dialog__title">{{ options.title }}</view>
          </slot>

          <scroll-view class="zm-dialog__scroll" :style="[scrollStyle]" scroll-y enable-flex>
            <view class="zm-dialog__content" :style="[contentStyle]">
              <slot>
                <view class="zm-dialog__content__text" :class="[textClass]">{{ options.content }}</view>
              </slot>
            </view>
          </scroll-view>

          <view class="zm-dialog__footer" :class="[footerClass]" :style="[footerStyle]">
            <slot name="footer">
              <slot name="cancel">
                <zm-button
                  v-if="options.showCancelButton"
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
                  :text-color="options.cancelButtonColor"
                  @click="cancel"
                >
                  {{ options.cancelButtonText }}
                </zm-button>
              </slot>
              <view v-if="options.showCancelButton && options.showConfirmButton" class="zm-dialog__footer__line"></view>
              <slot name="confirm">
                <zm-button
                  v-if="options.showConfirmButton"
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
                  :text-color="options.confirmButtonColor"
                  @click="confirm"
                >
                  {{ options.confirmButtonText }}
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

<script>
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
import { merge } from "@/utils/utils"
import { isFunction } from "@/utils/check"
import { useStyle, useUnit, useColor } from "@/utils/style"

/**
 * @name zm-dialog 弹出框组件
 * @prop {Boolean} show - 是否显示
 * @prop {String} title - 标题
 * @prop {Number|String} width - 整个dialog宽度
 * @prop {Number|String} height - 消息内容高度
 * @prop {String} content - 内容
 * @prop {String} contentAlign - 内容对齐方式
 * @prop {Boolean} showConfirmButton - 是否显示确认按钮
 * @prop {Boolean} showCancelButton - 是否显示取消按钮
 * @prop {String} confirmButtonText - 确认按钮文字
 * @prop {String} confirmButtonColor - 确认按钮文字颜色
 * @prop {String} cancelButtonText - 取消按钮文字
 * @prop {String} cancelButtonColor - 取消按钮文字颜色
 * @prop {Boolean} buttonReverse - 是否对调确认和取消按钮位置
 * @prop {Boolean} overlay - 是否显示遮罩层
 * @prop {Object|String} overlayStyle - 自定义遮罩层样式
 * @prop {Boolean} closeOnClickOverlay - 是否点击遮罩层后关闭
 * @prop {Number|String} offsetTop - 弹窗顶部偏移
 * @prop {Boolean} asyncClose - 是否异步关闭
 * @prop {Number|String} zIndex - 元素层级
 * @prop {Number|String} duration - 弹窗打开过渡时间,单位毫秒
 * @prop {Number|String} borderRadius - 弹窗圆角
 * @prop {Object|String} customStyle - 自定义样式
 */
export default {
  name: "zm-dialog",
  mixins: [hook, weixin],
  props: {
    show: { type: Boolean, default: false },
    title: { type: String, default: "" },
    width: { type: [Number, String], default: "" },
    height: { type: [Number, String], default: "" },
    content: { type: String, default: "" },
    contentAlign: { type: String, default: "center" },
    showConfirmButton: { type: Boolean, default: true },
    showCancelButton: { type: Boolean, default: false },
    confirmButtonText: { type: String, default: "确认" },
    confirmButtonColor: { type: String, default: "var(--theme-color)" },
    cancelButtonText: { type: String, default: "取消" },
    cancelButtonColor: { type: String, default: "" },
    buttonReverse: { type: Boolean, default: false },
    overlay: { type: Boolean, default: true },
    overlayStyle: { type: [Object, String], default: () => ({}) },
    closeOnClickOverlay: { type: Boolean, default: false },
    padding: { type: [Number, String], default: "" },
    offsetTop: { type: [Number, String], default: "" },
    asyncClose: { type: Boolean, default: false },
    zIndex: { type: [Number, String], default: "" },
    duration: { type: [Number, String], default: 300 },
    background: { type: String, default: "" },
    borderRadius: { type: [Number, String], default: "16rpx" },
    customStyle: { type: [Object, String], default: () => ({}) }
  },
  data() {
    return {
      options: {
        show: false,
        title: "",
        width: "",
        height: "",
        content: "",
        contentAlign: "center",
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: "确认",
        confirmButtonColor: "var(--theme-color)",
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
        onOverlay: null
      },
      openType: "outside",
      visible: false,
      cancelLoading: false,
      confirmLoading: false,
      timingFunction: "ease-out"
    }
  },
  computed: {
    dialogStyle() {
      const style = {}
      style.zIndex = this.options.zIndex
      return useStyle(style)
    },
    dialogTransitionStyle() {
      const style = {}
      style.top = 0
      style.left = 0
      style.right = 0
      style.bottom = 0
      style.position = "fixed"
      return useStyle(style)
    },
    fixedStyle() {
      const style = {}
      style.width = useUnit(this.options.width)
      style.marginTop = useUnit(this.options.offsetTop)
      return useStyle({ ...style, ...useStyle(this.options.customStyle) })
    },
    bodyStyle() {
      const style = {}
      style.background = useColor(this.options.background)
      style.borderRadius = useUnit(this.options.borderRadius)
      return useStyle({ ...style, ...useStyle(this.options.customStyle) })
    },
    scrollStyle() {
      const style = {}
      style.height = useUnit(this.options.height)
      return useStyle(style)
    },
    contentStyle() {
      const style = {}
      style.padding = useUnit(this.options.padding)
      return useStyle(style)
    },
    footerStyle() {
      const style = {}
      style.borderBottomLeftRadius = useUnit(this.options.borderRadius)
      style.borderBottomRightRadius = useUnit(this.options.borderRadius)
      return useStyle(style)
    },
    textClass() {
      const list = []
      list.push(`zm-dialog__content__text--${this.options.contentAlign}`)
      return list
    },
    footerClass() {
      const list = []
      if (this.options.buttonReverse) list.push("zm-dialog__footer--reverse")
      return list
    }
  },
  watch: {
    $props: {
      handler(v) {
        this.options = merge(this.options, v)
      },
      deep: true,
      immediate: true
    },
    "options.show": {
      handler(v) {
        if (v) {
          this.openType = "inner"
          this.open()
        } else {
          this.openType = "outside"
          this.close("prop")
        }
      },
      immediate: true
    }
  },
  methods: {
    // 点击遮罩层
    onClickOverlay() {
      // 判断是否点击关闭按钮
      if (this.options.closeOnClickOverlay) {
        if (this.options.asyncClose) {
          this.cancelLoading = true
          if (this.openType === "inner") {
            const close = () => this.close("overlay")
            this.$emit("click-overlay", { close })
          } else {
            this.close("overlay")
            this.$emit("click-overlay")
          }
        } else {
          this.close("overlay")
          this.$emit("click-overlay")
        }
      }
    },
    open(options = {}) {
      if (this.visible) return
      this.options = merge(this.options, options)
      this.timingFunction = "ease-out"
      this.visible = true
      this.$emit("update:show", true)
    },
    close(action = "") {
      if (this.visible) {
        const _close = () => {
          this.timingFunction = "ease-in"
          this.visible = false
          this.cancelLoading = false
          this.confirmLoading = false
          this.$emit("update:show", false)
        }
        if (action === "confirm" && isFunction(this.options.onConfirm)) {
          if (this.options.asyncClose) this.options.onConfirm({ close: _close, done: this.done })
          else {
            _close()
            this.options.onConfirm()
          }
        } else if (action === "cancel" && isFunction(this.options.onCancel)) {
          if (this.options.asyncClose) this.options.onCancel({ close: _close, done: this.done })
          else {
            _close()
            this.options.onCancel()
          }
        } else if (action === "overlay" && isFunction(this.options.onOverlay)) {
          if (this.options.asyncClose) this.options.onOverlay({ close: _close, done: this.done })
          else {
            _close()
            this.options.onOverlay()
          }
        } else {
          _close()
        }
      }
    },
    done(action) {
      if (action) {
        const actions = { confirm: "confirmLoading", cancel: "cancelLoading" }
        if (actions[action]) this[actions[action]] = false
      }
    },
    cancel() {
      if (this.options.asyncClose) {
        this.cancelLoading = true
        if (this.openType === "inner") {
          const close = () => this.close("cancel")
          const done = () => this.done("cancel")
          this.$emit("cancel", { close, done })
        } else {
          this.close("cancel")
          this.$emit("cancel")
        }
      } else {
        this.close("cancel")
        this.$emit("cancel")
      }
    },
    confirm() {
      if (this.options.asyncClose) {
        this.confirmLoading = true
        if (this.openType === "inner") {
          const close = () => this.close("confirm")
          const done = () => this.done("confirm")
          this.$emit("confirm", { close, done })
        } else {
          this.close("confirm")
          this.$emit("confirm")
        }
      } else {
        this.close("confirm")
        this.$emit("confirm")
      }
    },
    onOpen() {
      this.$emit("open")
    },
    onOpened() {
      this.$emit("opened")
    },
    onClose() {
      this.$emit("close")
    },
    onClosed() {
      this.$emit("closed")
    },
    noop() {
      return false
    }
  }
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
    background-color: #ffffff;
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
      background-color: #eeeeee;
      transform: translateX(-50%);
    }

    &::after {
      top: 0;
      left: 0;
      width: 100%;
      content: "";
      position: absolute;
      border-top: 2rpx solid #eeeeee;
    }
  }
}
</style>
