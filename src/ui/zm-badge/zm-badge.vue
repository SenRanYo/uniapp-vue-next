<template>
  <view class="zm-badge">
    <view class="zm-badge__inner" :class="[innerClass]" :style="[innerStyle]">
      <slot name="content">
        <zm-icon v-if="isShowIcon" :name="icon"></zm-icon>
        <view v-else class="zm-badge__value" :style="[valueStyle]">{{ formatValue }}</view>
      </slot>
    </view>
    <slot></slot>
  </view>
</template>

<script>
/**
 * @name zm-badge 徽章组件
 * @description 一个徽章组件，用于显示小型通知或指示器。
 * @props {String} value - 徽章中显示的值。默认为空字符串。
 * @props {Boolean} dot - 是否显示圆点徽章。默认为false。
 * @props {String} icon - 徽章中显示的图标名称。默认为空字符串。
 * @props {String} color - 徽章的背景颜色。默认为空字符串。
 * @props {String|Number} dotSize - 圆点徽章的大小。默认为空字符串。
 * @props {String|Number} max - 徽章中显示的最大值。默认为"99"。
 * @props {Boolean} showZero - 当值为零时是否显示徽章。默认为false。
 * @props {String|Number} height - 徽章的高度。默认为空字符串。
 * @props {String|Number} radius - 徽章的边框半径。默认为空字符串。
 * @props {String|Number|Array} offset - 徽章的偏移量。默认为空字符串。
 * @props {String} position - 徽章的位置。默认为空字符串。
 * @props {String|Number} fontSize - 徽章值的字体大小。默认为空字符串。
 * @props {String} fontColor - 徽章值的字体颜色。默认为空字符串。
 * @props {String|Number} fontWeight - 徽章值的字体粗细。默认为空字符串。
 * @props {String} customClass - 徽章的自定义CSS类。默认为空字符串。
 * @props {String|Object} customStyle - 徽章的自定义CSS样式。默认为空字符串。
 */

import mixins from "../mixins"
import { isNumber } from "../utils/check"
import { useStyle, useUnit, useColor } from "../utils/style"
export default {
  name: "zm-component",
  mixins: [mixins],
  props: {
    value: { type: String, default: "" },
    dot: { type: Boolean, default: false },
    icon: { type: String, default: "" },
    color: { type: String, default: "" },
    dotSize: { type: [String, Number], default: "" },
    max: { type: [String, Number], default: "99" },
    showZero: { type: Boolean, default: false },
    height: { type: [String, Number], default: "" },
    radius: { type: [String, Number], default: "" },
    offset: { type: [String, Number, Array], default: "" },
    position: { type: String, default: "" },
    fontSize: { type: [String, Number], default: "" },
    fontColor: { type: String, default: "" },
    fontWeight: { type: [String, Number], default: "" },
    customClass: { type: String, default: "" },
    customStyle: { type: [String, Object], default: "" }
  },
  data() {
    return {}
  },
  computed: {
    style() {
      const style = {}
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    },
    innerClass() {
      const list = []
      list.push(`zm-badge__inner--${this.position}`)
      this.dot && list.push("zm-badge__inner--dot")
      this.$slots.default && list.push("zm-badge__inner--absolute")
      return list
    },
    innerStyle() {
      const style = {}
      style.background = useColor(this.color)
      if (this.dot) {
        style.width = useUnit(this.dotSize)
        style.height = useUnit(this.dotSize)
      } else {
        style.height = useUnit(this.height)
        style.minWidth = useUnit(this.height)
        style.borderRadius = useUnit(this.radius)
      }
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    },
    valueStyle() {
      let style = {}
      style.color = useColor(this.fontColor)
      style.fontSize = useUnit(this.fontSize)
      style.fontWeight = this.fontWeight
      style.paddingLeft = `calc(${useUnit(this.size)} / 3.7)`
      style.paddingRight = `calc(${useUnit(this.size)} / 3.7)`
      return useStyle(style)
    },
    formatValue() {
      if (isNumber(this.value) && isNumber(this.max)) {
        return Number(this.value) > Number(this.max) ? this.max + "+" : this.value
      }
      return this.value
    },
    isShow() {
      return this.dot || this.icon || (Number(this.value) === 0 ? this.showZero : true)
    },
    isShowIcon() {
      return this.icon && !this.dot
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.zm-badge {
  position: relative;
  &__inner {
    display: flex;
    color: #ffffff;
    font-size: 24rpx;
    padding: 4rpx 8rpx;
    min-width: 1em;
    min-height: 1em;
    line-height: 1em;
    align-items: center;
    border-radius: 999px;
    justify-content: center;
    background-color: #ee0b24;
    &--absolute {
      top: 0;
      right: 0;
      position: absolute;
      transform-origin: 100%;
      transform: translate(50%, -50%);
    }
  }
}
</style>
