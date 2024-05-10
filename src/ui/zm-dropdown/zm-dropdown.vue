<template>
  <view class="zm-dropdown" :style="[dropdownStyle]" @click.stop="() => {}">
    <view class="zm-dropdown__menu" :style="[menuStyle]">
      <view
        v-for="(item, index) in childrens"
        :key="index"
        :style="[menuStyle]"
        class="zm-dropdown__menu__item"
        :class="{ 'is-active': isActive(index), 'is-disabled': isDisabled(index) }"
        @click.stop="onClickMenuItem(index)"
      >
        <text class="zm-dropdown__menu__item__title" :style="[titleStyle(item, index)]">{{ titleText(index) }}</text>
        <view v-if="isIcon(index)" class="zm-dropdown__menu__item__icon" :style="[iconStyle(item, index)]" :class="{ 'is-active': isActive(index) }">
          <zm-icon :name="_icon(index)" :color="_iconColor(index)" :size="_iconSize(index)" :bold="_iconBold(index)" :custom-prefix="iconPrefix"></zm-icon>
        </view>
      </view>
    </view>
    <slot></slot>
  </view>
</template>

<script>
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
import { isFunction, isBoolean } from "@/utils/check"
import { useStyle, useColor, useUnit } from "@/utils/style"
const globalDropdownInstance = []
export default {
  name: "zm-dropdown",
  mixins: [hook, weixin],
  props: {
    // 标题颜色
    color: {
      type: String,
      default: ""
    },
    // 标题激活颜色
    activeColor: {
      type: String,
      default: ""
    },
    // 菜单高度
    height: {
      type: [Number, String],
      default: ""
    },
    // 菜单背景色
    background: {
      type: String,
      default: ""
    },
    // 标题文字大小
    titleSize: {
      type: [Number, String],
      default: ""
    },
    // 标题文字粗细
    titleWeight: {
      type: [Number, String],
      default: ""
    },
    // 菜单图标
    icon: {
      type: String,
      default: "sharp-down"
    },
    // 菜单图标颜色
    iconColor: {
      type: String,
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
    // 菜单图标前缀
    iconPrefix: {
      type: String,
      default: "zm-icon"
    },
    // 是否显示菜单图标
    showIcon: {
      type: Boolean,
      default: true
    },
    // 菜单栏底部边框样式
    borderBottom: {
      type: String,
      default: ""
    },
    // 菜单展开内容圆角值
    borderRadius: {
      type: String,
      default: ""
    },
    // 菜单展开方向
    direction: {
      type: String,
      default: "down"
    },
    // 展开动画时长
    duration: {
      type: [Number, String],
      default: 300
    },
    // 是否显示遮罩
    overlay: {
      type: Boolean,
      default: true
    },
    // 是否点击遮罩关闭菜单
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    // 是否点击外部元素后关闭菜单
    closeOnClickOutside: {
      type: Boolean,
      default: true
    },
    // 菜单栏 z-index 层级
    zIndex: {
      type: [Number, String],
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
      mitt: null,
      top: 0,
      bottom: 0,
      childrens: []
    }
  },
  computed: {
    // 容器样式
    dropdownStyle() {
      const style = {}
      style.zIndex = this.zIndex
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    },
    // 菜单样式
    menuStyle() {
      const style = {}
      style.height = useUnit(this.height)
      style.background = useColor(this.background)
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    },
    _icon() {
      return (index) => {
        const children = this.childrens[index]
        const mode = children.mode

        if (mode === "switch") {
          const options = children.options
          const iconField = children.iconField
          const modelValue = children.modelValue
          const valueField = children.valueField
          const option = options.find((item) => item[valueField] === modelValue)
          return option?.[iconField] || children.icon || this.icon
        }
        return children.icon || this.icon
      }
    },
    _iconSize() {
      return (index) => this.childrens[index]?.iconSize || this.iconSize
    },
    _iconColor() {
      return (index) => this.childrens[index]?.iconColor || this.iconColor
    },
    _iconBold() {
      return (index) => this.childrens[index]?.iconBold || this.iconBold
    },
    isIcon() {
      return (index) => {
        const children = this.childrens[index]
        return isBoolean(children.showIcon) ? children.showIcon : this.showIcon
      }
    },
    isActive() {
      return (index) => {
        const children = this.childrens[index]
        return children.active
      }
    },
    isDisabled() {
      return (index) => this.childrens[index]?.disabled
    },
    titleText() {
      return (index) => {
        const children = this.childrens[index]
        if (["option", "switch"].includes(children.mode) && children.modelValue) {
          const options = children.options
          const modelValue = children.modelValue
          const labelField = children.labelField
          const valueField = children.valueField
          const option = options.find((item) => item[valueField] === modelValue)
          return option?.[labelField]
        } else {
          return children.title
        }
      }
    },
    titleStyle() {
      return (item, index) => {
        const style = {}
        style.fontWeight = this.childrens[index]?.titleWeight || this.titleWeight
        style.fontSize = useUnit(this.childrens[index]?.titleSize || this.titleSize)
        style.color = item.isOpen ? useColor(this.childrens[index]?.activeColor || this.activeColor) : useColor(this.childrens[index]?.color || this.color)
        return useStyle(style)
      }
    },
    iconStyle() {
      return (item, index) => {
        const style = {}
        const children = this.childrens[index]
        const mode = children.mode
        if (mode === "option" && children.active) {
          style.transform = "rotate(180deg)"
        }
        style.color = item.isOpen ? useColor(this.childrens[index]?.activeColor || this.activeColor) : useColor(this.childrens[index]?.color || this.color)
        return useStyle(style)
      }
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
  created() {
    this.onEvents()
    this.childrens = []
  },
  mounted() {
    globalDropdownInstance.push(this)
    this.updateBottom()
  },
  methods: {
    // 更新底部位置
    async updateBottom() {
      await this.$nextTick()
      const dropdown = await this.useRect(".zm-dropdown")
      this.top = dropdown.top
      this.bottom = dropdown.bottom
    },
    // 点击菜单项
    async onClickMenuItem(index) {
      if (this.childrens[index]?.disabled) return
      // 关闭其他组件菜单
      globalDropdownInstance.map((d) => d !== this && d.close())
      if (this.childrens[index]?.mode === "option") {
        // 更新位置
        this.updateBottom()
        // 激活当前组件菜单
        this.childrens.forEach((children, cindex) => (cindex === index ? children.toggle() : children.toggle(false)))
      }
      if (this.childrens[index]?.mode === "select") {
        // 激活当前组件菜单
        this.childrens.forEach((children, cindex) => (cindex === index ? children.toggle(true) : children.toggle(false)))
      }
      if (this.childrens[index]?.mode === "switch") {
        // 激活当前组件菜单
        this.childrens.forEach((children, cindex) => (cindex === index ? children.toggle() : children.toggle(false)))
      }
    },
    // 关闭所有菜单
    close() {
      this.childrens.forEach((children) => children.toggle(false))
    },
    // 设置子组件
    setChildren(instance) {
      const index = this.childrens.findIndex((item) => item === instance)
      index >= 0 ? this.childrens.splice(index, 1, instance) : this.childrens.push(instance)
    },
    // 更新所有子组件
    updateChildrens() {
      this.childrens.forEach((children) => {
        if (isFunction(children.update)) children.update()
      })
    },
    // 事件监听
    onEvents() {
      const { mitt } = this.useParent("zm-view")
      if (mitt) {
        this.mitt = mitt
        // 监听zm-view的touch事件
        this.mitt.on("touchstart", (e) => {
          // 判断是否点击外部区域
          const { clientY } = e.touches[0]
          if (this.direction === "up") {
            if (clientY > this.bottom) this.close()
          }
          if (this.direction === "down") {
            if (clientY < this.top) this.close()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-dropdown {
  &__menu {
    height: 90rpx;
    display: flex;
    position: relative;
    align-items: center;
    background-color: #fff;
    &__item {
      flex: 1;
      height: 100%;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      &.is-active {
        color: var(--theme-color);
      }
      &.is-disabled {
        opacity: 0.6;
      }
      &__icon {
        display: flex;
        margin-left: 8rpx;
        transition: transform 0.3s ease;
        &.is-active {
          color: var(--theme-color);
        }
      }
    }
  }
}
</style>
