<template>
  <button
    class="zm-button"
    :style="[style]"
    :class="[classs, customClass]"
    :lang="lang"
    :form-type="formType"
    :open-type="openType"
    :session-from="sessionFrom"
    :app-parameter="appParameter"
    :hover-class="hoverClass"
    :hover-stay-time="hoverStayTime"
    :hover-start-time="hoverStartTime"
    :send-message-img="sendMessageImg"
    :send-message-path="sendMessagePath"
    :show-message-card="showMessageCard"
    :send-message-title="sendMessageTitle"
    :hover-stop-propagation="hoverStopPropagation"
    @error="onError"
    @click.stop="onClick"
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
      <view v-if="isLoading && loadingTextc" class="zm-button__text">
        {{ loadingTextc }}
      </view>
      <view v-else-if="!isLoading" class="zm-button__text">
        <slot></slot>
      </view>
    </view>
  </button>
</template>

<script setup lang="ts">
import { throttling } from "../utils/utils"
import { buttonEmits, buttonProps } from "./index"
import { useStyle, useUnit, useColor } from "../hooks"
import { ButtonOnErrorEvent, ButtonOnGetphonenumberEvent, ButtonOnLaunchappEvent, ButtonOnOpensettingEvent } from "@uni-helper/uni-app-types/index"

defineOptions({ name: "zm-button" })
const emits = defineEmits(buttonEmits)
const props = defineProps(buttonProps)

const loading = ref(false)
const disabled = ref(false)
const loadingText = ref("")

const style = computed(() => {
  const style: any = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.color = useColor(props.textColor)
  style.fontSize = useUnit(props.textSize)
  style.fontWeight = props.textWeight
  style.background = useColor(props.color)
  style.borderWidth = useUnit(props.borderWidth)
  style.borderColor = useColor(props.borderColor)
  style.borderRadius = useUnit(props.borderRadius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list = []
  list.push(`zm-button--${props.type}`)
  list.push(`zm-button--${props.size}`)
  const states = ["text", "plain", "round", "block"]
  states.forEach((state) => props[state] && list.push(`zm-button--${state}`))
  if (isLoading.value) list.push("zm-button--loading")
  if (isDisabled.value) list.push("zm-button--disabled")
  return list.join(" ")
})

const hoverClass = computed(() => {
  return isDisabled.value || isLoading.value ? "" : "zm-button--active"
})

const isLoading = computed(() => {
  return props.loading || loading.value
})

const isDisabled = computed(() => {
  return props.disabled || disabled.value
})

const loadingTextc = computed(() => {
  return props.loadingText || loadingText.value
})

function onClick(event: TouchEvent) {
  if (isLoading.value || isDisabled.value) return
  const _loading = (state: boolean, text: string) => {
    loading.value = state
    loadingText.value = text
  }
  const _disable = (state: boolean) => (disabled.value = state)
  throttling(() => emits("click", event, { loading: _loading, disable: _disable }))
}

function onError(event: ButtonOnErrorEvent) {
  if (isLoading.value || isDisabled.value) return
  emits("error", event)
}

function onLaunchapp(event: ButtonOnLaunchappEvent) {
  if (isLoading.value || isDisabled.value) return
  emits("launchapp", event)
}

function onGetuserinfo(event: any) {
  if (isLoading.value || isDisabled.value) return
  emits("getuserinfo", event)
}

function onOpensetting(event: ButtonOnOpensettingEvent) {
  if (isLoading.value || isDisabled.value) return
  emits("opensetting", event)
}

function onGetphonenumber(event: ButtonOnGetphonenumberEvent) {
  if (isLoading.value || isDisabled.value) return
  emits("getphonenumber", event)
}

defineExpose({ name: "zm-button" })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
$zm-button-primary-color: var(--primary-color, #fd7441);
$zm-button-default-color: #fff;
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
    background: #000;
    border-color: #000;
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
      border: 2rpx solid currentcolor;

      &::before {
        background: currentcolor;
        border-color: currentcolor;
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
      color: currentcolor;
      background-color: #fff;
      border: 2rpx solid currentcolor;

      &::before {
        background: currentcolor;
        border-color: currentcolor;
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
      border: 2rpx solid currentcolor;

      &::before {
        background: currentcolor;
        border-color: currentcolor;
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
      border: 2rpx solid currentcolor;

      &::before {
        background: currentcolor;
        border-color: currentcolor;
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
      border: 2rpx solid currentcolor;

      &::before {
        background: currentcolor;
        border-color: currentcolor;
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
