<template>
  <view class="zm-overlay" :style="[overlayStyle]" @touchmove.prevent.stop="noop">
    <zm-transition
      mode="fade"
      :show="show"
      :duration="duration"
      :timing-function="timingFunction"
      :custom-style="transitionStyle"
      :custom-class="customClass"
      @open="onEmit('open')"
      @close="onEmit('close')"
      @opened="onEmit('opened')"
      @closed="onEmit('closed')"
      @click="onEmit('click')"
      @touchmove.prevent.stop="noop"
    >
      <slot></slot>
    </zm-transition>
  </view>
</template>

<script>
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
import { useStyle } from "@/utils/style"
export default {
  name: "zm-overlay",
  mixins: [hook, weixin],
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: false
    },
    // 元素层级
    zIndex: {
      type: [Number, String],
      default: ""
    },
    // 透明度
    opacity: {
      type: [Number, String],
      default: "0.7"
    },
    // 动画时长，单位毫秒
    duration: {
      type: [Number, String],
      default: 300
    },
    // 自定义类名
    customClass: {
      type: String,
      default: ""
    },
    // 自定义样式
    customStyle: {
      type: [Object, String],
      default: () => ({})
    }
  },
  data() {
    return {
      timingFunction: "ease-out"
    }
  },
  computed: {
    overlayStyle() {
      const style = {}
      style.zIndex = this.zIndex
      return useStyle(style)
    },
    transitionStyle() {
      const style = {}
      style.top = 0
      style.left = 0
      style.width = "100%"
      style.height = "100%"
      style.position = "fixed"
      style.background = `rgba(0, 0, 0, ${this.opacity})`
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    }
  },
  methods: {
    onEmit(name) {
      this.$emit(name)
      if (name === "opened") this.timingFunction = "ease-in"
      if (name === "closed") this.timingFunction = "ease-out"
    },
    noop() {
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-overlay {
  z-index: 14000;
}
</style>
