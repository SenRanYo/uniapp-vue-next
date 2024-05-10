<template>
  <view v-if="show" class="zm-color-palette">
    <canvas :id="canvasId" :canvas-id="canvasId" :style="[style]"></canvas>
  </view>
</template>

<script>
import ColorAnalysis from "./analysis"
import mixins from "../mixins"
import { uuid } from "../utils/utils"
import { useStyle } from "../utils/style"
const canvasId = `color-palette-${uuid()}`
export default {
  name: "zm-color-analysis",
  mixins: [mixins],
  props: {
    // 图片地址
    url: {
      type: [String, null],
      default: ""
    },
    // 最大颜色数量
    maxColors: {
      type: [Number, String],
      default: 5
    },
    // 匹配颜色
    matchColors: {
      type: [Array, null],
      default: () => []
    }
  },
  data() {
    return {
      show: true,
      winWidth: 375,
      canvasId: canvasId,
      canvasWidth: 200,
      canvasHeight: 200,
      colorAnalysis: null
    }
  },
  computed: {
    style() {
      const style = {}
      style.width = this.canvasWidth + "px"
      style.height = this.canvasHeight + "px"
      return useStyle(style)
    }
  },
  watch: {
    url: {
      handler(v) {
        if (v) this.analysis()
      },
      immediate: true
    }
  },
  mounted() {
    this.analysis()
  },
  methods: {
    // 分析颜色
    analysisColors(callback = () => {}) {
      uni.getImageInfo({
        src: this.url,
        success: (imgInfo) => {
          let { width, height } = imgInfo
          let scale = (0.6 * this.winWidth) / Math.max(width, height)
          let canvasWidth = Math.floor(scale * width)
          let canvasHeight = Math.floor(scale * height)
          this.canvasWidth = canvasWidth
          this.canvasHeight = canvasHeight
          this.colorAnalysis.getPalette(
            {
              width: canvasWidth,
              height: canvasHeight,
              imgPath: imgInfo.path,
              maxColors: this.maxColors,
              step: 1
            },
            (colorArr) => {
              if (colorArr) {
                let rbgColors = []
                colorArr = colorArr.map((color) => {
                  rbgColors.push(`${color[0]},${color[1]},${color[2]}`)
                  return this.handleRgbToHex(color[0], color[1], color[2])
                })
                callback(colorArr)
              }
            },
            this
          )
        }
      })
    },
    // 查询相近颜色
    findClosestColor(hexColorsArray, targetColorArray) {
      let closestColor
      let minDiff = Number.MAX_VALUE

      // 计算颜色差值
      const colorDifference = (rgb1, rgb2) => {
        let diff = Math.pow(rgb1[0] - rgb2[0], 2) + Math.pow(rgb1[1] - rgb2[1], 2) + Math.pow(rgb1[2] - rgb2[2], 2)
        return diff
      }

      // 遍历hexColorsArray，计算每一个颜色和targetColorArray中每一个颜色之间的颜色差值
      hexColorsArray.forEach((hexColor) => {
        let rgb1 = this.handleHexToRgb(hexColor)
        targetColorArray.forEach((targetColor) => {
          let rgb2 = this.handleHexToRgb(targetColor)
          let diff = colorDifference(rgb1, rgb2)
          // 如果颜色差值小于minDiff，则更新minDiff和closestColor
          if (diff < minDiff) {
            minDiff = diff
            closestColor = hexColor
          }
        })
      })

      // 返回closestColor
      return closestColor
    },
    // RGB转16进制颜色
    handleRgbToHex(r, g, b) {
      const toHex = (n) => {
        n = parseInt(n, 10)
        if (isNaN(n)) return "00"
        n = Math.max(0, Math.min(n, 255))
        return "0123456789ABCDEF".charAt((n - (n % 16)) / 16) + "0123456789ABCDEF".charAt(n % 16)
      }
      return "#" + toHex(r) + toHex(g) + toHex(b)
    },
    // 16进制转RGB颜色
    handleHexToRgb(hex) {
      let bigint = parseInt(hex.slice(1), 16)
      let r = (bigint >> 16) & 255
      let g = (bigint >> 8) & 255
      let b = bigint & 255
      return [r, g, b]
    },
    // 开始分析
    analysis() {
      if (this.url) {
        this.show = true
        this.$nextTick(() => {
          this.colorAnalysis = new ColorAnalysis(this.canvasId)
          this.analysisColors((colors) => {
            if (this.matchColors.length) {
              this.$emit("finish", [this.findClosestColor(this.matchColors, colors)])
              this.show = false
            } else {
              this.$emit("finish", colors)
              this.show = false
            }
          })
          this.winWidth = uni.getSystemInfoSync().windowWidth
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.zm-color-palette {
  top: -9999px;
  left: -9999px;
  z-index: 10;
  position: fixed;
  visibility: visible;
  pointer-events: none;
}
</style>
