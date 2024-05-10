<template>
  <view v-if="show" class="zm-loading" :class="[loadingClass, customClass]" :style="[loadingStyle]">
    <view class="zm-loading__icon" :style="[iconStyle]">
      <slot name="icon">
        <view class="icon-spinner" :style="[iconStyle]">
          <view v-for="(item, index) in 12" :key="index" class="icon-spinner__dot"></view>
        </view>
      </slot>
    </view>
    <text v-if="$slots.default || text" class="zm-loading__text" :style="[textStyle]">
      <slot>{{ text }}</slot>
    </text>
  </view>
</template>

<script>
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
import { useStyle, useColor, useUnit } from "@/utils/style"
export default {
  name: "zm-loading",
  mixins: [hook, weixin],
  props: {
    show: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "spinner"
    },
    size: {
      type: [Number, String],
      default: ""
    },
    textSize: {
      type: [Number, String],
      default: ""
    },
    textColor: {
      type: String,
      default: ""
    },
    textWeight: {
      type: [Number, String],
      default: ""
    },
    vertical: {
      type: Boolean,
      default: false
    },
    customStyle: {
      type: [Object, String],
      default: () => ({})
    },
    customClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {}
  },
  computed: {
    loadingStyle() {
      const style = {}
      style.color = useColor(this.color)
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    },
    loadingClass() {
      const list = []
      list.push(`zm-loading--${this.type}`)
      if (this.vertical) list.push("zm-loading--vertical")
      return list
    },
    iconStyle() {
      const style = {}
      style.color = useColor(this.color)
      style.width = useUnit(this.size)
      style.height = useUnit(this.size)
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

<style scoped lang="scss">
.zm-loading {
  color: inherit;
  display: flex;
  font-size: inherit;
  align-items: center;
  justify-content: center;
  &--vertical {
    flex-direction: column;
    .zm-loading__text {
      margin: 16rpx 0 0;
    }
  }
  &__icon {
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-origin: center center;
    animation: rotate 0.8s linear infinite;
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(1turn);
      }
    }
    .icon-spinner {
      width: 1em;
      height: 1em;
      border-radius: 1em;
      display: inline-block;
      max-width: 100%;
      max-height: 100%;
      overflow: hidden;
      position: relative;
      vertical-align: middle;
      animation-timing-function: steps(12);
      @for $i from 1 through 12 {
        &__dot:nth-of-type(#{$i}) {
          transform: rotate($i * 30deg);
          opacity: 0 + 0.0625 * ($i - 1);
        }
      }
      &__dot {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        &:before {
          width: 2px;
          height: 25%;
          content: " ";
          margin: 0 auto;
          display: block;
          border-radius: 40%;
          background-color: currentColor;
        }
      }
    }
  }
  &__text {
    margin-left: 8rpx;
  }
}
</style>
