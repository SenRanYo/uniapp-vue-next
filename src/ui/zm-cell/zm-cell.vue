<template>
  <view class="zm-cell" :class="[wrapClass]" :hover-class="wrapHoverClass" :hover-stay-time="50" :style="[wrapStyle]" @click="onClick">
    <slot name="icon">
      <view v-if="icon" class="zm-cell__icon">
        <zm-icon :name="icon" :size="iconStyle.size" :color="iconStyle.color" :weight="iconStyle.weight" :custom-prefix="iconPrefix"></zm-icon>
      </view>
    </slot>
    <view class="zm-cell__left">
      <slot name="title">
        <text v-if="title" class="zm-cell__title" :style="[titleStyle]">{{ title }}</text>
      </slot>
      <slot name="description">
        <text v-if="description" class="zm-cell__description" :style="[descriptionStyle]">{{ description }}</text>
      </slot>
    </view>
    <view class="zm-cell__right">
      <slot name="content">
        <text v-if="content" class="zm-cell__content" :style="[contentStyle]">{{ content }}</text>
      </slot>
      <slot name="right-icon">
        <zm-icon v-if="isLink && rightIcon" :name="rightIcon" :size="rightIconStyle.size" :color="rightIconStyle.color" :weight="rightIconStyle.weight" :custom-prefix="iconPrefix"></zm-icon>
      </slot>
    </view>
  </view>
</template>

<script>
/**
 * @name zm-cell 单元格
 * @description 可定制属性的可重用单元格组件。
 * @prop {String|Number} title - 单元格的标题。
 * @prop {String|Number} description - 单元格的描述。
 * @prop {String|Number} content - 单元格的内容。
 * @prop {String|Number} height - 单元格的高度。
 * @prop {String|Number} padding - 单元格的内边距。
 * @prop {String} background - 单元格的背景颜色。
 * @prop {String} icon - 单元格的图标。
 * @prop {String|Number} iconSize - 图标的大小。
 * @prop {String} iconColor - 图标的颜色。
 * @prop {String|Number} iconWeight - 图标的粗细。
 * @prop {String} iconPrefix - 图标的前缀。
 * @prop {String} url - 单元格的链接地址。
 * @prop {String} linkType - 导航链接的类型。
 * @prop {Boolean} border - 是否显示单元格的边框。
 * @prop {String} borderColor - 边框的颜色。
 * @prop {String} borderWidth - 边框的宽度。
 * @prop {String} borderStyle - 边框的样式。
 * @prop {Boolean} clickable - 单元格是否可点击。
 * @prop {Boolean} isLink - 单元格是否为链接。
 * @prop {Boolean} center - 是否居中对齐单元格。
 * @prop {String|Number} titleSize - 标题的大小。
 * @prop {String} titleColor - 标题的颜色。
 * @prop {String|Number} titleWeight - 标题的粗细。
 * @prop {String|Number} descriptionSize - 描述的大小。
 * @prop {String} descriptionColor - 描述的颜色。
 * @prop {String|Number} descriptionWeight - 描述的粗细。
 * @prop {String|Number} contentSize - 内容的大小。
 * @prop {String} contentColor - 内容的颜色。
 * @prop {String|Number} contentWeight - 内容的粗细。
 * @prop {String} rightIcon - 单元格的右侧图标。
 * @prop {String|Number} rightIconSize - 右侧图标的大小。
 * @prop {String} rightIconColor - 右侧图标的颜色。
 * @prop {String} rightIconWeight - 右侧图标的粗细。
 */

