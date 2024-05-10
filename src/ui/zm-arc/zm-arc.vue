<template>
  <view class="zm-arc" :class="[customClass]" :style="[style]">
    <view class="zm-arc__inner" :style="[innerStyle]"></view>
  </view>
</template>

<script>
/**
 * @name zm-arc 弧形组件
 * @description 弧形组件，用于展示弧形背景效果。
 * @prop {Number|String} height - 弧形高度，默认为 "130rpx"。
 * @prop {Number|String} percent - 圆弧半径，默认为 120。
 * @prop {String} background - 背景色，默认为空。
 * @prop {Number|String} top - 顶部位置，默认为 0。
 * @prop {Number|String} left - 左边位置，默认为 0。
 * @prop {Boolean} fixed - 是否固定定位，默认为 true。
 * @prop {Number|String} zIndex - 元素层级，默认为空。
 * @prop {Object|String} customStyle - 自定义样式，默认为空对象。
 */

import mixin from "../mixins"
import { useStyle, useColor, useUnit } from "../utils/style"
export default {
  name: "zm-arc",
  mixins: [mixin],
  props: {
    height: { type: [Number, String], default: "130rpx" },
    percent: { type: [Number, String], default: 120 },
    background: { type: String, default: "" },
    top: { type: [Number, String], default: 0 },
    left: { type: [Number, String], default: 0 },
    fixed: { type: Boolean, default: true },
    zIndex: { type: [Number, String], default: "" },
    customClass: { type: String, default: "" },
    customStyle: { type: [Object, String], default: () => ({}) }
  },
  data() {
    return {}
  },
  computed: {
    width() {
      return Math.max(Number(this.percent), 120)
    },
    style() {
      const style = {}
      style.top = useUnit(this.top)
      style.left = useUnit(this.left)
      style.height = useUnit(this.height)
      style.zIndex = this.zIndex
      if (this.fixed) style.position = "fixed"
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    },
    innerStyle() {
      const style = {}
      style.width = this.width + "%"
      style.height = useUnit(this.height)
      style.left = "-" + (this.width - 100) / 2 + "%"
      style.paddingLeft = (this.width - 100) / 2 + "%"
      style.paddingRight = (this.width - 100) / 2 + "%"
      style.background = useColor(this.background)
      return useStyle(style)
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-arc {
  width: 100%;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  &__inner {
    top: 0;
    overflow: hidden;
    position: absolute;
    border-radius: 0 0 50% 50%;
    background-color: var(--theme-color);
  }
}
</style>
