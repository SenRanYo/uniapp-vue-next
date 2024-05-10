<template>
  <view class="zm-row" :style="[wrapStyle]"><slot></slot></view>
</template>

<script>
import mixins from "../mixins"
import { isFunction } from "../utils/check"
import { useStyle, useUnitToPx } from "../utils/style"
export default {
  name: "zm-row",
  mixins: [mixins],
  props: {
    gap: {
      type: [String, Number],
      default: ""
    },
    // 列间隔
    colGap: {
      type: [String, Number],
      default: ""
    },
    // 行间隔
    rowGap: {
      type: [String, Number],
      default: ""
    },
    // 水平排列方式
    justify: {
      type: String,
      default: ""
    },
    // 垂直排列方式
    align: {
      type: String,
      default: ""
    },
    // 自定义类名
    customClass: {
      type: [String, Array],
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
      width: 0,
      childrens: []
    }
  },
  computed: {
    wrapStyle() {
      let style = {}
      style.margin = `-${useUnitToPx(this.gap || this.rowGap) / 2}px -${useUnitToPx(this.gap || this.colGap) / 2}px`
      switch (this.justify) {
        case "start":
        case "end":
          style.justifyContent = `flex-${this.justify}`
          break
        case "around":
        case "between":
          style.justifyContent = `space-${this.justify}`
          break
        default:
          style.justifyContent = this.justify
          break
      }
      switch (this.align) {
        case "start":
        case "end":
          style.alignItems = `flex-${this.align}`
          break
        default:
          style.alignItems = this.align
          break
      }
      return useStyle({ ...style, ...useStyle(this.customStyle) })
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
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$nextTick()
      const { width } = await this.useRect(".zm-row")
      this.width = width
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
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
