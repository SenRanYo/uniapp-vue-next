<template>
  <zm-transition :show="visible" :duration="200" :z-index="16000" :penetrate="!options.mask" :custom-style="transitionStyle" @closed="onClosed">
    <view class="zm-toast" :style="[toastStyle]">
      <slot>
        <view class="default-slot">
          <view v-if="isShowIcon" class="toast-icon">
            <image v-if="isImage(options.icon)" class="image" :src="options.icon" mode="aspectFit" :style="[imageStyle]" />
            <zm-icon v-else-if="options.icon" :name="options.icon" color="#ffffff" :size="options.iconSize"></zm-icon>
            <view v-else-if="options.type === 'loading'" class="loading" :style="[loadingStyle]"></view>
            <zm-icon v-else-if="['await', 'fail', 'success'].includes(options.type)" :name="icons[options.type]" color="#ffffff" :size="options.iconSize"></zm-icon>
          </view>
          <text class="content-text">{{ options.content }}</text>
        </view>
      </slot>
    </view>
  </zm-transition>
</template>

<script>
import mixin from "../mixins"
import { merge } from "../utils/utils"
import { isImage } from "../utils/check"
import { useStyle, useUnit } from "../utils/style"
export default {
  name: "zm-toast",
  mixins: [mixin],
  data() {
    return {
      timer: null,
      isImage,
      visible: false,
      icons: { await: "clock", fail: "clear", success: "checked" },
      options: { type: "default", position: "middle", offset: 0, width: "", icon: "", iconSize: "70rpx", iconPrefix: "zm-icon", content: "", mask: false, duration: 2000 },
      defaultOptions: {
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
        duration: 2000 // 持续时间
      }
    }
  },
  computed: {
    isShowIcon() {
      return this.options.icon || ["loading", "await", "success", "fail"].includes(this.options.type)
    },
    imageStyle() {
      const style = {}
      style.width = useUnit(this.options.iconSize)
      style.height = useUnit(this.options.iconSize)
      return useStyle(style)
    },
    loadingStyle() {
      const style = {}
      style.width = useUnit(this.options.iconSize)
      style.height = useUnit(this.options.iconSize)
      return useStyle(style)
    },
    toastStyle() {
      const style = {}
      style.maxWidth = useUnit(this.options.width)
      style.background = this.options.background
      if (this.isShowIcon) {
        style.padding = "48rpx"
        style.minWidth = "250rpx"
        style.maxWidth = useUnit(this.options.width) || "250rpx"
        style["aspect-ratio"] = "1 / 1"
      }
      return style
    },
    transitionStyle() {
      const style = {
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        position: "fixed",
        "text-align": "center",
        "align-items": "center",
        "justify-content": "center"
      }
      if (this.options.position === "top") {
        style["align-items"] = "flex-start"
        style["padding-top"] = `${this.options.offset}rpx`
      }
      if (this.options.position === "bottom") {
        style["align-items"] = "flex-end"
        style["padding-bottom"] = `${this.options.offset}rpx`
      }
      return style
    }
  },
  methods: {
    show(options = {}) {
      this.options = merge(this.defaultOptions, options)

      clearTimeout(this.timer)

      if (options.icon === "loading" && !options.duration) {
        this.visible = true
      } else {
        this.visible = true
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.options.duration || 2000)
      }

      return { hide: this.hide }
    },
    hide() {
      this.visible = false
    },
    onClosed() {
      this.options = this.defaultOptions
    }
  }
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
      margin-bottom: 24rpx;

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
        border-color: #ffffff #535353 #535353 #535353;
        animation-duration: 1200ms;
        animation-timing-function: linear;
        animation: rotate 1s linear infinite;

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(1turn);
          }
        }
      }
    }

    .content-text {
      white-space: pre-wrap;
    }
  }
}
</style>
