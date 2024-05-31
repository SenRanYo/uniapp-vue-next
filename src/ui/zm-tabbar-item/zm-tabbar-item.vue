<template>
  <view class="zm-tabbar-item" :class="{ 'zm-tabbar-item--active': model === name }" @click="onClick">
    <view class="zm-tabbar-item__icon" :style="[iconStyle]">
      <view class="zm-tabbar-item__icon__absolute">
        <slot name="icon">
          <zm-icon :name="icon" :size="iconSize" :weight="iconWeight" :custom-prefix="iconPrefix"></zm-icon>
        </slot>
      </view>
    </view>
    <view class="zm-tabbar-item__text"><slot></slot></view>
  </view>
</template>

<script setup lang="ts">
import { useStyle, useUnit, useColor } from "../hooks"
import { encodeParams, debounce } from "../utils/utils"

defineOptions({ name: "zm-tabbar-item" })
const props = defineProps({
  name: { type: [String, Number], default: "" },
  icon: { type: String, default: "" },
  iconSize: { type: [String, Number], default: "44rpx" },
  iconWeight: { type: [String, Number], default: "" },
  iconPrefix: { type: String, default: "" },
  route: { type: String, default: "" },
  routeParams: { type: Object, default: () => ({}) },
  routeType: { type: String, default: "switchTab" },
})

const tabbar = inject("zm-tabbar", null)
const model = computed(() => tabbar.modelValue.value)

const iconStyle = computed(() => {
  const style: any = {}
  style.height = useUnit(props.iconSize)
  style.fontSize = useUnit(props.iconSize)
  style.color = model.value === props.name ? useColor(tabbar.activeColor) : useColor(tabbar.inactiveColor)
  return useStyle(style)
})

function onClick() {
  if (tabbar) {
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    if (tabbar.route.value) {
      if (!props.route) {
        console.error("zm-tabbar-item: route is required")
        return
      } else if (props.route == page.route) {
        return
      }
      debounce(() => {
        uni[props.routeType]({
          url: `${props.route}${encodeParams(props.routeParams)}`,
          fail: (err: any) => {
            throw err
          },
        })
      }, 100)
    } else {
      tabbar.updateValue(props.name)
    }
  }
}

defineExpose({ name: "zm-tabbar-item" })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-tabbar-item {
  flex: 1;
  display: flex;
  color: #999;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &--active {
    color: var(--primary-color);
  }

  &__icon {
    height: 44rpx;
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 4rpx;
    justify-content: center;

    &__absolute {
      left: 50%;
      bottom: 0;
      z-index: 1;
      display: flex;
      position: absolute;
      transform: translateX(-50%);
    }
  }

  &__text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    align-items: center;
    justify-content: center;
  }
}
</style>
