<template>
  <view class="zm-checkbox-group" :class="[wrapClass, customClass]" :style="[wrapStyle]">
    <slot></slot>
  </view>
</template>

<script>
import mixins from "../mixins"
import { useStyle } from "@/utils/style"
import { isBoolean, isFunction } from "../utils/check"

/**
 * @name zm-checkbox-group 复选框组
 * @description 复选框组组件用于展示一组复选框，并且可以根据需求进行设置样式和布局。
 * @prop {Array} value - 复选框的值，默认为 []
 * @prop {Number|String} max - 最大可选数量，默认为 Infinity
 * @prop {Number|String} gap - 复选框之间的间距，默认为 0
 * @prop {Boolean} disabled - 是否禁用复选框，默认为 false
 * @prop {Boolean} vertical - 是否垂直布局，默认为 false
 * @prop {String} icon - 图标名称，默认为 ""
 * @prop {Number|String} size - 图标大小，默认为 ""
 * @prop {Boolean} round - 是否为圆形复选框，默认为 false
 * @prop {String} checkedColor - 选中状态的颜色，默认为 ""
 * @prop {Number|String} iconSize - 图标大小，默认为 ""
 * @prop {String} iconColor - 图标颜色，默认为 ""
 * @prop {Number|String} iconWeight - 图标粗细，默认为 ""
 * @prop {Number|String} iconRadius - 图标圆角大小，默认为 ""
 * @prop {Number|String} labelSize - 标签文字大小，默认为 ""
 * @prop {String} labelColor - 标签文字颜色，默认为 ""
 * @prop {Number|String} labelWeight - 标签文字粗细，默认为 ""
 * @prop {Number|String} labelGap - 标签与复选框的间距，默认为 ""
 * @prop {Boolean} labelLeft - 标签是否在复选框左侧，默认为 false
 * @prop {Boolean} labelDisabled - 是否禁用标签，默认为 undefined
 * @prop {String} checkedLabelColor - 选中状态的标签颜色，默认为 ""
 * @prop {String} customClass - 自定义样式类名，默认为 ""
 * @prop {Object|String} customStyle - 自定义样式，默认为 {}
 */
export default {
  name: "zm-checkbox-group",
  mixins: [mixins],
  props: {
    value: { type: Array, default: () => [] },
    max: { type: [Number, String], default: Infinity },
    gap: { type: [Number, String], default: 0 },
    disabled: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
    icon: { type: String, default: "" },
    size: { type: [Number, String], default: "" },
    round: { type: Boolean, default: false },
    checkedColor: { type: String, default: "" },
    iconSize: { type: [Number, String], default: "" },
    iconColor: { type: String, default: "" },
    iconWeight: { type: [Number, String], default: "" },
    iconRadius: { type: [Number, String], default: "" },
    labelSize: { type: [Number, String], default: "" },
    labelColor: { type: String, default: "" },
    labelWeight: { type: [Number, String], default: "" },
    labelGap: { type: [String, Number], default: "" },
    labelLeft: { type: Boolean, default: false },
    labelDisabled: { type: Boolean },
    checkedIconColor: { type: String, default: "" },
    checkedLabelColor: { type: String, default: "" },
    customClass: { type: String, default: "" },
    customStyle: { type: [Object, String], default: () => ({}) }
  },
  data() {
    return {
      childrens: []
    }
  },
  computed: {
    wrapClass() {
      const list = []
      if (this.vertical) list.push("zm-checkbox-group--vertical")
      return list
    },
    wrapStyle() {
      const style = {}
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    }
  },
  watch: {
    $props: {
      handler() {
        this.updateChildrens()
      },
      deep: true
    }
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value)
      this.$emit("change", value)
    },
    updateChildren(children) {
      if (this.childrens.indexOf(children) >= 0) {
        this.childrens.splice(this.childrens.indexOf(children), 1)
      } else {
        this.childrens.push(children)
      }
    },
    // 更新所有子组件
    updateChildrens() {
      this.childrens.forEach((children) => {
        if (isFunction(children.update)) children.update()
      })
    },
    // 切换全部状态
    toggleAll(checked) {
      if (isBoolean(checked)) {
        if (checked) {
          const value = this.childrens.map((item) => item.name || item.index)
          this.$emit("input", value)
          this.$emit("change", value)
        } else {
          this.$emit("input", [])
          this.$emit("change", [])
        }
      } else {
        const value = []
        this.childrens.forEach((children) => {
          if (!this.value.includes(children.name || children.index)) {
            value.push(children.name || children.index)
          }
        })
        this.$emit("input", value)
        this.$emit("change", value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-checkbox-group {
  display: flex;
  &--vertical {
    flex-direction: column;
  }
}
</style>
