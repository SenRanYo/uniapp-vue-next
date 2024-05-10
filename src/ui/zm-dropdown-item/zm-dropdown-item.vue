<template>
  <view class="zm-dropdown-item" :style="[dropdownItemStyle]">
    <block v-if="mode === 'option'">
      <zm-overlay v-if="overlay" :show="active" :duration="duration" :custom-style="overlayTransitionStyle" @click="onClickOverlay"></zm-overlay>
      <zm-transition
        timing-function="ease-out"
        :show="active"
        :duration="duration"
        :mode="_direction"
        :custom-style="contentTransitionStyle"
        @open="onOpen"
        @close="onClose"
        @opened="onOpened"
        @closed="onClosed"
        @touchmove.prevent.stop="noop"
      >
        <view class="zm-dropdown-item__content" :style="[contentStyle]">
          <slot name="header"></slot>
          <scroll-view scroll-y enable-flex :style="[scrollViewStyle]">
            <slot>
              <view v-if="mode === 'option'" class="zm-dropdown-item__content__options">
                <view
                  v-for="(option, index) in options"
                  :key="index"
                  class="zm-dropdown-item__content__option"
                  :style="[optionStyle(index)]"
                  :class="{ 'is-active': modelValue === option[valueField] }"
                  @click="onClickOption(option)"
                >
                  <text class="zm-dropdown-item__content__option__label" :style="[labelStyle]">{{ option[labelField] }}</text>
                  <view class="zm-dropdown-item__content__option__icon">
                    <zm-icon v-if="modelValue === option[valueField]" :name="option[iconField] || 'success'" :size="optionIconSize" :bold="optionIconBold"></zm-icon>
                  </view>
                </view>
              </view>
            </slot>
          </scroll-view>
          <slot name="footer"></slot>
        </view>
      </zm-transition>
    </block>
  </view>
</template>

