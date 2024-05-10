<template>
  <view v-if="show" class="zm-empty" :class="[customClass]" :style="[style]">
    <slot name="icon">
      <image class="zm-empty__icon" :src="icon" mode="widthFix" :style="[iconStyle]"></image>
    </slot>
    <slot name="text">
      <text class="zm-empty__text" :style="[textStyle]">{{ text }}</text>
    </slot>
    <view class="zm-empty__slot">
      <slot></slot>
    </view>
  </view>
</template>

<script>
import weixin from "@/mixins/weixin"
import { useUnit, useColor, useStyle } from "@/utils/style"
export default {
  name: "zm-empty",
  mixins: [weixin],
  props: {
    show: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: "/static/empty/zwsj-empty.png"
    },
    text: {
      type: String,
      default: "暂无数据~"
    },
    textSize: {
      type: [String, Number],
      default: ""
    },
    textColor: {
      type: String,
      default: ""
    },
    textWeight: {
      type: [String, Number],
      default: ""
    },
    iconSize: {
      type: [String, Number],
      default: ""
    },
    iconColor: {
      type: String,
      default: ""
    },
    iconWeight: {
      type: [String, Number],
      default: ""
    },
    iconWidth: {
      type: [String, Number],
      default: ""
    },
    iconHeight: {
      type: [String, Number],
      default: ""
    },
    margin: {
      type: [String, Number],
      default: ""
    },
    padding: {
      type: [String, Number],
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
    return {}
  },
  computed: {
    style() {
      return useStyle({
        margin: useUnit(this.margin),
        padding: useUnit(this.padding),
        ...useStyle(this.customStyle)
      })
    },
    iconStyle() {
      const style = {}
      style.color = useColor(this.iconColor)
      style.width = useUnit(this.iconSize || this.iconWidth)
      style.height = useUnit(this.iconSize || this.iconHeight)
      style.fontWeight = this.iconWeight
      return useStyle(style)
    },
    textStyle() {
      const style = {}
      style.color = useColor(this.textColor)
      style.fontSize = useUnit(this.textSize)
      style.fontWeight = this.textWeight
      return useStyle(style)
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.zm-empty {
  flex: 1;
  display: flex;
  flex-shrink: 0;
  padding: 96rpx 0;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &__icon {
    width: 580rpx;
    height: 310rpx;
  }

  &__text {
    color: #999999;
    font-size: 26rpx;
    margin-top: 24rpx;
  }
  &__slot {
    margin-top: 24rpx;
  }
}
</style>
