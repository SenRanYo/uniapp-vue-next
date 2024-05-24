<template>
  <view class="zm-navbar">
    <view class="zm-navbar__inner" :class="{ 'is-fixed': fixed, 'is-border': borderBottom }" :style="[innerStyle]">
      <view class="zm-navbar__content" :style="[contentStyle]">
        <view v-if="$slots.left" class="zm-navbar__left">
          <slot name="left"></slot>
        </view>
        <view v-else-if="isBack" class="zm-navbar__back" @tap="handleBack">
          <zm-icon :name="backIcon" :color="backIconColor" :size="backIconSize"></zm-icon>
          <view v-if="backText" class="zm-navbar__back__text" :style="[backTextStyle]">{{ backText }}</view>
        </view>
        <view v-if="$slots.default" class="zm-navbar__default">
          <slot></slot>
        </view>
        <view v-else-if="title || $slots.title" class="zm-navbar__title" :style="[titleStyle]">
          <slot name="title">{{ title }}</slot>
        </view>
        <view v-if="$slots.right" class="zm-navbar__right">
          <slot name="right"></slot>
        </view>
      </view>
    </view>
    <view class="zm-navbar__placeholder" :style="[placeholderStyle]"></view>
  </view>
</template>
<script>
/**
@name zm-navbar 导航栏
@description 顶部导航栏组件，用于展示页面标题和返回按钮
@prop {String|Number} height - 导航栏高度，默认为""
@prop {String|Number} padding - 左右内边距，默认为"20rpx"
@prop {String} backIconColor - 返回按钮图标颜色，默认为"#333333"
@prop {String} backIconName - 返回按钮图标名称，默认为"arrow-left"
@prop {String|Number} backIconSize - 返回按钮图标大小，默认为"44rpx"
@prop {String} backText - 返回按钮文字，默认为""
@prop {String} backTextColor - 返回按钮文字颜色，默认为"#333333"
@prop {String} backTextSize - 返回按钮文字大小，默认为"30rpx"
@prop {String|null} title - 标题内容，默认为""
@prop {Boolean} titleCenter - 标题是否居中显示，默认为true
@prop {String|Number} titleSize - 标题文字大小，默认为"32rpx"
@prop {String|Number} titleWidth - 标题宽度，默认为"300rpx"
@prop {String} titleColor - 标题文字颜色，默认为"#333333"
@prop {String|Number} titleWeight - 标题文字粗细，默认为700
@prop {Boolean|String} isBack - 是否显示返回按钮，默认为true
@prop {Boolean} gradient - 是否显示渐变背景，默认为false
@prop {String|Number} gradientHeigt - 渐变背景高度，默认为200
@prop {String} background - 背景颜色，默认为"#ffffff"
@prop {Boolean} fixed - 是否固定在顶部，默认为true
@prop {Boolean} immersive - 是否沉浸式模式，默认为false
@prop {Boolean} borderBottom - 是否显示底部边框，默认为true
@prop {String|Number} zIndex - 层叠顺序，默认为""
@prop {Function} customBack - 自定义返回按钮回调函数，默认为null
@prop {Object|String} customStyle - 自定义样式
*/

