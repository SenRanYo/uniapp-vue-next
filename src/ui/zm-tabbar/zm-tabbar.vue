<template>
  <view class="zm-tabbar" :style="[style]">
    <view class="zm-tabbar__inner safe-area-inset-bottom" :class="{ 'zm-tabbar__inner--border': border }" :style="[innerStyle]">
      <slot></slot>
    </view>
    <view class="zm-tabbar__placeholder" :style="[placeholderStyle]"></view>
  </view>
</template>

<script>
import mixin from "../mixins"
import { isFunction } from "../utils/check"
import { useStyle, useColor, useUnitToPx } from "../utils/style"
export default {
  name: "zm-tabbar",
  mixins: [mixin],
  props: {
    value: { type: [String, Number], default: "" },
    fixed: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    zIndex: { type: [String, Number], default: "" },
    activeColor: { type: String, default: "" },
    inactiveColor: { type: String, default: "" },
    route: { type: Boolean, default: false },
    height: { type: [String, Number], default: "140rpx" },
    background: { type: String, default: "#ffffff" },
    safeAreaInsetBottom: { type: Boolean, default: true },
    customStyle: { type: [Object, String], default: () => ({}) }
  },
  data() {
    return {
      mitt: null,
      rect: null,
      childrens: [],
      innerHeight: 0,
      isExistFooter: false,
      safeAreaBottomHeight: 17
    }
  },
  computed: {
    style() {
      const style = {}
      if (this.isExistFooter) style.marginTop = 0
      return useStyle(style)
    },
    innerStyle() {
      return useStyle({
        height: useUnitToPx(this.height) + this.safeAreaBottomHeight + "px",
        background: useColor(this.background),
        ...useStyle(this.customStyle)
      })
    },
    placeholderStyle() {
      return useStyle({
        height: this.innerHeight + "px"
      })
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
  },
  mounted() {
    this.resize()
  },
  methods: {
    async resize() {
      await this.$nextTick()
      this.rect = await this.useRect(".zm-tabbar__inner")
      this.innerHeight = this.rect?.height
      this.$emit("rect", this.rect)
      this.$emit("height", this.rect.height)
      if (this.mitt) {
        this.mitt.emit("zm-view.children", this)
        this.mitt.emit("zm-tabbar.rect", this.rect)
        this.mitt.emit("zm-tabbar.height", this.rect.height)
        this.mitt.emit("zm-tabbar.instance", this)
      }
    },
    onEvents() {
      const { mitt } = this.useParent("zm-view")
      if (mitt) {
        this.mitt = mitt

        this.mitt.on("zm-tabbar.getHeight", async () => {
          this.rect = await this.useRect(".zm-tabbar__inner")
          if (this.rect) this.mitt.emit("zm-tabbar.height", this.rect.height)
        })

        this.mitt.on("zm-view.children:update", (list = []) => {
          this.isExistFooter = list.some((item) => item.$options?.name === "zm-footer")
        })
      }
    },
    handleClickTabbar(tabbar) {
      this.$emit("input", tabbar.routeName)
    },
    updateValue(value) {
      this.$emit("input", value)
      this.$emit("change", value)
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
.zm-tabbar {
  z-index: 1000;
  position: relative;
  &__inner {
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    position: fixed;
    &--border::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: 1rpx solid #ebedf0;
      transform: scale(0.5);
    }
  }
  &__placeholder {
    box-sizing: content-box;
  }
}
</style>
