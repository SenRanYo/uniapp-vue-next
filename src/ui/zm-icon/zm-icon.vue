<template>
  <image
    v-if="isImage"
    :class="[iconPrefix, `${iconPrefix}-${name}`, customClass, isHover ? hoverClass : '']"
    :style="[imageStyle]"
    :src="name"
    :mode="imageMode"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @mousedown="onTouchStart"
    @mouseup="onTouchEnd"
    @click="onClick"
  />
  <text
    v-else
    :class="[iconPrefix, `${iconPrefix}-${name}`, customClass, isHover ? hoverClass : '']"
    :style="[iconStyle]"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @mousedown="onTouchStart"
    @mouseup="onTouchEnd"
    @click="onClick"
  ></text>
</template>

<script>
import mixins from "../mixins"
import { merge } from "../utils/utils"
import { useStyle, useUnit, useColor } from "../utils/style"
export default {
  name: "zm-icon",
  mixins: [mixins],
  props: {
    // 图标名称或者图片地址
    name: {
      type: [String, null],
      default: ""
    },
    // 图标大小
    size: {
      type: [String, Number],
      default: ""
    },
    // 图标颜色
    color: {
      type: [String, null],
      default: ""
    },
    // 图标圆角
    radius: {
      type: [String, Number],
      default: ""
    },
    // 图标粗细
    weight: {
      type: [String, null],
      default: ""
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
    // 激活时的类名
    hoverClass: {
      type: String,
      default: "zm-icon--hover"
    },
    // 激活时的样式
    hoverStyle: {
      type: [String, Object],
      default: () => ({})
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
    return {
      isHover: false
    }
  },
  computed: {
    iconPrefix() {
      return this.customPrefix || "zm-icon"
    },
    iconStyle() {
      let style = {}
      style.color = useColor(this.color)
      style.fontSize = useUnit(this.size)
      style.fontWeight = this.weight
      style.borderRadius = useUnit(this.radius)
      style.background = useColor(this.background)
      if (this.isHover) {
        style = merge(style, useStyle(this.hoverStyle))
      }
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    },
    // 图片样式
    imageStyle() {
      const style = {}
      style.width = useUnit(this.width || this.size)
      style.height = useUnit(this.height || this.size)
      style.background = useColor(this.background)
      style.borderRadius = useUnit(this.radius)
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    },

    // 是否为图片
    isImage() {
      return /\.(jpeg|jpg|gif|png|bmp|webp)$/i.test(this.name)
    }
  },
  methods: {
    onClick() {
      this.$emit("click")
    },
    onTouchStart() {
      this.isHover = true
    },
    onTouchEnd() {
      this.isHover = false
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-icon {
  font-size: inherit;
  will-change: transform;
}
</style>
