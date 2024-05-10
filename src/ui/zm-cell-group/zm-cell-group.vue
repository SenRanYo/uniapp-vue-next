<template>
  <view class="zm-cell-group" :class="[customClass]" :style="[wrapStyle]">
    <slot></slot>
  </view>
</template>

<script>
/**
 * @name zm-cell-group 单元格组
 * @description 用于分组具有可自定义样式的单元格的组件。
 * @prop {String|Number} titleSize - 标题的大小。默认为空字符串。
 * @prop {String} titleColor - 标题的颜色。默认为空字符串。
 * @prop {String|Number} titleWeight - 标题的字重。默认为空字符串。
 * @prop {String|Number} iconSize - 图标的大小。默认为空字符串。
 * @prop {String} iconColor - 图标的颜色。默认为空字符串。
 * @prop {String|Number} iconWeight - 图标的字重。默认为空字符串。
 * @prop {String|Number} rightIconSize - 右侧图标的大小。默认为空字符串。
 * @prop {String} rightIconColor - 右侧图标的颜色。默认为空字符串。
 * @prop {String} rightIconWeight - 右侧图标的字重。默认为空字符串。
 * @prop {String|Number} descriptionSize - 描述的大小。默认为空字符串。
 * @prop {String} descriptionColor - 描述的颜色。默认为空字符串。
 * @prop {String|Number} descriptionWeight - 描述的字重。默认为空字符串。
 * @prop {String|Number} contentSize - 内容的大小。默认为空字符串。
 * @prop {String} contentColor - 内容的颜色。默认为空字符串。
 * @prop {String|Number} contentWeight - 内容的字重。默认为空字符串。
 * @prop {Boolean} border - 是否显示边框。默认为true。
 * @prop {String|Number} borderRadius - 边框的圆角半径。默认为空字符串。
 * @prop {String} background - 背景颜色。默认为空字符串。
 */

import mixins from "../mixins"
import { isFunction } from "../utils/check"
import { useStyle, useColor, useUnit } from "../utils/style"
export default {
  name: "zm-cell-group",
  mixins: [mixins],
  props: {
    titleSize: { type: [String, Number], default: "" },
    titleColor: { type: String, default: "" },
    titleWeight: { type: [String, Number], default: "" },
    iconSize: { type: [String, Number], default: "" },
    iconColor: { type: String, default: "" },
    iconWeight: { type: [String, Number], default: "" },
    rightIconSize: { type: [String, Number], default: "" },
    rightIconColor: { type: String, default: "" },
    rightIconWeight: { type: String, default: "" },
    descriptionSize: { type: [String, Number], default: "" },
    descriptionColor: { type: String, default: "" },
    descriptionWeight: { type: [String, Number], default: "" },
    contentSize: { type: [String, Number], default: "" },
    contentColor: { type: String, default: "" },
    contentWeight: { type: [String, Number], default: "" },
    border: { type: Boolean, default: true },
    borderRadius: { type: [String, Number], default: "" },
    background: { type: String, default: "" },
    customClass: { type: String, default: "" },
    customStyle: { type: [Object, String], default: () => ({}) }
  },
  data() {
    return {
      childrens: []
    }
  },
  computed: {
    wrapStyle() {
      let style = {}
      style.background = useColor(this.background)
      style.borderRadius = useUnit(this.borderRadius)
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
        if (isFunction(children.init)) children.init()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-cell-group {
  display: flex;
  overflow: hidden;
  position: relative;
  border-radius: 16rpx;
  flex-direction: column;
  background-color: #ffffff;
}
</style>