import mixins from "../mixins"
import { useStyle, useColor, useUnit } from "../utils/style"
export default {
  name: "zm-cell",
  mixins: [mixins],
  props: {
    title: { type: [String, Number], default: "" },
    description: { type: [String, Number], default: "" },
    content: { type: [String, Number], default: "" },
    height: { type: [String, Number], default: "" },
    padding: { type: [String, Number], default: "" },
    background: { type: String, default: "" },
    icon: { type: String, default: "" },
    iconSize: { type: [String, Number], default: "" },
    iconColor: { type: String, default: "" },
    iconWeight: { type: [String, Number], default: "" },
    iconPrefix: { type: String, default: "" },
    url: { type: String, default: "" },
    linkType: { type: String, default: "navigateTo" },
    border: { type: Boolean, default: false },
    borderColor: { type: String, default: "" },
    borderWidth: { type: String, default: "" },
    borderStyle: { type: String, default: "" },
    clickable: { type: Boolean, default: true },
    isLink: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    titleSize: { type: [String, Number], default: "" },
    titleColor: { type: String, default: "" },
    titleWeight: { type: [String, Number], default: "" },
    descriptionSize: { type: [String, Number], default: "" },
    descriptionColor: { type: String, default: "" },
    descriptionWeight: { type: [String, Number], default: "" },
    contentSize: { type: [String, Number], default: "" },
    contentColor: { type: String, default: "" },
    contentWeight: { type: [String, Number], default: "" },
    rightIcon: { type: String, default: "arrow" },
    rightIconSize: { type: [String, Number], default: "" },
    rightIconColor: { type: String, default: "" },
    rightIconWeight: { type: String, default: "" },
    customClass: { type: String, default: "" },
    customStyle: { type: [Object, String], default: () => ({}) }
  },
  data() {
    return {
      index: -1,
      cellGroup: null
    }
  },
  computed: {
    wrapStyle() {
      let style = {}
      style.height = useUnit(this.height)
      style.padding = useUnit(this.padding)
      style.background = useColor(this.background)
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    },
    wrapClass() {
      const list = []
      const state = ["center", "clickable"]
      state.forEach((state) => this[state] && list.push(`zm-cell--${state}`))
      if (this.cellGroup?.border || this.border) {
        if (!this.border && this.index === this.cellGroup.childrens.length - 1) return
        list.push("zm-cell--border")
      }
      return list
    },
    wrapHoverClass() {
      return ((this.clickable || this.isLink) && "zm-cell--active") || "none"
    },
    iconStyle() {
      return {
        color: useColor(this.cellGroup?.iconColor || this.iconColor),
        size: useUnit(this.cellGroup?.iconSize || this.iconSize),
        weight: this.cellGroup?.iconWeight || this.iconWeight
      }
    },
    rightIconStyle() {
      return {
        color: useColor(this.cellGroup?.rightIconColor || this.rightIconColor),
        size: useUnit(this.cellGroup?.rightIconSize || this.rightIconSize),
        weight: this.cellGroup?.rightIconWeight || this.rightIconWeight
      }
    },
    titleStyle() {
      let style = {}
      style.color = useColor(this.cellGroup?.titleColor || this.titleColor)
      style.fontSize = useUnit(this.cellGroup?.titleSize || this.titleSize)
      style.fontWeight = this.cellGroup?.titleWeight || this.titleWeight
      return useStyle(style)
    },
    descriptionStyle() {
      let style = {}
      style.color = useColor(this.cellGroup?.descriptionColor || this.descriptionColor)
      style.fontSize = useUnit(this.cellGroup?.descriptionSize || this.descriptionSize)
      style.fontWeight = this.cellGroup?.descriptionWeight || this.descriptionWeight
      return useStyle(style)
    },
    contentStyle() {
      let style = {}
      style.color = useColor(this.cellGroup?.contentColor || this.contentColor)
      style.fontSize = useUnit(this.cellGroup?.contentSize || this.contentSize)
      style.fontWeight = this.cellGroup?.contentWeight || this.contentWeight
      return useStyle(style)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.cellGroup = this.useParent("zm-cell-group")
      if (this.cellGroup) {
        this.cellGroup.updateChildren(this)
        this.cellGroup = this.useParent("zm-cell-group")
        this.index = this.cellGroup.childrens.indexOf(this)
      }
    },
    onClick() {
      if (this.url) {
        if (uni[this.linkType]) {
          uni[this.linkType]({
            url: this.url
          })
        }
      } else {
        this.$emit("click")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-cell {
  --zm-cell-border-color: #eeeeee;
  --zm-cell-border-width: 1rpx;

  display: flex;
  position: relative;
  padding: 12rpx 24rpx;
  background: #ffffff;
  vertical-align: middle;

  &::before {
    top: 50%;
    left: 50%;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: inherit;
    position: absolute;
    background: #000000;
    border-color: #000000;
    border-radius: inherit;
    transform: translate(-50%, -50%);
  }

  &__icon {
    display: flex;
    margin-right: 8rpx;
  }

  &__left {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  &__title {
    font-size: 28rpx;
  }

  &__description {
    color: #909399;
    font-size: 24rpx;
  }

  &--center {
    align-items: center;
  }

  &__right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__content {
    color: #909399;
    font-size: 28rpx;
    margin-right: 16rpx;
    white-space: nowrap;
  }

  &--border::after {
    left: 24rpx;
    right: 24rpx;
    bottom: 0;
    content: "";
    position: absolute;
    pointer-events: none;
    border-bottom: var(--zm-cell-border-width) solid var(--zm-cell-border-color);
  }

  &--active::before {
    content: "";
    opacity: 0.05;
  }
}
</style>
