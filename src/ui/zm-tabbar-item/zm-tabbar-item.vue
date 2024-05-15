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
import { encodeParams, debounce } from "../utils//utils"

const props = defineProps({
  name: { type: String, default: "" },
  icon: { type: String, default: "" },
  iconSize: { type: String, default: "24px" },
  iconWeight: { type: String, default: "normal" },
  iconPrefix: { type: String, default: "icon" },
  iconStyle: { type: String, default: "" },
  tabbarValue: { type: String, default: "" },
})

const tabbar = inject("zm-tabbar", null)
const model = computed(() => tabbar.modelValue.value)

watch(
  () => tabbar,
  (val) => {
    console.log(val)
  },
)

const iconStyle = computed(() => {
  const style: any = {}
  style.height = useUnit(props.iconSize)
  style.fontSize = useUnit(props.iconSize)
  // if (this.tabbar.value === this.name) style.color = useColor(this.tabbar.activeColor)
  // else style.color = useColor(this.tabbar.inactiveColor)
  return useStyle(style)
})

function resize() {}

function onClick() {
  if (tabbar) {
    tabbar.changeEvent(props.name)
  }
}

onMounted(() => resize())
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
