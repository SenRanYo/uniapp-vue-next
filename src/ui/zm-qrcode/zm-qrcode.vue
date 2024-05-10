<template>
  <view class="zm-qrcode" :style="[wrapStyle]">
    <!-- #ifndef MP-ALIPAY -->
    <canvas class="zm-qrcode-canvas" :canvas-id="canvasId" :style="{ width: canvasSize + 'px', height: canvasSize + 'px' }" />
    <!-- #endif -->
    <!-- #ifdef MP-ALIPAY -->
    <canvas :id="canvasId" class="zm-qrcode-canvas" :width="canvasSize" :height="canvasSize" />
    <!-- #endif -->
    <text v-if="show && isFail" class="zm-qrcode__fail" @click="makeCode">二维码生成失败,点击重试</text>
    <text v-else-if="show && isLoading" class="zm-qrcode__loading">{{ loadingText }}</text>
    <image v-else-if="show && isSuccess" :src="result" :style="{ width: canvasSize + 'px', height: canvasSize + 'px' }" />
  </view>
</template>

<script>
/**
 * @component zm-qrcode 二维码组件
 * @description 二维码组件，用于生成二维码图片。
 * @props {Number} size - 二维码尺寸，默认为200。
 * @props {Boolean} show - 是否显示二维码，默认为true。
 * @props {String} value - 二维码值，默认为空字符串。
 * @props {String} background - 背景色，默认为"#ffffff"。
 * @props {String} foreground - 前景色，默认为"#000000"。
 * @props {String} pdground - 边框色，默认为"#000000"。
 * @props {String} icon - 二维码图标，默认为空字符串。
 * @props {Number} iconSize - 二维码图标尺寸，默认为40。
 * @props {Number} lv - 二维码等级，默认为3。
 * @props {Boolean} auto - 是否自动生成二维码，默认为true。
 * @props {String} loadingText - 加载动画文本，默认为"二维码生成中..."。
 * @event success - 二维码生成成功时触发的事件。
 * @event error - 二维码生成失败时触发的事件。
 * @method makeCode - 生成二维码的方法。
 * @method saveCode - 保存二维码图片到相册的方法。
 */

import mixin from "../mixins"
import QRCode from "./qrcode"
import { uuid, debounce } from "../utils/utils"
import { useStyle, useUnit, useUnitToPx } from "../utils/style"
const canvasId = "zm-qrcode-" + uuid()
export default {
  name: "zm-qrcode",
  mixins: [mixin],
  props: {
    // 二维码尺寸
    size: { type: Number, default: 200 },
    // 是否显示
    show: { type: Boolean, default: true },
    // 二维码值
    value: { type: [String, null], default: "" },
    // 背景色
    background: { type: String, default: "#ffffff" },
    // 前景色
    foreground: { type: String, default: "#000000" },
    // 边框色
    pdground: { type: String, default: "#000000" },
    // 二维码图标
    icon: { type: String, default: "" },
    // 二维码图标尺寸
    iconSize: { type: Number, default: 40 },
    // 二维码等级
    lv: { type: Number, default: 3 },
    // 是否自动生成
    auto: { type: Boolean, default: true },
    // 加载动画文本
    loadingText: { type: String, default: "二维码生成中..." }
  },
  data() {
    return {
      canvasId,
      result: "",
      isFail: false,
      isSuccess: false,
      isLoading: false
    }
  },
  computed: {
    wrapStyle() {
      const style = {}
      style.width = useUnit(this.size)
      style.height = useUnit(this.size)
      return useStyle(style)
    },
    canvasSize() {
      return useUnitToPx(this.size)
    }
  },
  watch: {
    $props: {
      handler() {
        if (this.auto && this.value) this.makeCode()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async makeCode() {
      this.isFail = false
      this.isLoading = true
      await this.$nextTick()
      setTimeout(() => {
        new QRCode({
          context: this, // 上下文环境
          canvasId: this.canvasId, // canvas-id
          usingComponents: true, // 是否是自定义组件
          showLoading: false, // 是否显示loading
          text: this.value, // 生成内容
          size: useUnitToPx(this.size), // 二维码大小
          background: this.background, // 背景色
          foreground: this.foreground, // 前景色
          pdground: this.pdground, // 定位角点颜色
          correctLevel: this.lv, // 容错级别
          image: this.icon, // 二维码图标
          imageSize: this.iconSize, // 二维码图标大小
          success: (res) => {
            // 生成二维码的回调
            this.result = res
            this.isSuccess = true
            this.$emit("success", res)
          },
          fail: (err) => {
            // 生成二维码失败的回调
            this.isFail = true
            this.$emit("error", err)
          },
          complete: () => {
            this.isLoading = false
          }
        })
      }, 200)
    },
    saveCode() {
      if (this.result) {
        uni.saveImageToPhotosAlbum({
          filePath: this.result,
          success: () => {
            uni.showToast({ title: "二维码保存成功", icon: "success", duration: 2000 })
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.zm-qrcode {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  .zm-qrcode-canvas {
    top: -99999rpx;
    left: -99999rpx;
    z-index: -99999;
    position: fixed !important;
  }
  &__fail {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
}
</style>
