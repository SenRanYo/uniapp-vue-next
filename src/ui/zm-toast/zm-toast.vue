<template>
  <zm-transition :show="visible" :duration="200" :z-index="16000" :penetrate="!useOptions.mask" :custom-style="transitionStyle" @closed="onClosed">
    <view class="zm-toast" :style="[style]">
      <slot>
        <view class="default-slot">
          <view v-if="isShowIcon" class="toast-icon">
            <image v-if="isImage(useOptions.icon)" class="image" :src="useOptions.icon" mode="aspectFit" :style="[imageStyle]" />
            <zm-icon v-else-if="useOptions.icon" :name="useOptions.icon" color="#ffffff" :size="useOptions.iconSize"></zm-icon>
            <view v-else-if="useOptions.type === 'loading'" class="loading" :style="[loadingStyle]"></view>
            <zm-icon v-else-if="['await', 'fail', 'success'].includes(useOptions.type)" :name="icons[useOptions.type]" color="#ffffff" :size="useOptions.iconSize"></zm-icon>
          </view>
          <text class="content-text" v-if="useOptions.content">{{ useOptions.content }}</text>
        </view>
      </slot>
    </view>
  </zm-transition>
</template>

<script setup lang="ts">
import { isImage } from "../utils/check"
import { useStyle, useUnit } from "../utils/style"

const timer = ref()
const visible = ref(false)
const icons = ref({ await: "clock", fail: "clear", success: "checked" })
const useOptions = ref({
  type: "default",
  background: "rgba(51, 51, 51, 1)",
  position: "middle",
  offset: 0,
  width: "",
  icon: "",
  iconSize: "70rpx",
  iconPrefix: "zm-icon",
  content: "",
  mask: false,
  duration: 2000,
})
const baseOptions = ref({
  type: "default", // loading-加载中的状态，await-等待的状态，success-成功的状态，fail-失败的状态，default-默认的状态
  background: "rgba(51, 51, 51, 1)", // 是否显示背景
  position: "middle", // middle-居中的状态，top-顶部的状态，bottom-底部的状态
  offset: 150, // 偏移量
  width: "", // 宽度
  icon: "", // 图标
  iconSize: "70rpx", // 图标大小
  iconPrefix: "zm-icon", // 图标前缀
  content: "", // 内容
  mask: false, // 是否启用遮罩，防止点击穿透
  duration: 2000, // 持续时间
})

const style = computed(() => {
  const style: any = {}
  style.maxWidth = useUnit(useOptions.value.width)
  style.background = useOptions.value.background
  if (isShowIcon.value) {
    style.padding = "48rpx"
    style.minWidth = "150rpx"
    style.maxWidth = useUnit(useOptions.value.width) || "150rpx"
    style["aspect-ratio"] = "1 / 1"
  }
  return style
})
const isShowIcon = computed(() => useOptions.value.icon || ["loading", "await", "success", "fail"].includes(useOptions.value.type))
const imageStyle = computed(() => useStyle({ width: useUnit(useOptions.value.iconSize), height: useUnit(useOptions.value.iconSize) }))
const loadingStyle = computed(() => useStyle({ width: useUnit(useOptions.value.iconSize), height: useUnit(useOptions.value.iconSize) }))
const transitionStyle = computed(() => {
  const style = {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    position: "fixed",
    "text-align": "center",
    "align-items": "center",
    "justify-content": "center",
  }
  if (useOptions.value.position === "top") {
    style["align-items"] = "flex-start"
    style["padding-top"] = `${useOptions.value.offset}rpx`
  }
  if (useOptions.value.position === "bottom") {
    style["align-items"] = "flex-end"
    style["padding-bottom"] = `${useOptions.value.offset}rpx`
  }
  return style
})

function show(options = {}) {
  useOptions.value = { ...baseOptions.value, ...options }
  clearTimeout(timer.value)
  if (useOptions.value.icon === "loading" && !useOptions.value.duration) {
    visible.value = true
  } else {
    visible.value = true
    timer.value = setTimeout(() => {
      visible.value = false
    }, useOptions.value.duration || 2000)
  }

  return { hide }
}

function hide() {
  visible.value = false
}

function onClosed() {
  useOptions.value = baseOptions.value
}

defineExpose({ show, hide })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-toast {
  color: #fff;
  display: flex;
  max-width: 642rpx;
  position: relative;
  text-align: center;
  align-items: center;
  padding: 30rpx 48rpx;
  border-radius: 12rpx;
  justify-content: center;
  transition: all 0.3s ease;

  .default-slot {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    .toast-icon {
      .image {
        width: 60rpx;
        height: 60rpx;
      }

      .loading {
        width: 60rpx;
        height: 60rpx;
        border-width: 4rpx;
        border-radius: 50%;
        border-style: solid;
        animation: rotate 1s linear infinite;
        border-color: #fff #535353 #535353;
        animation-duration: 1200ms;
        animation-timing-function: linear;

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(1turn);
          }
        }
      }
    }

    .content-text {
      margin-top: 24rpx;
      white-space: pre-wrap;
    }
  }
}
</style>
