<template>
  <view v-if="visible" class="zm-transition" :animation="animationData" :style="[style]" @click="onClick">
    <slot></slot>
  </view>
</template>

<script>
import modes from "./modes"
import weixin from "@/mixins/weixin"
import { useStyle } from "@/utils/style"
import { merge } from "@/utils/utils"
import { isArray, isString } from "@/utils/check"
export default {
  name: "zm-transition",
  mixins: [weixin],
  props: {
    show: {
      type: Boolean,
      default: true
    },
    mode: {
      type: [String, null],
      default: "fade"
    },
    zIndex: {
      type: [String, Number],
      default: ""
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    penetrate: {
      type: Boolean,
      default: false
    },
    timingFunction: {
      type: String,
      default: "ease"
    },
    enterDelay: {
      type: Number,
      default: 0
    },
    leaveDelay: {
      type: Number,
      default: 0
    },
    customStyle: {
      type: [String, Object],
      default: ""
    }
  },
  data() {
    return {
      timer: null,
      config: {},
      animation: null,
      animationData: {},
      styles: {},
      visible: false,
      noCustomStep: true
    }
  },
  computed: {
    style() {
      let styles = {}
      styles.zIndex = this.zIndex
      styles.pointerEvents = this.penetrate ? "none" : "auto"
      styles.transitionDuration = `${this.duration / 1000}s`
      return useStyle({ ...styles, ...this.styles, ...useStyle(this.customStyle) })
    }
  },
  watch: {
    show: {
      handler(newVal) {
        if (newVal) {
          this.open()
        } else {
          if (this.visible) {
            setTimeout(() => this.close(), this.leaveDelay)
          }
        }
      },
      immediate: true
    },
    $props: {
      handler() {
        this.init()
      },
      deep: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化
    init(config = {}) {
      this.config = {
        delay: this.enterDelay,
        duration: this.duration,
        timingFunction: this.timingFunction,
        transformOrigin: "50% 50%"
      }
      this.config = merge(this.config, config)

      this.animation = uni.createAnimation(this.config)
    },
    // 执行动画
    run(cb = () => {}) {
      this.animationData = this.animation.export()
      this.timer = setTimeout(() => cb(), this.config.duration)
    },
    // 步骤动画
    step(params = {}, config = {}) {
      this.isCustomStep = false
      for (let i in params) {
        try {
          if (typeof params[i] === "object") {
            this.animation[i](...params[i])
          } else {
            this.animation[i](params[i])
          }
        } catch (e) {
          console.error(`方法 ${i} 不存在`)
        }
      }
      this.animation.step(config)
    },
    // 开始动画
    open() {
      clearTimeout(this.timer)
      this.transform = ""
      this.visible = true

      this.initStyle("init")

      this.$nextTick(() => {
        this.timer = setTimeout(() => {
          if (this.noCustomStep) this.initTransition("open").step()
          setTimeout(() => this.$emit("open"), this.enterDelay)
          this.run(() => {
            this.$emit("opened")
          })
        }, 20)
      })
    },
    // 关闭动画
    close() {
      this.$emit("close")
      if (this.noCustomStep) this.initTransition("close").step()
      this.$nextTick(() => {
        this.run(() => {
          this.visible = false
          this.animationData = null
          if (this.noCustomStep) this.initStyle("close")
          this.$emit("closed")
        })
      })
    },
    // 初始化样式
    initStyle(type = "init") {
      this.styles = { transform: "" }
      const build = (mode) => {
        if (modes[mode]) {
          const t = modes[mode][type]
          t.forEach((i) => {
            if (i.name === "transform") {
              this.styles[i.name] += `${i.method}(${i.value}) `
            } else {
              this.styles[i.name] = i.value
            }
          })
        } else {
          console.error(`mode ${mode} 不存在`)
        }
      }
      if (isArray(this.mode)) {
        this.mode.forEach((mode) => build(mode))
      } else if (isString(this.mode)) {
        build(this.mode)
      } else {
        console.error("mode 格式错误 不存在")
      }
    },
    // 初始化Transrom
    initTransition(type) {
      const build = (mode) => {
        const t = modes[mode][type]
        t.forEach((i) => {
          const v = isArray(i.value) ? i.value : [i.value]
          this.animation[i.method](...v)
        })
      }
      if (isArray(this.mode)) {
        this.mode.forEach((mode) => build(mode))
      } else if (isString(this.mode)) {
        build(this.mode)
      } else {
        console.error("mode 格式错误 不存在")
      }
      return this.animation
    },
    onClick() {
      this.$emit("click")
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-transition {
  z-index: 1;
  position: relative;
}
</style>
