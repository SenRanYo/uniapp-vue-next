<template>
  <view class="zm-text-highlight" :style="[style]" :class="[customClass]">
    <text v-for="(item, index) in list" :key="index" :style="[textStyle(item)]" class="zm-text-highlight__text" :class="{ 'is-matched': text && text.matched }">{{ item.text }}</text>
  </view>
</template>

<script>
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
import { isNoEmpty } from "@/utils/check"
import { useStyle, useColor, useUnit } from "@/utils/style"
export default {
  name: "zm-text-highlight",
  mixins: [hook, weixin],
  props: {
    text: {
      type: [String, Number],
      default: ""
    },
    textRow: {
      type: [String, Number],
      default: "2"
    },
    match: {
      type: [String, Number],
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    fontSize: {
      type: [String, Number],
      default: ""
    },
    fontWeight: {
      type: [String, Number],
      default: ""
    },
    lineHeight: {
      type: [String, Number],
      default: ""
    },
    highlightColor: {
      type: String,
      default: "var(--theme-color)"
    },
    customStyle: {
      type: [Object, String],
      default: ""
    },
    customClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    style() {
      const style = {}
      style.color = useColor(this.color)
      style.fontSize = useUnit(this.fontSize)
      style.fontWeight = this.fontWeight
      style.lineHeight = this.lineHeight
      style["-webkit-line-clamp"] = this.textRow
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    },
    textStyle() {
      return (val) => {
        const style = {}
        if (val.matched) {
          style.color = useColor(this.highlightColor)
        }
        return useStyle(style)
      }
    }
  },
  watch: {
    text: {
      handler() {
        this.handleSplit()
      },
      immediate: true
    },
    match: {
      handler() {
        this.handleSplit()
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    update() {
      this.handleSplit()
    },
    handleSplit() {
      const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") // $& 表示匹配的整个字符串
      }
      if (this.text && isNoEmpty(this.match)) {
        const escapedMatch = escapeRegExp(this.match)
        const parts = this.text.split(new RegExp(`(${escapedMatch})`)).filter(Boolean)
        this.list = parts.map((text) => {
          return { text, matched: text === this.match }
        })
      } else {
        this.list = [{ text: this.text, matched: false }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-text-highlight {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
