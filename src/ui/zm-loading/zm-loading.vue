<template>
  <view v-if="show" class="zm-loading" :class="[classs, props.customClass]" :style="[style]">
    <view class="zm-loading__icon" :style="[iconStyle]">
      <slot name="icon">
        <view class="icon-spinner" :style="[iconStyle]">
          <view v-for="(_, index) in 12" :key="index" class="icon-spinner__dot"></view>
        </view>
      </slot>
    </view>
    <text v-if="$slots.default || text" class="zm-loading__text" :style="[textStyle]">
      <slot>{{ text }}</slot>
    </text>
  </view>
</template>

<script setup lang="ts">
import { loadingEmits, loadingProps } from "./index"
import { useStyle, useColor, useUnit } from "../hooks"

defineOptions({ name: "zm-loading" })
const emits = defineEmits(loadingEmits)
const props = defineProps(loadingProps)

const style = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list = []
  list.push(`zm-loading--${props.type}`)
  if (props.vertical) list.push("zm-loading--vertical")
  return list
})

const iconStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.width = useUnit(props.size)
  style.height = useUnit(props.size)
  return useStyle(style)
})

const textStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.textColor)
  style.fontSize = useUnit(props.textSize)
  style.fontWeight = props.textWeight
  return useStyle(style)
})

defineExpose({ name: "zm-loading" })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
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

      100% {
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

        &::before {
          width: 2px;
          height: 25%;
          content: " ";
          margin: 0 auto;
          display: block;
          border-radius: 40%;
          background-color: currentcolor;
        }
      }
    }
  }

  &__text {
    margin-left: 8rpx;
  }
}
</style>
