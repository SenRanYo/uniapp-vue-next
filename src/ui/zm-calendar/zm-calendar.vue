<template>
  <view class="zm-calendar" :class="[classs, customClass]" :style="[style]">
    <view class="zm-calendar__header">
      <view class="zm-calendar__switch">
        <view class="zm-calendar__action">
          <zm-icon name="arrow-double-left"></zm-icon>
        </view>
        <view class="zm-calendar__action">
          <zm-icon name="arrow-left"></zm-icon>
        </view>
        <view class="zm-calendar__subtitle">{{ subtitle }}</view>
        <view class="zm-calendar__action">
          <zm-icon name="arrow"></zm-icon>
        </view>
        <view class="zm-calendar__action">
          <zm-icon name="arrow-double-right"></zm-icon>
        </view>
      </view>
    </view>
    <view class="zm-calendar__body">
      <scroll-view class="zm-calendar__view" scroll-y></scroll-view>
    </view>
    <view class="zm-calendar__footer"></view>
  </view>
</template>
<script setup lang="ts">
import { calendarEmits, calendarProps } from "./index"
import { useStyle, useColor, useUnit, useParent } from "../hooks"

defineOptions({ name: "zm-calendar" })

const slots = useSlots()
const props = defineProps(calendarProps)
const emits = defineEmits(calendarEmits)

const subtitle = ref("")

const style = computed(() => {
  const style: any = {}

  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  return list
})

defineExpose({ name: "zm-calendar" })
</script>
<script lang="ts">
export default {
  name: "zm-calendar",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-calendar {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1rpx solid red;

  &__header {
    display: flex;
    flex-direction: column;
  }

  &__switch {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__subtitle {
    flex: 1;
  }

  &__body {
    flex: 1;
    position: relative;
    border: 1rpx solid green;
  }

  &__view {
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    display: flex;
    position: absolute;
    overflow-anchor: none;
  }
}
</style>
