<template>
  <view v-if="show" class="zm-safe-area-bottom" :style="[style]"></view>
</template>

<script>
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
import { useColor, useStyle } from "@/utils/style"

/**
 * zm-safe-area-bottom 底部安全距离组件
 * @description 一般用于底部位置，占位全面屏手机底部横条位置高度。
 * @property {Boolean}		show		      是否显示
 * @property {String}			background		背景颜色
 * @property {String}			customStyle		自定义样式
 * @event    {Function}   height        安全区域高度
 */
export default {
  name: "zm-safe-area-bottom",
  mixins: [hook, weixin],
  props: {
    show: {
      type: Boolean,
      default: true
    },
    background: {
      type: String,
      default: ""
    },
    customStyle: {
      type: [Object, String],
      default: ""
    }
  },
  data() {
    return {
      height: 0
    }
  },
  computed: {
    style() {
      const style = {}
      style.height = this.height + "px"
      style.background = useColor(this.background)
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { safeAreaInsets } = uni.getSystemInfoSync()
      if (safeAreaInsets) {
        this.height = Math.max(safeAreaInsets.bottom - 17, 0)
        this.$emit("height", this.height)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-safe-area-bottom {
  width: 100%;
  flex-shrink: 0;
}
</style>
