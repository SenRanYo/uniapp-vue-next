<template>
  <view class="zm-tabs" :class="[wrapClass, customClass]" :style="[wrapStyle]">
    <scroll-view :scroll-x="scrollable" enable-flex scroll-with-animation :scroll-left="scrollLeft" class="zm-tabs__scroll">
      <view class="zm-tabs__list">
        <view
          v-for="(item, index) in list"
          :key="index"
          :style="[tabStyle(index)]"
          class="zm-tabs__tab"
          :class="{ 'is-active': index === innerIndex, 'is-disabled': item[disabledKey] }"
          @click="onClickTab(index)"
        >
          <text class="zm-tabs__text" :style="[textStyle(index)]">{{ item[textKey] }}</text>
        </view>
        <view class="zm-tabs__line" :style="[lineStyle]"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import mixins from "../mixins"
import { useStyle, useUnit, useColor } from "../utils/style"
export default {
  name: "zm-tabs",
  mixins: [mixins],
  props: {
    value: { type: [String, Number], default: "" },
    list: { type: Array, default: () => [] },
    height: { type: [String, Number], default: "" },
    sticky: { type: Boolean, default: false },
    scrollable: { type: Boolean, default: false },
    activeSize: { type: [String, Number], default: "" },
    activeColor: { type: String, default: "" },
    activeWeight: { type: [String, Number], default: "" },
    inactiveSize: { type: [String, Number], default: "" },
    inactiveColor: { type: String, default: "" },
    inactiveWeight: { type: [String, Number], default: "" },
    lineColor: { type: String, default: "" },
    lineWidth: { type: [String, Number], default: "" },
    lineHeight: { type: [String, Number], default: "" },
    lineRadius: { type: [String, Number], default: "" },
    tabMaxWidth: { type: [String, Number], default: "" },
    background: { type: String, default: "" },
    duration: { type: [String, Number], default: "" },
    offsetTop: { type: [String, Number], default: "0" },
    borderBottom: { type: Boolean, default: false },
    zIndex: { type: [String, Number], default: "" },
    textKey: { type: String, default: "text" },
    valueKey: { type: String, default: "value" },
    disabledKey: { type: String, default: "disabled" },
    customClass: { type: String, default: "" },
    customStyle: { type: [Object, String], default: "" }
  },
  data() {
    return {
      init: false,
      innerIndex: 0,
      tabsRect: [],
      lineRect: {},
      scrollRect: {},
      scrollLeft: 0
    }
  },
  computed: {
    wrapClass() {
      const list = []
      if (this.sticky) list.push("zm-tabs--sticky")
      if (this.scrollable) list.push("zm-tabs--scrollable")
      if (this.borderBottom) list.push("zm-tabs--border")
      return list
    },
    wrapStyle() {
      const style = {}
      style.zIndex = this.zIndex
      style.height = useUnit(this.height)
      style.background = useColor(this.background)
      if (this.sticky) {
        style.top = useUnit(this.offsetTop)
        style.position = "sticky"
      }
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    },
    tabStyle() {
      return () => {
        const style = {}
        style.maxWidth = useUnit(this.tabMaxWidth)
        return useStyle(style)
      }
    },
    textStyle() {
      return (index) => {
        const style = {}
        if (this.innerIndex === index) {
          style.color = useColor(this.activeColor)
          style.fontSize = useUnit(this.activeSize)
          style.fontWeight = this.activeWeight
        } else {
          style.color = useColor(this.inactiveColor)
          style.fontSize = useUnit(this.inactiveSize)
          style.fontWeight = this.inactiveWeight
        }
        return useStyle(style)
      }
    },
    lineStyle() {
      const style = {}
      style.width = useUnit(this.lineWidth)
      style.height = useUnit(this.lineHeight)
      style.background = useColor(this.lineColor)
      style.borderRadius = useUnit(this.lineRadius)
      style.transitionDuration = this.duration
      const tabRect = this.tabsRect[this.innerIndex]
      if (tabRect) {
        let left = 0
        if (this.lineWidth == "100%") {
          left = tabRect.left - this.scrollRect.left
          style.width = tabRect.width + "px"
        } else {
          left = tabRect.left + (tabRect.width - this.lineRect.width) / 2 - this.scrollRect.left
        }
        style.transform = `translate(${left}px)`
      }
      if (this.init) style.visibility = "visible"
      return useStyle(style)
    }
  },
  watch: {
    list: {
      handler(val) {
        if (val?.length) this.resize()
      },
      deep: true
    },
    value: {
      handler(val) {
        const index = this.list.findIndex((item) => item[this.valueKey] === val)
        this.innerIndex = index >= 0 ? index : 0
      },
      deep: true,
      immediate: true
    },
    innerIndex: {
      handler(index) {
        const tabRect = this.tabsRect[index]
        this.scrollLeft = (tabRect?.left || 0) + (tabRect?.width || 0) / 2 - this.scrollRect.width / 2
        this.$emit("input", this.list[index][this.valueKey])
        this.$emit("change", this.list[index], index)
      }
    }
  },
  mounted() {
    this.resize()
  },
  methods: {
    async resize() {
      await this.$nextTick()
      this.tabsRect = await this.useRect(".zm-tabs__tab", true)
      this.lineRect = await this.useRect(".zm-tabs__line")
      this.scrollRect = await this.useRect(".zm-tabs__scroll")
      this.init = true
    },
    onClickTab(index) {
      if (this.list[index][this.disabledKey]) return
      this.innerIndex = index
      this.$emit("click-tab", this.list[index])
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-tabs {
  width: 100%;
  height: 88rpx;
  display: flex;
  z-index: 1;
  position: relative;
  background-color: #fff;
  &--border::after {
    left: 0;
    width: 100%;
    bottom: 0;
    content: "";
    position: absolute;
    border-bottom: 1rpx solid #eee;
  }
  &--scrollable {
    .zm-tabs__tab {
      flex: 1 0 auto;
    }
  }
  &__scroll {
    flex: 1;
    display: flex;
    position: relative;
  }
  &__list {
    flex: 1;
    height: 100%;
    display: flex;
    position: relative;
  }
  &__tab {
    flex: 1;
    display: flex;
    padding: 0 24rpx;
    position: relative;
    align-items: center;
    justify-content: center;
    &.is-active {
      .zm-tabs__text {
        color: var(--theme-color);
      }
    }
    &.is-disabled {
      opacity: 0.5;
    }
  }
  &__text {
    font-size: 28rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    transition: all 0.3s ease;
  }
  &__line {
    bottom: 0;
    width: 40rpx;
    height: 6rpx;
    position: absolute;
    visibility: hidden;
    border-radius: 9999rpx;
    transition: all 0.3s ease-out;
    background-color: var(--theme-color);
  }
}
</style>
