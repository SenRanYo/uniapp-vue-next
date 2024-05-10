<template>
  <view class="zm-number-roll" :style="[numberRollStyle]">
    <view v-for="(column, index) in columns" :key="index" class="zm-number-roll__column" :style="[rollColumnStyle(index)]">
      <text v-for="(v, valueIndex) in column" :key="valueIndex" class="zm-number-roll__row" :style="[rollColumnItemStyle]">{{ v }}</text>
    </view>
  </view>
</template>

<script>
const arab = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
import { useStyle, useUnit } from "@/utils/style"
import { formatDigit } from "../utils/utils"
export default {
  name: "zm-number-roll",
  mixins: [hook, weixin],
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    color: {
      type: String,
      default: ""
    },
    fontSize: {
      type: [String, Number],
      default: 24
    },
    fontWeight: {
      type: String,
      default: ""
    },
    trimZero: {
      type: Boolean,
      default: true
    },
    thousandsSep: {
      type: String,
      default: ""
    },
    decimalPlaces: {
      type: [String, Number],
      default: 2
    },
    transition: {
      type: String,
      default: ""
    },
    duration: {
      type: [String, Number],
      default: ""
    },
    customClass: {
      type: String,
      default: ""
    },
    customStyle: {
      type: [String, Object],
      default: ""
    }
  },
  data() {
    return {
      isInit: false,
      height: "auto",
      indexs: [],
      columns: []
    }
  },
  computed: {
    numberRollStyle() {
      let style = {}
      style.height = this.fontSize ? useUnit(this.fontSize) : `${this.height}px`
      return useStyle(style)
    },
    rollColumnStyle() {
      return (index) => {
        let style = {}
        let height = this.fontSize ? useUnit(this.fontSize) : `${this.height}px`
        style.transform = `translate3d(0, calc(${this.indexs[index]} * ${height} * -1), 0)`
        style.transitionTimingFunction = this.transition
        if (this.duration) style.transitionDuration = `${this.duration}ms`
        return useStyle(style)
      }
    },
    rollColumnItemStyle() {
      let style = {}
      style.color = this.color
      style.height = this.fontSize ? useUnit(this.fontSize) : `${this.height}px`
      style.fontSize = this.fontSize ? useUnit(this.fontSize) : `${this.height}px`
      style.lineHeight = this.fontSize ? useUnit(this.fontSize) : `${this.height}px`
      style.fontWeight = this.fontWeight
      return useStyle(style)
    }
  },
  watch: {
    value: {
      handler() {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  updated() {
    this.initHeight()
  },
  methods: {
    async init() {
      await this.$nextTick()
      let value = Number(this.isInit ? this.value : 0)
      value = formatDigit(value, { decimalPlaces: this.decimalPlaces, trimZero: this.trimZero, thousandsSep: this.thousandsSep })
      let formatValueArr = String(value).split("")
      this.columns = formatValueArr.map((val) => (~arab.indexOf(val) ? arab : [val]))
      this.indexs = formatValueArr
        .reverse()
        .map((val) => (~arab.indexOf(val) ? Number(val) : 0))
        .reverse()

      this.initHeight()
      if (!this.isInit) {
        this.isInit = true
        this.init()
      }
    },
    initHeight() {
      this.useRect(".zm-number-roll").then((rect) => {
        this.height = rect.height
      })
    },
    formatSeparator(number) {
      const arr = (number + "").split(".")
      const int = arr[0].split("")
      const fraction = arr[1] || ""
      let r = ""
      int.reverse().forEach(function (v, i) {
        if (i !== 0 && i % 3 === 0) {
          r = v + "," + r
        } else {
          r = v + r
        }
      })
      return r + (fraction ? "." + fraction : "")
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-number-roll {
  overflow: hidden;
  display: inline-flex;
  &__column {
    transition-property: transform;
    transition-duration: 1.2s;
    transition-timing-function: ease-out;
  }
  &__row {
    color: inherit;
    display: flex;
    font-size: inherit;
    font-weight: inherit;
    justify-content: center;
    transition: all 0.3s ease-out;
  }
}
</style>
