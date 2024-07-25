<template>
  <view class="zm-calendar-header" :class="[classs, customClass]" :style="[style]">
    <view class="zm-calendar-header__switch">
      <view class="zm-calendar-header__action" @click="prevYear">
        <zm-icon name="arrow-double-left" size="28rpx"></zm-icon>
      </view>
      <view class="zm-calendar-header__action" @click="prevMonth">
        <zm-icon name="arrow-left" size="28rpx"></zm-icon>
      </view>
      <view class="zm-calendar-header__title">{{ date }}</view>
      <view class="zm-calendar-header__action" @click="nextMonth">
        <zm-icon name="arrow" size="28rpx"></zm-icon>
      </view>
      <view class="zm-calendar-header__action" @click="nextYear">
        <zm-icon name="arrow-double-right" size="28rpx"></zm-icon>
      </view>
    </view>
    <view class="zm-calendar-header__weekdays">
      <view class="zm-calendar-header__weekday" v-for="(weekday, index) in weekdays" :key="index">{{ weekday }}</view>
    </view>
  </view>
</template>
<script setup lang="ts">
import dayjs, { Dayjs, UnitType } from "dayjs"
import { isArray, isEmpty } from "../utils/check"
import { calendarEmits, calendarProps, CalendarDate } from "./index"
import { diffDay, diffMonth, getMonthByOffset } from "../utils/date"
import { useStyle, useColor, useUnit, useParent } from "../hooks"

defineOptions({ name: "zm-calendar" })

const props = defineProps(calendarProps)
const emits = defineEmits(calendarEmits)

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  return list
})

const weekdays = computed(() => {
  const list = ["日", "一", "二", "三", "四", "五", "六"]
  return [...list.slice(+props.firstDayOfWeek, 7), ...list.slice(0, +props.firstDayOfWeek)]
})

function prevYear() {
  emits("change", dayjs(props.date).subtract(1, "year").format("YYYY-MM-DD"))
}
function nextYear() {
  emits("change", dayjs(props.date).add(1, "year").format("YYYY-MM-DD"))
}
function prevMonth() {
  emits("change", dayjs(props.date).subtract(1, "month").format("YYYY-MM-DD"))
}
function nextMonth() {
  emits("change", dayjs(props.date).add(1, "month").format("YYYY-MM-DD"))
}

defineExpose({ name: "zm-calendar" })
</script>
<script lang="ts">
export default {
  name: "zm-calendar",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-calendar-header {
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
