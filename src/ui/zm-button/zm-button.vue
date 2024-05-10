<template>
  <button
    class="zm-button"
    :style="[buttonStyle]"
    :class="[buttonClass, customClass]"
    :lang="lang"
    :form-type="formType"
    :open-type="openType"
    :session-from="sessionFrom"
    :app-parameter="appParameter"
    :hover-class="buttonHoverClass"
    :hover-stay-time="hoverStayTime"
    :hover-start-time="hoverStartTime"
    :send-message-img="sendMessageImg"
    :send-message-path="sendMessagePath"
    :show-message-card="showMessageCard"
    :send-message-title="sendMessageTitle"
    :hover-stop-propagation="hoverStopPropagation"
    @click.stop="onClick"
    @error="onErrors"
    @launchapp="onLaunchapp"
    @getuserinfo="onGetuserinfo"
    @opensetting="onOpensetting"
    @getphonenumber="onGetphonenumber"
  >
    <view class="zm-button__content">
      <view v-if="isLoading" class="zm-button__loading">
        <zm-loading :size="loadingIconSize"></zm-loading>
      </view>
      <view v-else-if="icon" class="zm-button__icon">
        <zm-icon :name="icon" :color="iconColor" :size="iconSize" :weight="iconWeight" :custom-prefix="iconPrefix"></zm-icon>
      </view>
      <view v-if="isLoading && _loadingText" class="zm-button__text">
        {{ _loadingText }}
      </view>
      <view v-else-if="!isLoading" class="zm-button__text">
        <slot></slot>
      </view>
    </view>
  </button>
</template>

<script>
/**
 * @name zm-button 按钮组件
 * @prop {String} type - 按钮类型，可选值为 "primary", "success", "warning", "error", "default"，默认为 "primary"
 * @prop {String} size - 按钮尺寸，可选值为 "mini", "small", "normal", "medium", "large"，默认为 "medium"
 * @prop {Boolean} round - 是否圆角按钮，默认为 true
 * @prop {Boolean} text - 是否文本按钮，默认为 false
 * @prop {Boolean} plain - 是否朴素按钮，默认为 false
 * @prop {Boolean} block - 是否块级按钮，默认为 false
 * @prop {String} color - 按钮颜色，默认为空
 * @prop {Number|String} width - 按钮宽度，默认为空
 * @prop {Number|String} height - 按钮高度，默认为空
 * @prop {Boolean} disabled - 禁用状态，默认为 false
 * @prop {Boolean} loading - 加载状态，默认为 false
 * @prop {Number|String|Boolean} loadingText - 加载文本，默认为 undefined
 * @prop {Number|String} loadingIconSize - 加载图标大小，默认为空
 * @prop {Number|String} textSize - 文本大小，默认为空
 * @prop {String} textColor - 文本颜色，默认为空
 * @prop {Number|String} textWeight - 文本粗细，默认为空
 * @prop {String} icon - 按钮图标，默认为空
 * @prop {Number|String} iconSize - 图标大小，默认为空
 * @prop {String} iconColor - 图标颜色，默认为空
 * @prop {String} iconPrefix - 图标前缀，默认为 "uicon"
 * @prop {Number|String} iconWeight - 图标粗细，默认为空
 * @prop {Number|String} borderRadius - 圆角，默认为空
 * @prop {Number|String} borderWidth - 边框宽度，默认为空
 * @prop {String} borderColor - 边框颜色，默认为空
 * @prop {String} formType - 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件，默认为空
 * @prop {String} openType - 开放能力，默认为空
 * @prop {String} appParameter - 打开 APP 时，向 APP 传递的参数，open-type=launchApp 时有效，只微信小程序、QQ小程序有效，默认为空
 * @prop {Boolean} hoverStopPropagation - 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效，默认为 true
 * @prop {String} lang - 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文，只微信小程序有效，默认为 "zh_CN"
 * @prop {String} sessionFrom - 会话来源，open-type="contact" 时有效，只微信小程序有效，默认为空
 * @prop {String} sendMessageTitle - 会话内消息卡片标题，open-type="contact" 时有效，只微信小程序有效，默认为空
 * @prop {String} sendMessagePath - 会话内消息卡片点击跳转小程序路径，open-type="contact" 时有效，只微信小程序有效，默认为空
 * @prop {String} sendMessageImg - 会话内消息卡片图片，open-type="contact" 时有效，只微信小程序有效，默认为空
 * @prop {Boolean} showMessageCard - 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，open-type="contact" 时有效，默认为 false
 * @prop {String} dataName - 额外传参参数，用于小程序的 data-xxx 属性，通过 target.dataset.name 获取，默认为空
 * @prop {Number|String} throttle - 节流，一定时间内只能触发一次，默认为 200
 * @prop {Number|String} hoverStartTime - 按住后多久出现点击态，单位毫秒，默认为 50
 * @prop {Number|String} hoverStayTime - 手指松开后点击态保留时间，单位毫秒，默认为 50
 * @prop {Object|String} customStyle - 自定义样式，默认为空对象
 * @prop {String} customClass - 自定义类名，默认为空
 */

