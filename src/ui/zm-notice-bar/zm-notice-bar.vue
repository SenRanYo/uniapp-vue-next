<template>
  <view class="zm-notice-bar" :class="[customClass]" :style="[style]">
    <view class="zm-notice-bar__left" v-if="icon || slots.left">
      <slot name="left"><zm-icon v-if="icon" :name="icon" :size="iconSize" :color="iconColor" :weight="iconWeight"></zm-icon></slot>
    </view>

    <swiper class="zm-notice-bar__vertical" v-if="mode === 'vertical'" circular vertical :autoplay="scrollable" :interval="interval" :duration="props.duration">
      <swiper-item style="display: flex" v-for="(text, index) in list" :key="index">
        <text class="zm-notice-bar__vertical__text" :style="[textStyle]">{{ text }}</text>
      </swiper-item>
    </swiper>

    <view class="zm-notice-bar__horizontal" v-if="mode === 'horizontal'">
      <text class="zm-notice-bar__horizontal__text" :class="[horizontalTextClass]" :style="[textStyle, horizontalTextStyle]" v-for="(text, index) in list" :key="index">
        {{ text }}
      </text>
    </view>

    <view class="zm-notice-bar__right" v-if="rightIcon || slots.right">
      <slot name="right"><zm-icon v-if="rightIcon" :name="rightIcon" :size="rightIconSize" :color="rightIconColor" :weight="rightIconWeight"></zm-icon></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { delay } from "../utils/utils"
import { isString, isArray } from "../utils/check"
import { noticeBarEmits, noticeBarProps } from "./index"
import { useStyle, useElRect, useColor, useUnit } from "../hooks"

defineOptions({ name: "zm-notice-bar" })

const slots = useSlots()
const props = defineProps(noticeBarProps)
const emits = defineEmits(noticeBarEmits)

const pause = ref(false)
const duration = ref(0)
const horizontalPaddingLeft = ref("0")
const horizontalPaddingRight = ref("100%")
const instance = getCurrentInstance()

const list = computed(() => {
  if (isString(props.text)) return [props.text]
  if (isArray(props.text) && props.mode === "horizontal") {
    return [props.text[0]]
  }
  return props.text
})

const style = computed(() => {
  const style: any = {}
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const textStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  style.fontWeight = props.fontWeight
  style.minHeight = useUnit(props.minHeight)
  style.lineHeight = useUnit(props.minHeight)
  return useStyle(style)
})

const horizontalTextStyle = computed(() => {
  const style: any = {}
  style.animationDuration = duration.value + "s"
  if (props.scrollable) {
    style.paddingLeft = horizontalPaddingLeft.value
    style.paddingRight = horizontalPaddingRight.value
    style.opacity = pause.value ? 0 : 1
    style.animationPlayState = pause.value ? "paused" : "running"
  }
  return useStyle(style)
})

const horizontalTextClass = computed(() => {
  const list: string[] = []
  if (props.scrollable) list.push("zm-notice-bar__horizontal__text--scrollable")
  if (!pause.value && props.scrollable) list.push("zm-notice-bar__horizontal__text--animation")
  return list
})

async function resize() {
  if (props.mode === "horizontal") horizontalAnimation()
}

async function horizontalAnimation() {
  pause.value = false
  const textRect = await useElRect(".zm-notice-bar__horizontal__text", instance)
  const horizontalRect = await useElRect(".zm-notice-bar__horizontal", instance)
  const horizontalDduration = horizontalRect.width / props.speed
  duration.value = textRect.width / props.speed
  await delay((duration.value - horizontalDduration) * 1000)
  pause.value = true
  await delay(10)
  duration.value = 0
  horizontalPaddingLeft.value = "100%"
  horizontalPaddingRight.value = "0"
  duration.value = textRect.width / props.speed
  await delay(10)
  pause.value = false
}

onMounted(() => resize())
defineExpose({ name: "zm-notice-bar" })
</script>
<script lang="ts">
export default {
  name: "zm-notice-bar",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-notice-bar {
  display: flex;
  padding: 0 24rpx;
  position: relative;
  align-items: center;
  background-color: #fdf6ec;

  &__left {
    margin-right: 16rpx;
  }

  &__right {
    margin-left: 16rpx;
  }

  &__vertical {
    flex: 1;
    height: 80rpx;
    display: flex;

    &__text {
      white-space: normal;
      overflow: hidden;
      box-sizing: border-box;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      color: var(--primary-color);
    }
  }

  &__horizontal {
    flex: 1;
    display: flex;
    overflow: hidden;
    align-items: center;

    &__text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: var(--primary-color);

      &--animation {
        animation: loop-animation 10s linear infinite both;

        @keyframes loop-animation {
          0% {
            transform: translate3d(0, 0, 0);
          }

          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
      }

      &--scrollable {
        overflow: visible;
        white-space: nowrap;
        text-overflow: clip;
      }
    }
  }
}
</style>
