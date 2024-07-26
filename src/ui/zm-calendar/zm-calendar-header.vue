<template>
  <view class="zm-calendar__header">
    <view class="zm-calendar__header__switch">
      <view class="zm-calendar__header__action" @click="prevYear">
        <zm-icon name="arrow-double-left" size="28rpx"></zm-icon>
      </view>
      <view class="zm-calendar__header__action" @click="prevMonth">
        <zm-icon name="arrow-left" size="28rpx"></zm-icon>
      </view>
      <view class="zm-calendar__header__title">{{ title }}</view>
      <view class="zm-calendar__header__action" @click="nextMonth">
        <zm-icon name="arrow" size="28rpx"></zm-icon>
      </view>
      <view class="zm-calendar__header__action" @click="nextYear">
        <zm-icon name="arrow-double-right" size="28rpx"></zm-icon>
      </view>
    </view>
    <view class="zm-calendar__header__weekdays">
      <view class="zm-calendar__header__weekday" v-for="(weekday, index) in weekdays" :key="index">{{ weekday }}</view>
    </view>
  </view>
</template>
<script setup lang="ts">
import dayjs from "dayjs"
import { useParent } from "../hooks"
import { getDateByOffset } from "../utils/date"
import { calendarKey, calendarHeaderEmits, calendarHeaderProps } from "./index"

defineOptions({ name: "zm-calendar-header" })

const props = defineProps(calendarHeaderProps)
const emits = defineEmits(calendarHeaderEmits)
const { parent: calendar } = useParent(calendarKey)

const title = computed(() => {
  return calendar.props.showTitle ? dayjs(calendar.month.value).format("YYYY年M月") : ""
})

const weekdays = computed(() => {
  const list = ["日", "一", "二", "三", "四", "五", "六"]
  return [...list.slice(+calendar.props.firstDayOfWeek, 7), ...list.slice(0, +calendar.props.firstDayOfWeek)]
})

function prevYear() {
  emits("change", getDateByOffset(calendar.panelDate.value, -1, "year"))
}
function nextYear() {
  emits("change", getDateByOffset(calendar.panelDate.value, 1, "year"))
}
function prevMonth() {
  emits("change", getDateByOffset(calendar.panelDate.value, -1, "month"))
}
function nextMonth() {
  emits("change", getDateByOffset(calendar.panelDate.value, 1, "month"))
}

defineExpose({ name: "zm-calendar-header" })
</script>
<script lang="ts">
export default {
  name: "zm-calendar-header",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-calendar__header {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1rpx solid #eee;

  &__switch {
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__action {
    height: 100%;
    display: flex;
    min-width: 60rpx;
    align-items: center;
    justify-content: center;
  }

  &__weekdays {
    display: flex;
    justify-content: space-between;
  }

  &__weekday {
    flex: 1;
    text-align: center;
    line-height: 60rpx;
  }

  &__title {
    flex: 1;
    font-size: 28rpx;
    text-align: center;
  }
}
</style>