const systemInfo = uni.getSystemInfoSync()
// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
// #endif
import mixin from "../mixins"
import { hexToRgb } from "@/utils/color"
import { useStyle, useUnit, useUnitToPx } from "../utils/style"
export default {
  name: "zm-navbar",
  mixins: [mixin],
  props: {
    height: { type: [String, Number], default: "" },
    padding: { type: [String, Number], default: "20rpx" },
    backIconColor: { type: String, default: "#333333" },
    backIconName: { type: String, default: "arrow-left" },
    backIconSize: { type: [String, Number], default: "44rpx" },
    backText: { type: String, default: "" },
    backTextColor: { type: String, default: "#333333" },
    backTextSize: { type: String, default: "30rpx" },
    title: { type: [String, null], default: "" },
    titleCenter: { type: Boolean, default: true },
    titleSize: { type: [String, Number], default: "32rpx" },
    titleWidth: { type: [String, Number], default: "300rpx" },
    titleColor: { type: String, default: "#333333" },
    titleWeight: { type: [String, Number], default: 700 },
    isBack: { type: [Boolean, String], default: true },
    gradient: { type: Boolean, default: false },
    gradientHeigt: { type: [String, Number], default: 200 },
    background: { type: String, default: "#ffffff" },
    fixed: { type: Boolean, default: true },
    immersive: { type: Boolean, default: false },
    borderBottom: { type: Boolean, default: true },
    zIndex: { type: [String, Number], default: "" },
    customBack: { type: Function, default: null },
    customStyle: { type: [Object, String], default: () => ({}) }
  },
  data() {
    return {
      mitt: null,
      rect: null,
      route: "",
      routes: [],
      scrollTop: 0,
      backgroundRGB: {},
      // #ifdef MP
      menuButtonInfo: menuButtonInfo,
      // #endif
      statusBarHeight: systemInfo.statusBarHeight
    }
  },
  computed: {
    backIcon() {
      return this.routes.length == 1 ? "wap-home-o" : this.backIconName
    },
    innerStyle() {
      const { r, g, b } = this.backgroundRGB
      return useStyle({
        zIndex: this.zIndex,
        background: this.gradient ? `rgba(${r},${g},${b},${this.scrollTop / this.gradientHeigt})` : this.background,
        ...useStyle(this.customStyle)
      })
    },
    contentStyle() {
      const style = {}
      style.height = this.navbarHeight + "px"
      style.marginTop = this.statusBarHeight + "px"
      style.paddingLeft = useUnit(this.padding)
      style.paddingRight = useUnit(this.padding)
      // #ifdef MP
      if (systemInfo.deviceType !== "pc") {
        style.marginRight = systemInfo.windowWidth - menuButtonInfo.left + "px"
      }
      // #endif
      if (this.height) style.alignItems = "flex-start"
      return useStyle(style)
    },
    backTextStyle() {
      const style = {}
      style.color = this.backTextColor
      style.fontSize = this.backTextSize
      return useStyle(style)
    },
    // 导航中间的标题的样式
    titleStyle() {
      let style = {}
      if (this.titleCenter) {
        // #ifndef MP
        style.left = (systemInfo.windowWidth - useUnitToPx(this.titleWidth)) / 2 + "px"
        style.right = (systemInfo.windowWidth - useUnitToPx(this.titleWidth)) / 2 + "px"
        // #endif
        // #ifdef MP
        // 此处是为了让标题显示区域即使在小程序有右侧胶囊的情况下也能处于屏幕的中间，是通过绝对定位实现的
        let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left
        style.left = (systemInfo.windowWidth - useUnitToPx(this.titleWidth)) / 2 + "px"
        style.right = rightButtonWidth - (systemInfo.windowWidth - useUnitToPx(this.titleWidth)) / 2 + rightButtonWidth + "px"
        // #endif
        style.width = useUnitToPx(this.titleWidth) + "px"
        style.position = "absolute"
        style.justifyContent = "center"
      }

      style.color = this.titleColor
      style.fontSize = this.titleSize
      style.fontWeight = this.titleWeight
      return useStyle(style)
    },
    navbarHeight() {
      let height = systemInfo.osName == "ios" ? 44 : 48
      // #ifdef MP
      height = Math.min(this.menuButtonInfo.height + Math.max(this.menuButtonInfo.top - this.statusBarHeight, 0) * 2, 44)
      // #endif
      return this.height ? +useUnitToPx(this.height) : +height
    },
    placeholderStyle() {
      const style = {}
      style.height = 0
      if (this.fixed && !this.immersive) style.height = this.navbarHeight + this.statusBarHeight + "px"
      return useStyle(style)
    }
  },
  watch: {
    navbarHeight: {
      handler() {
        this.$emit("height", useUnitToPx(this.navbarHeight) + this.statusBarHeight)
      },
      immediate: true
    },
    background: {
      handler(v) {
        if (v && this.gradient) this.backgroundRGB = hexToRgb(v)
      },
      immediate: true
    }
  },
  created() {
    this.init()
    this.onEvents()
  },
  mounted() {
    this.resize()
  },
  methods: {
    init() {
      this.route = this.useRoute()
    },
    async resize() {
      await this.$nextTick()
      this.routes = getCurrentPages()
      this.rect = await this.useRect(".zm-navbar__inner")
      this.$emit("rect", this.rect)
      this.$emit("height", this.rect.height)
      if (this.mitt) {
        this.mitt.emit("zm-view.children", this)
        this.mitt.emit("zm-navbar.rect", this.rect)
        this.mitt.emit("zm-navbar.height", this.rect.height)
        this.mitt.emit("zm-navbar.instance", this)
      }
    },
    onEvents() {
      const { mitt } = this.useParent("zm-view")
      if (mitt) {
        this.mitt = mitt
        this.mitt.on("scroll", (top, { route }) => {
          if (this.route === route) {
            if (this.gradient) {
              if (top <= this.gradientHeigt) {
                this.scrollTop = top
              } else if (top > this.gradientHeigt && this.scrollTop != this.gradientHeigt) {
                this.scrollTop = top
              }
            }
          }
        })
      }
    },
    handleBack() {
      // 如果自定义了点击返回按钮的函数，则执行，否则执行返回逻辑
      if (typeof this.customBack === "function") {
        // 在微信，支付宝等环境(H5正常)，会导致父组件定义的customBack()函数体中的this变成子组件的this
        // 通过bind()方法，绑定父组件的this，让this.customBack()的this为父组件的上下文
        this.customBack.bind(this.$u.$parent.call(this))()
      } else {
        if (this.routes.length == 1) {
          // #ifdef WEB
          uni.reLaunch({ url: "/pages/tabbar/tabbar-1/tabbar-1" })
          // #endif

          // #ifndef WEB
          uni.switchTab({ url: "/pages/tabbar/tabbar-1/tabbar-1" })
          // #endif
        } else {
          uni.navigateBack()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-navbar {
  width: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  &__inner {
    flex: 1;
    display: flex;
    position: relative;
    flex-direction: column;
    &.is-fixed {
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      position: fixed;
    }
    &.is-border::before {
      left: 0;
      right: 0;
      bottom: 0;
      content: "";
      position: absolute;
      border-bottom: 1rpx solid #e4e7ed;
    }
  }
  &__left {
    height: 100%;
    display: flex;
    flex-shrink: 0;
    align-items: center;
  }
  &__content {
    height: 100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
  }
  &__default {
    flex: 1;
  }
  &__back {
    height: 100%;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    &__text {
      padding-left: 4rpx;
    }
  }
  &__title {
    flex: 1;
    flex-shrink: 0;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__right {
    height: 100%;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: flex-end;
  }
  &__placeholder {
    width: 100%;
    flex-shrink: 0;
  }
}
</style>
