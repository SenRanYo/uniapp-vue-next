<template>
  <view class="zm-footer">
    <view class="zm-footer__inner" :style="[innerStyle]" :class="{ 'safe-area-inset-bottom': safeAreaInsetBottom }">
      <slot></slot>
    </view>
    <view class="zm-footer__placeholder" :class="{ 'safe-area-inset-bottom': safeAreaInsetBottom }" :style="[placeholderStyle]"></view>
  </view>
</template>

<script>
import mixin from "../mixins"
import { useColor, useStyle } from "@/utils/style"
export default {
  name: "zm-footer",
  mixins: [mixin],
  props: {
    // 组件名称
    name: { type: String, default: "" },
    // 元素层级
    zIndex: { type: [Number, String], default: "" },
    // 底部偏移
    offsetBottom: { type: [Number, String], default: 0 },
    // 背景颜色
    background: { type: String, default: "" },
    // 底部安全区域
    safeAreaInsetBottom: { type: Boolean }
  },
  data() {
    return {
      mitt: null,
      rect: null,
      tabbarHeight: 0
    }
  },
  computed: {
    innerStyle() {
      const style = {}
      style.zIndex = this.zIndex
      style.position = "fixed"
      style.bottom = this.tabbarHeight + this.offsetBottom + "px"
      style.zIndex = this.zIndex
      style.background = useColor(this.background)
      return useStyle(style)
    },
    placeholderStyle() {
      const style = {}
      style.height = this.rect?.height + "px"
      return useStyle(style)
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
      this.rect = await this.useRect(".zm-footer__inner")
      this.$emit("rect", this.rect)
      this.$emit("height", this.rect.height)
      if (this.mitt) {
        this.mitt.emit("zm-view.children", this)
        this.mitt.emit("zm-footer.rect", this.rect)
        this.mitt.emit("zm-footer.height", this.rect.height)
        this.mitt.emit("zm-footer.instance", this)

        this.mitt.emit("zm-tabbar.getHeight")
      }
    },
    onEvents() {
      const { mitt } = this.useParent("zm-view")
      if (mitt) {
        this.mitt = mitt
        // 监听tabbar高度
        this.mitt.on("zm-tabbar.height", (height) => {
          this.tabbarHeight = height
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-footer {
  margin-top: auto;
  position: relative;
  &__inner {
    left: 0;
    width: 100%;
  }
}
</style>
