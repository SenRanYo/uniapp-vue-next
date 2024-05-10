<template>
  <view class="zm-line" :style="[wrapStyle]"></view>
</template>

<script>
import mixins from "../mixins"
import { useStyle, useUnit, useColor } from "../utils/style"
export default {
  name: "zm-line",
  mixins: [mixins],
  props: {
    // 线条颜色
    color: {
      type: String,
      default: ""
    },
    // 线条大小
    size: {
      type: [Number, String],
      default: "2rpx"
    },
    // 线条类型 solid实线 dashed虚线 dotted点线
    type: {
      type: String,
      default: "solid"
    },
    // 线条方向 horizontal-横向 vertical-竖向
    direction: {
      type: String,
      default: "horizontal"
    },
    // 外间距
    margin: {
      type: [Number, String],
      default: ""
    },
    // 自定义类名
    customClass: {
      type: [String, Array],
      default: ""
    },
    // 自定义样式
    customStyle: {
      type: [Object, String],
      default: ""
    }
  },
  data() {
    return {}
  },
  computed: {
    wrapStyle() {
      const style = {}
      style.margin = useUnit(this.margin)
      if (this.direction === "vertical") {
        style.borderRight = `${useUnit(this.size)} ${this.type} ${useColor(this.color)}`
      } else {
        style.borderTop = `${useUnit(this.size)} ${this.type} ${useColor(this.color)}`
      }
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    }
  }
}
</script>

<style lang="scss" scoped></style>
