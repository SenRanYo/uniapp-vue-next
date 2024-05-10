<template>
  <view class="zm-checkbox" :class="[wrapClass, customClass]" :style="[wrapStyle]" @click="onClick">
    <view class="zm-checkbox__icon" @click.stop="onClickIcon">
      <slot name="icon">
        <view class="zm-checkbox__icon__default" :class="{ 'is-round': round, 'is-checked': isChecked }" :style="[iconDefaultStyle]">
          <text class="zm-icon" :class="[iconClass]" :style="[iconStyle]"></text>
        </view>
      </slot>
    </view>
    <view v-if="$slots.default" class="zm-checkbox__label" @click.stop="onClickLabel">
      <slot></slot>
    </view>
  </view>
</template>

<script>
/**
 * @name zm-checkbox  复选框组件
 * @prop {Boolean} value - 是否选中，默认为 false
 * @prop {Number|String} name - 复选框的名称，默认为空字符串
 * @prop {Boolean} bindGroup - 是否绑定到组，默认为 true
 * @prop {Number|String} max - 最大可选数量，默认为无限大
 * @prop {Boolean} disabled - 是否禁用，默认为 false
 * @prop {String} icon - 图标名称，默认为 "success"
 * @prop {Number|String} size - 复选框尺寸，默认为空字符串
 * @prop {Boolean} round - 是否圆角，默认为 false
 * @prop {String} checkedColor - 选中状态的颜色，默认为空字符串
 * @prop {Number|String} iconSize - 图标尺寸，默认为空字符串
 * @prop {String} iconColor - 图标颜色，默认为空字符串
 * @prop {Number|String} iconWeight - 图标粗细，默认为空字符串
 * @prop {String} iconPrefix - 图标前缀，默认为 "zm-icon"
 * @prop {Number|String} labelSize - 标签尺寸，默认为空字符串
 * @prop {String} labelColor - 标签颜色，默认为空字符串
 * @prop {Number|String} labelWeight - 标签粗细，默认为空字符串
 * @prop {String|Number} labelGap - 标签与复选框之间的间距，默认为空字符串
 * @prop {Boolean} labelLeft - 是否将标签放在复选框左侧，默认为 false
 * @prop {Boolean} labelDisabled - 是否禁用标签
 * @prop {String} checkedLabelColor - 选中状态下的标签颜色，默认为空字符串
 * @prop {String} customClass - 自定义类名，默认为空字符串
 * @prop {Object|String} customStyle - 自定义样式，默认为一个空对象
 */