<script>
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
import { isNoEmpty, isBoolean } from "@/utils/check"
import { useStyle, useColor, useUnit } from "@/utils/style"
export default {
  name: "zm-dropdown-item",
  mixins: [hook, weixin],
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ""
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 模式 option 选项模式 select 选中模式 switch 切换模式
    mode: {
      type: String,
      default: "option",
      validator: (v) => ["option", "select", "switch"].includes(v)
    },
    options: {
      type: Array,
      default: () => []
    },
    title: {
      type: [String, Number],
      default: ""
    },
    height: {
      type: [String, Number],
      default: "auto"
    },
    maxHeight: {
      type: [String, Number],
      default: "auto"
    },
    color: {
      type: [String, null],
      default: ""
    },
    activeColor: {
      type: [String, null],
      default: ""
    },
    icon: {
      type: [String, null],
      default: ""
    },
    // 菜单图标颜色
    iconColor: {
      type: [String, null],
      default: ""
    },
    // 菜单图标大小
    iconSize: {
      type: [Number, String],
      default: "16rpx"
    },
    // 菜单图标加粗
    iconBold: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    background: {
      type: [String, null],
      default: ""
    },
    // 菜单展开内容圆角值
    borderRadius: {
      type: String,
      default: ""
    },
    optionLabelColor: {
      type: [String, Number],
      default: ""
    },
    optionLabelActiveColor: {
      type: [String, Number],
      default: ""
    },
    optionLabelSize: {
      type: [String, Number],
      default: ""
    },
    optionLabelWeight: {
      type: [String, Number],
      default: ""
    },
    optionIconSize: {
      type: [String, Number],
      default: ""
    },
    optionIconBold: {
      type: Boolean,
      default: false
    },
    // option 名称字段
    labelField: {
      type: String,
      default: "label"
    },
    // option 内容字段
    valueField: {
      type: String,
      default: "value"
    },
    // option 图标字段
    iconField: {
      type: String,
      default: "icon"
    }
  },
  data() {
    return {
      dropdown: {},
      active: false,
      closed: true,
      overlayTop: 0,
      screenHeight: 0,
      modelValue: ""
    }
  },
  computed: {
    _direction() {
      const names = { up: "slide-top", down: "slide-bottom" }
      const direction = this.dropdown?.direction
      return names[direction || "down"]
    },
    top() {
      return this.dropdown?.top
    },
    bottom() {
      return this.dropdown?.bottom
    },
    overlay() {
      return this.dropdown?.overlay
    },
    duration() {
      return this.dropdown?.duration
    },
    direction() {
      return this.dropdown?.direction
    },
    dropdownItemStyle() {
      const style = {}
      if (this.direction === "up") {
        style.top = 0
        style.bottom = this.screenHeight - this.top + "px"
      }
      if (this.direction === "down") {
        style.top = this.bottom + "px"
        style.bottom = 0
      }
      style.left = 0
      style.right = 0
      style.position = "fixed"
      style.zIndex = this.active ? 11 : 10
      style.borderTop = this.dropdown?.borderBottom
      if (!this.active && this.closed) style.display = "none"
      if (this.mode !== "option") style.display = "none"
      return useStyle(style)
    },
    overlayTransitionStyle() {
      const style = {}
      style.position = "absolute"
      return useStyle(style)
    },
    contentTransitionStyle() {
      const style = {}
      const direction = this.dropdown?.direction
      if (direction === "up") style.bottom = 0
      if (direction === "down") style.top = 0
      style.left = 0
      style.width = "100%"
      style.position = "absolute"
      return useStyle(style)
    },
    scrollViewStyle() {
      const style = {}
      style.height = useUnit(this.height)
      style.maxHeight = useUnit(this.maxHeight)
      return useStyle(style)
    },
    contentStyle() {
      const style = {}
      const borderRadius = this.dropdown?.borderRadius || this.borderRadius
      if (this.direction === "up") {
        style.borderTopLeftRadius = useUnit(borderRadius)
        style.borderTopRightRadius = useUnit(borderRadius)
      }
      if (this.direction === "down") {
        style.borderBottomLeftRadius = useUnit(borderRadius)
        style.borderBottomRightRadius = useUnit(borderRadius)
      }
      style.background = useColor(this.background)
      return useStyle(style)
    },
    optionStyle() {
      return (index) => {
        const style = {}
        style.color = this.options[index][this.valueField] === this.modelValue ? useColor(this.optionLabelActiveColor) : useColor(this.optionLabelColor)
        return useStyle(style)
      }
    },
    labelStyle() {
      const style = {}
      style.fontSize = useUnit(this.optionLabelSize)
      style.fontWeight = this.optionLabelWeight
      return useStyle(style)
    }
  },
  watch: {
    value: {
      handler(v) {
        this.modelValue = v
      },
      immediate: true
    },
    modelValue: {
      handler(v) {
        this.$emit("input", v)
        this.$emit("change", v)
      }
    }
  },
  created() {},
  mounted() {
    this.update()
  },
  methods: {
    async update() {
      this.dropdown = this.useParent("zm-dropdown")
      const { screenHeight } = uni.getSystemInfoSync()
      if (screenHeight) this.screenHeight = screenHeight
      if (isNoEmpty(this.dropdown)) this.dropdown.setChildren(this)
    },
    // 切换显示状态
    toggle(v) {
      if (this.mode === "option") {
        if (isBoolean(v)) {
          if (v) this.update()
          this.active = v
        } else {
          if (!this.active) this.update()
          this.active = !this.active
        }
      } else if (this.mode === "select") {
        this.active = !!v
        this.modelValue = !!v
      } else if (this.mode === "switch") {
        if (v === false) {
          this.active = v
          this.modelValue = ""
        } else {
          this.active = true
          const index = this.options.findIndex((item) => item[this.valueField] === this.modelValue)
          const length = this.options.length
          this.modelValue = index === length - 1 ? this.options[0][this.valueField] : this.options[index + 1][this.valueField]
        }
      }
      this.dropdown.setChildren(this)
    },
    // 点击选项
    onClickOption(option) {
      this.modelValue = option[this.valueField]
      this.toggle(false)
    },
    onOpen() {
      this.$emit("open")
    },
    onOpened() {
      this.closed = false
      this.$emit("opened")
    },
    onClose() {
      this.$emit("close")
    },
    onClosed() {
      this.closed = true
      this.$emit("closed")
    },
    onClickOverlay() {
      if (this.dropdown?.closeOnClickOverlay) {
        this.toggle(false)
      }
    },
    noop() {
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-dropdown-item {
  overflow: hidden;
  border-top: 1rpx solid #eeeeee;
  &__content {
    overflow: hidden;
    background-color: #fff;
    &__option {
      display: flex;
      margin: 0 24rpx;
      padding: 20rpx 0;
      position: relative;
      align-items: center;
      justify-content: space-between;
      &:not(:last-child)::after {
        left: 0;
        right: 0;
        bottom: 0;
        content: " ";
        position: absolute;
        border-bottom: 1rpx solid #eeeeee;
      }
      &.is-active {
        color: var(--theme-color);
      }
      &__label {
        flex: 1;
        display: flex;
        flex-shrink: 0;
        margin-right: 24rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }
  }
}
</style>
