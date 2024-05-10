<template>
  <view :id="_uuid" class="zm-sticky" :style="[style]">
    <slot></slot>
  </view>
</template>

<script>
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
import { useStyle, unitToPx, useColor } from "@/utils/style"
export default {
  name: "zm-sticky",
  mixins: [hook, weixin],
  props: {
    zIndex: {
      type: [String, Number],
      default: ""
    },
    offsetTop: {
      type: [String, Number],
      default: 0
    },
    background: {
      type: String,
      default: "transparent"
    }
  },
  data() {
    return {
      rect: null,
      isSticky: false,
      navbarHeight: 0
    }
  },
  computed: {
    style() {
      const style = {}
      style.zIndex = this.zIndex
      style.top = unitToPx(this.offsetTop) + this.navbarHeight + "px"
      style.background = useColor(this.background)
      return useStyle(style)
    }
  },
  watch: {
    isSticky: {
      handler(val) {
        this.$emit("change", val)
      },
      immediate: true
    }
  },
  created() {
    this.onEvents()
  },
  mounted() {
    this.update()
  },
  methods: {
    async update() {
      await this.$nextTick()
      this.updateSticky()
      this.rect = await this.useRect(".zm-sticky__inner")
      this.$emit("rect", this.rect)
      this.$emit("height", this.rect.height)
      if (this.mitt) {
        this.mitt.emit("zm-view.children", this)
        this.mitt.emit("zm-sticky.rect", this.rect)
        this.mitt.emit("zm-sticky.height", this.rect.height)
        this.mitt.emit("zm-sticky.instance", this)
      }
    },
    onEvents() {
      const { mitt } = this.useParent("zm-view")
      if (mitt) {
        this.mitt = mitt
      }
      // 监听navbar高度
      this.mitt.on("zm-navbar.height", (height) => {
        this.navbarHeight = height
      })

      uni.$on("onPageScroll", ({ scrollTop }) => {
        this.$emit("scroll", scrollTop)
        this.updateSticky()
      })
    },
    updateSticky() {
      this.useRect(".zm-sticky").then((rect) => {
        this.isSticky = rect.top - this.navbarHeight <= unitToPx(this.offsetTop)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-sticky {
  left: 0;
  width: 100%;
  position: sticky;
  &__inner {
    left: 0;
    width: 100%;
  }
}
</style>
