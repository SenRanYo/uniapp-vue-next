<template>
  <view class="zm-col" :style="[wrapStyle]"><slot></slot></view>
</template>

<script>
import mixins from "../mixins"
import { isNumber, isString, isNoEmpty } from "../utils/check"
import { useStyle, useUnit, useUnitToPx } from "../utils/style"
export default {
  name: "zm-col",
  mixins: [mixins],
  props: {
    // 栅格占据的列数
    span: {
      type: [String, Number],
      default: ""
    },
    // 栅格左侧的间隔格数
    offset: {
      type: [String, Number],
      default: ""
    },
    // 水平排列方式
    justify: {
      type: String,
      default: ""
    },
    // 垂直排列方式
    align: {
      type: String,
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
    return {
      row: null,
      show: false
    }
  },
  computed: {
    wrapStyle() {
      let style = {}
      // #ifdef H5 || APP-PLUS || MP-WEIXIN
      style.flex = `0 0 ${(100 / 24) * Math.min(24, +this.span)}%`
      style.marginLeft = isNumber(this.offset) ? `${(100 / 24) * this.offset}%` : isString(this.offset) ? useUnit(this.offset) : 0
      // #endif
      // #ifndef H5 || APP-PLUS || MP-WEIXIN
      if (this.row) {
        style.width = `${(this.row.width / 24) * this.span}px`
        style.marginLeft = isNumber(this.offset) ? `${(this.row.width / 24) * this.offset}px` : isString(this.offset) ? `${useUnitToPx(this.offset)}px` : 0
      }
      // #endif
      if (this.row) style.padding = `${useUnitToPx(this.row.gap || this.row.rowGap) / 2}px ${useUnitToPx(this.row.gap || this.row.colGap) / 2}px`
      switch (this.justify) {
        case "start":
        case "end":
          style.justifyContent = `flex-${this.justify}`
          break
        case "around":
        case "between":
          style.justifyContent = `space-${this.justify}`
          break
        default:
          style.justifyContent = this.justify
          break
      }
      switch (this.align) {
        case "top":
          style.alignItems = "flex-start"
          break
        case "bottom":
          style.alignItems = "flex-end"
          break
        default:
          style.alignItems = this.align
          break
      }
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    }
  },
  watch: {
    $props: {
      handler() {
        if (this.row) this.row.setChildren(this)
      },
      deep: true
    }
  },
  mounted() {
    this.update()
  },
  methods: {
    async update() {
      this.row = this.useParent("zm-row")
      if (isNoEmpty(this.row)) this.row.setChildren(this)
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-col {
  display: flex;
}
</style>