import mixin from "../mixins"
import { throttling } from "../utils/utils"
import { isBoolean, isString } from "../utils/check"
import { useStyle, useColor, useUnit } from "../utils/style"
export default {
  name: "zm-button",
  mixins: [mixin],
  props: {
    type: { type: String, default: "primary", validator: (v) => ["primary", "success", "warning", "error", "default"].includes(v) },
    size: { type: String, default: "medium", validator: (v) => ["mini", "small", "normal", "medium", "large"].includes(v) },
    round: { type: Boolean, default: true },
    text: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    color: { type: String, default: "" },
    width: { type: [Number, String], default: "" },
    height: { type: [Number, String], default: "" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    loadingText: { type: [Number, String, Boolean], default: "" },
    loadingIconSize: { type: [Number, String], default: "" },
    textSize: { type: [String, Number], default: "" },
    textColor: { type: String, default: "" },
    textWeight: { type: [String, Number], default: "" },
    icon: { type: String, default: "" },
    iconSize: { type: [String, Number], default: "" },
    iconColor: { type: String, default: "" },
    iconPrefix: { type: String, default: "uicon" },
    iconWeight: { type: [String, Number], default: "" },
    borderRadius: { type: [String, Number], default: "" },
    borderWidth: { type: [String, Number], default: "" },
    borderColor: { type: String, default: "" },
    formType: { type: String, default: "" },
    openType: { type: String, default: "" },
    appParameter: { type: String, default: "" },
    hoverStopPropagation: { type: Boolean, default: true },
    lang: { type: String, default: "zh_CN" },
    sessionFrom: { type: String, default: "" },
    sendMessageTitle: { type: String, default: "" },
    sendMessagePath: { type: String, default: "" },
    sendMessageImg: { type: String, default: "" },
    showMessageCard: { type: Boolean, default: false },
    dataName: { type: String, default: "" },
    throttle: { type: [String, Number], default: 200 },
    hoverStartTime: { type: [String, Number], default: 50 },
    hoverStayTime: { type: [String, Number], default: 50 },
    customStyle: { type: [Object, String], default: () => ({}) },
    customClass: { type: String, default: "" }
  },
  data() {
    return {
      innerLoading: false,
      innerDisabled: false,
      innerLoadingText: ""
    }
  },
  computed: {
    isLoading() {
      return this.loading || this.innerLoading
    },
    isDisabled() {
      return this.disabled || this.innerDisabled
    },
    _loadingText() {
      if (isBoolean(this.loadingText)) return ""
      return isString(this.loadingText) ? this.loadingText : this.innerLoadingText || "加载中..."
    },
    buttonStyle() {
      const style = {}
      style.width = useUnit(this.width)
      style.height = useUnit(this.height)
      style.color = useColor(this.textColor)
      style.fontSize = useUnit(this.textSize)
      style.fontWeight = this.textWeight
      style.background = useColor(this.color)
      style.borderWidth = useUnit(this.borderWidth)
      style.borderColor = useColor(this.borderColor)
      style.borderRadius = useUnit(this.borderRadius)
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    },
    buttonClass() {
      const list = []
      list.push(`zm-button--${this.type}`)
      list.push(`zm-button--${this.size}`)
      const states = ["text", "plain", "round", "block"]
      states.forEach((state) => this[state] && list.push(`zm-button--${state}`))
      if (this.isLoading) list.push("zm-button--loading")
      if (this.isDisabled) list.push("zm-button--disabled")
      return list.join(" ")
    },
    buttonHoverClass() {
      return this.isDisabled || this.isLoading ? "" : "zm-button--active"
    }
  },
  methods: {
    onClick(event) {
      if (this.isLoading || this.isDisabled) return
      const loading = (state, text) => {
        this.innerLoading = state
        this.innerLoadingText = text
      }
      const disable = (val) => (this.innerDisabled = val)
      throttling(() => this.$emit("click", event, { loading, disable }))
    },
    onErrors(event) {
      if (this.isLoading || this.isDisabled) return
      this.$emit("error", event)
    },
    onLaunchapp(event) {
      if (this.isLoading || this.isDisabled) return
      this.$emit("launchapp", event)
    },
    onGetuserinfo(event) {
      if (this.isLoading || this.isDisabled) return
      this.$emit("getuserinfo", event)
    },
    onOpensetting(event) {
      if (this.isLoading || this.isDisabled) return
      this.$emit("opensetting", event)
    },
    onGetphonenumber(event) {
      if (this.isLoading || this.isDisabled) return
      this.$emit("getphonenumber", event)
    }
  }
}
</script>

<style lang="scss" scoped>
$zm-button-primary-color: var(--theme-color, #fd7441);
$zm-button-default-color: #ffffff;
$zm-button-success-color: #15c366;
$zm-button-warning-color: #ffa51a;
$zm-button-error-color: #ee0c24;

$zm-button-primary-border-color: $zm-button-primary-color;
$zm-button-default-border-color: #dcdee0;
$zm-button-success-border-color: $zm-button-success-color;
$zm-button-warning-border-color: $zm-button-warning-color;
$zm-button-error-border-color: $zm-button-error-color;

$zm-button-mini-height: 48rpx;
$zm-button-small-height: 56rpx;
$zm-button-normal-height: 64rpx;
$zm-button-medium-height: 88rpx;
$zm-button-large-height: 100rpx;

$zm-button-mini-font-size: 20rpx;
$zm-button-small-font-size: 22rpx;
$zm-button-normal-font-size: 24rpx;
$zm-button-medium-font-size: 28rpx;
$zm-button-large-font-size: 32rpx;

.zm-button {
  display: flex;
  overflow: visible;
  position: relative;
  line-height: 1;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  border-radius: 8rpx;
  box-sizing: border-box;
  justify-content: center;

  height: $zm-button-normal-height;
  font-size: $zm-button-normal-font-size;

  &::before {
    top: 50%;
    left: 50%;
    opacity: 0;
    width: 100%;
    height: 100%;
    content: "";
    border: inherit;
    position: absolute;
    background: #000000;
    border-color: #000000;
    border-radius: inherit;
    transform: translate(-50%, -50%);
  }

  &::after {
    content: none;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__loading {
    color: inherit;
    font-size: inherit;
  }

  &__icon {
    display: flex;
    color: inherit;
    font-size: inherit;
  }
  &__text {
    display: flex;
  }

  &__icon + &__text {
    margin-left: 8rpx;
  }

  &--mini {
    height: $zm-button-mini-height;
    font-size: $zm-button-mini-font-size;
  }

  &--small {
    height: $zm-button-small-height;
    font-size: $zm-button-small-font-size;
  }

  &--normal {
    height: $zm-button-normal-height;
    font-size: $zm-button-normal-font-size;
  }

  &--medium {
    height: $zm-button-medium-height;
    font-size: $zm-button-medium-font-size;
  }

  &--large {
    height: $zm-button-large-height;
    font-size: $zm-button-large-font-size;
    font-weight: bold;
  }

  &--primary {
    color: #fff;
    background: $zm-button-primary-color;

    &.zm-button--plain {
      background-color: #fff;
      color: $zm-button-primary-color;
      border: 2rpx solid currentColor;
      &::before {
        background: currentColor;
        border-color: currentColor;
      }
    }

    &.zm-button--text {
      border-width: 0;
      color: $zm-button-primary-color;
      background-color: transparent;
    }
  }

  &--default {
    background: $zm-button-default-color;

    &.zm-button--plain {
      color: currentColor;
      background-color: #fff;
      border: 2rpx solid currentColor;
      &::before {
        background: currentColor;
        border-color: currentColor;
      }
    }

    &.zm-button--text {
      border-width: 0;
      background-color: transparent;
    }
  }

  &--success {
    color: #fff;
    background: $zm-button-success-color;

    &.zm-button--plain {
      background-color: #fff;
      color: $zm-button-success-color;
      border: 2rpx solid currentColor;
      &::before {
        background: currentColor;
        border-color: currentColor;
      }
    }

    &.zm-button--text {
      border-width: 0;
      color: $zm-button-success-color;
      background-color: transparent;
    }
  }

  &--warning {
    color: #fff;
    background: $zm-button-warning-color;

    &.zm-button--plain {
      background-color: #fff;
      color: $zm-button-warning-color;
      border: 2rpx solid currentColor;
      &::before {
        background: currentColor;
        border-color: currentColor;
      }
    }

    &.zm-button--text {
      border-width: 0;
      color: $zm-button-warning-color;
      background-color: transparent;
    }
  }

  &--error {
    color: #fff;
    background: $zm-button-error-color;

    &.zm-button--plain {
      background-color: #fff;
      color: $zm-button-error-color;
      border: 2rpx solid currentColor;
      &::before {
        background: currentColor;
        border-color: currentColor;
      }
    }

    &.zm-button--text {
      border-width: 0;
      color: $zm-button-error-color;
      background-color: transparent;
    }
  }

  &--text {
    padding: 0;
    height: fit-content;
    display: inline-flex;
    line-height: normal;
    border-color: transparent;
    &--active::before {
      content: none;
    }
  }

  &--block {
    flex: 1;
    flex-direction: column;
  }

  &--round {
    border-radius: 200px;
  }

  &--loading {
    .zm-button__loading + .zm-button__text {
      margin-left: 8rpx;
    }
  }

  &--disabled {
    opacity: 0.5;
  }

  &--active {
    &.zm-button--text {
      opacity: 0.6;
    }
    &:not(.zm-button--text)::before {
      opacity: 0.1;
    }
  }
}
</style>