import mixins from "../mixins"
import { isBoolean } from "../utils/check"
import { useStyle, useUnit, useColor } from "../utils/style"
export default {
  name: "zm-checkbox",
  mixins: [mixins],
  props: {
    value: { type: Boolean, default: false },
    name: { type: [Number, String], default: "" },
    bindGroup: { type: Boolean, default: true },
    max: { type: [Number, String], default: Infinity },
    disabled: { type: Boolean, default: false },
    icon: { type: String, default: "check" },
    size: { type: [Number, String], default: "" },
    round: { type: Boolean, default: false },
    checkedColor: { type: String, default: "" },
    iconSize: { type: [Number, String], default: "" },
    iconColor: { type: String, default: "#c8c9cc" },
    iconWeight: { type: [Number, String], default: "" },
    iconPrefix: { type: String, default: "zm-icon" },
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
      index: -1,
      checkboxGroup: null
    }
  },
  computed: {
    // 类名
    wrapClass() {
      const list = []
      if (this.isChecked) list.push("zm-checkbox--checked")
      if (this.checkboxGroup?.disabled || this.disabled) list.push("zm-checkbox--disabled")
      if (this.checkboxGroup?.labelLeft || this.labelLeft) list.push("zm-checkbox--left")
      return list
    },
    // 样式
    wrapStyle() {
      const style = {}
      style.fontSize = useUnit(this.checkboxGroup?.size || this.size)
      if (this.checkboxGroup?.iconColor || this.iconColor) {
        style["--zm-checkbox-icon-color"] = useColor(this.checkboxGroup?.iconColor || this.iconColor)
      }
      if (this.checkboxGroup?.checkedIconColor || this.checkedIconColor) {
        style["--zm-checkbox-checked-icon-color"] = useColor(this.checkboxGroup?.checkedIconColor || this.checkedIconColor)
      }
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    },
    // icon类名
    iconClass() {
      const list = []
      if (this.checkboxGroup?.round || this.round) list.push("zm-icon--round")
      if (this.checkboxGroup?.icon || this.icon) list.push(`${this.iconPrefix}-${this.icon}`)
      return list
    },
    iconDefaultStyle() {
      const style = {}
      style.color = useColor(this.checkboxGroup?.iconColor || this.iconColor)
      style.fontSize = useUnit(this.checkboxGroup?.iconSize || this.iconSize)
      style.fontWeight = this.checkboxGroup?.iconWeight || this.iconWeight
      if (!this.checkboxGroup?.round || !this.round) {
        style.borderRadius = this.checkboxGroup?.iconRadius || this.iconRadius
      }
      if (this.value) {
        style.borderColor = useColor(this.checkboxGroup?.checkedColor || this.checkedColor)
      }
      if (this.isChecked) {
        style.borderColor = useColor(this.checkboxGroup?.checkedIconColor || this.checkedIconColor)
        style.backgroundColor = useColor(this.checkboxGroup?.checkedIconColor || this.checkedIconColor)
      }
      return useStyle(style)
    },
    // icon样式
    iconStyle() {
      const style = {}
      if (this.value) {
        style.background = useColor(this.checkboxGroup?.checkedColor || this.checkedColor)
      }
      return useStyle(style)
    },
    // label样式
    labelStyle() {
      const style = {}
      style.color = useColor(this.checkboxGroup?.labelColor || this.labelColor)
      style.fontSize = useUnit(this.checkboxGroup?.labelSize || this.labelSize)
      style.fontWeight = this.checkboxGroup?.labelWeight || this.labelWeight
      if (this.value && (this.checkboxGroup?.checkedLabelColor || this.checkedLabelColor)) {
        style.color = useColor(this.checkboxGroup?.checkedLabelColor || this.checkedLabelColor)
      }
      if (this.labelGap) {
        this.labelLeft ? (style.marginRight = useUnit(this.checkboxGroup?.labelGap || this.labelGap)) : (style.marginLeft = useUnit(this.checkboxGroup?.labelGap || this.labelGap))
      }
      return useStyle(style)
    },
    iconInnerStyle() {
      const style = {}
      return useStyle(style)
    },
    isChecked() {
      if (this.bindGroup && this.checkboxGroup) {
        return this.checkboxGroup?.value?.includes(this.name || this.index)
      } else {
        return this.value
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.$emit("change", val)
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.checkboxGroup = this.useParent("zm-checkbox-group")
      if (this.checkboxGroup) {
        this.checkboxGroup.updateChildren(this)
        this.checkboxGroup = this.useParent("zm-checkbox-group")
        this.index = this.checkboxGroup.childrens.indexOf(this)
      }
    },
    update() {
      this.checkboxGroup = this.useParent("zm-checkbox-group")
    },
    // 切换状态
    toggle(check) {
      // 如果当前组件或者父组件禁用，则直接返回
      if (this.disabled || this.checkboxGroup?.disabled) return
      // 如果当前组件和父组件绑定，则根据当前组件的value属性，更新父组件的value
      if (this.checkboxGroup && this.bindGroup) {
        const value = [...this.checkboxGroup.value]
        const index = value.indexOf(this.name || this.index)
        const add = () => {
          // 如果当前组件的value属性为false，则将当前组件的name添加到value中
          const isMax = this.checkboxGroup.max && value.length >= this.checkboxGroup.max
          if (!isMax && !value.includes(this.name || this.index)) {
            value.push(this.name || this.index)
            this.checkboxGroup.updateValue(value)
          }
        }
        const remove = () => {
          if (index !== -1) {
            value.splice(index, 1)
            this.checkboxGroup.updateValue(value)
          }
        }
        if (isBoolean(check)) {
          if (check) add()
          else remove()
        } else if (index >= 0) {
          remove()
        } else {
          add()
        }
      } else {
        // 如果当前组件和父组件没有绑定，则触发input事件
        this.$emit("input", !this.value)
      }
    },
    onClick() {
      if (this.checkboxGroup?.labelDisabled || this.labelDisabled) return
      this.toggle()
      this.$emit("click")
    },
    onClickIcon() {
      this.toggle()
      this.$emit("click")
    },
    onClickLabel() {
      if (this.checkboxGroup?.labelDisabled || this.labelDisabled) return
      this.toggle()
      this.$emit("click")
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-checkbox {
  display: flex;
  user-select: none;

  &--disabled {
    .zm-checkbox__icon {
      background-color: #ebedf0;
      .zm-icon {
        color: #c8c9cc;
        border-color: #c8c9cc;
        background-color: #ebedf0;
      }
    }
  }

  &__icon {
    position: relative;
    transition: all 0.3s;
    flex: 0;
    &__default {
      display: flex;
      transition: all 0.3s;
      border: 2rpx solid var(--zm-checkbox-icon-color);
      &.is-round {
        border-radius: 999px;
      }
      &.is-checked {
        border-color: var(--theme-color);
        background-color: var(--theme-color);
        .zm-icon {
          opacity: 1;
          transform: scale(1);
          transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
        }
      }
    }
    .zm-icon {
      width: 1em;
      height: 1em;
      opacity: 0;
      padding: 2rpx;
      line-height: 1;
      color: #ffffff;
      transform: scale(0);
      border-radius: inherit;
      box-sizing: content-box;
      transition:
        all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),
        opacity 0.1s;
    }
  }

  &__label {
    flex: 1;
    margin-left: 8rpx;
  }

  &--left {
    flex-direction: row-reverse;

    .zm-checkbox__label {
      margin-left: 0;
      margin-right: 8rpx;
    }
  }
}
</style>
