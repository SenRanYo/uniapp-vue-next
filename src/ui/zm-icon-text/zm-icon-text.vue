<template>
  <view class="zm-icon-text" :class="[wrapClass, customClass]" :style="[wrapStyle]" @click="onClick">
    <zm-icon :name="name" :size="size" :color="color" :radius="radius" :weight="weight" :custom-prefix="customPrefix"></zm-icon>
    <text v-if="text" class="icon-text" :style="[textStyle]">{{ text }}</text>
  </view>
</template>

<script>
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
import { useStyle, useUnit, useColor } from "@/utils/style"
/**
 * @name zm-icon 图标组件
 * @description 图标组件，支持字体图标和图片两种类型，可设置图标大小、颜色、圆角、粗细、文本等属性
 * @prop {String} name 图标名称或者图片地址
 * @prop {String|Number} size 图标大小
 * @prop {String} color 图标颜色
 * @prop {String|Number} radius 图标圆角
 * @prop {String} weight 图标粗细
 * @prop {String|Number} text 文本
 * @prop {String|Number} textSize 文本大小
 * @prop {String} textWeight 文本粗细
 * @prop {String} textColor 文本颜色
 * @prop {String|Number} textGap 文本间距
 * @prop {Boolean} textLeft 文本是否在图标左侧
 * @prop {String|Number} width 图标为图片时的宽度
 * @prop {String|Number} height 图标为图片时的高度
 * @prop {String} imageMode 图标为图片时的显示模式
 * @prop {String} background 背景颜色
 * @prop {String} customPrefix 自定义图标名称前缀
 * @prop {String|Array|Object} customClass 自定义类名
 * @prop {String|Object} customStyle 自定义样式
 */
export default {
  name: "zm-icon-text",
  mixins: [hook, weixin],
  props: {
    // 图标名称或者图片地址
    name: {
      type: String,
      default: ""
    },
    // 图标大小
    size: {
      type: [String, Number],
      default: ""
    },
    // 图标颜色
    color: {
      type: String,
      default: ""
    },
    // 图标圆角
    radius: {
      type: [String, Number],
      default: ""
    },
    // 图标粗细
    weight: {
      type: String,
      default: ""
    },
    // 文本
    text: {
      type: [String, Number],
      default: ""
    },
    // 文本大小
    textSize: {
      type: [String, Number],
      default: ""
    },
    // 文本粗细
    textWeight: {
      type: String,
      default: ""
    },
    // 文本颜色
    textColor: {
      type: String,
      default: ""
    },
    // 文本间距
    textGap: {
      type: [String, Number],
      default: ""
    },
    // 文本是否在图标左侧
    textLeft: {
      type: Boolean,
      default: false
    },
    // 图标为图片时的宽度
    width: {
      type: [String, Number],
      default: ""
    },
    // 图标为图片时的高度
    height: {
      type: [String, Number],
      default: ""
    },
    // 图标为图片时的显示模式
    imageMode: {
      type: String,
      default: "scaleToFill"
    },
    // 背景颜色
    background: {
      type: String,
      default: ""
    },
    // 自定义图标名称前缀
    customPrefix: {
      type: String,
      default: "zm-icon"
    },
    // 自定义类名
    customClass: {
      type: [String, Array, Object],
      default: ""
    },
    // 自定义样式
    customStyle: {
      type: [String, Object],
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  computed: {
    wrapStyle() {
      const style = {}
      style.borderRadius = useUnit(this.radius)
      style.background = useColor(this.background)
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    },
    wrapClass() {
      const list = []
      if (this.textLeft) list.push("zm-icon-text--left")
      return list
    },
    // 文本样式
    textStyle() {
      const style = {}
      style.color = useColor(this.textColor)
      style.fontSize = useUnit(this.textSize)
      style.fontWeight = this.textWeight
      if (this.textGap) {
        if (this.textLeft) style.marginRight = useUnit(this.textGap)
        else style.marginLeft = useUnit(this.textGap)
      }
      if (this.textLeft) {
        style.marginLeft = "0"
      }
      return useStyle(style)
    }
  },
  methods: {
    onClick() {
      this.$emit("click")
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-icon-text {
  overflow: hidden;
  display: inline-flex;
  font-size: inherit;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  &--left {
    flex-direction: row-reverse;
    .zm-icon-text__text {
      margin-left: 0;
      margin-right: 8rpx;
    }
  }
  .icon-text {
    margin-left: 8rpx;
  }
}
</style>
