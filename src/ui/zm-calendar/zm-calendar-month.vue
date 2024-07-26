<template>
  <scroll-view class="zm-calendar__month" scroll-y enable-flex @scroll="onScroll">
    <view class="zm-calendar__month__item">
      <view class="zm-calendar__month__title" v-if="title">{{ title }}</view>
      <view class="zm-calendar__month__days">
        <view class="zm-calendar__month__day" :style="[dayStyle(day, index)]" :class="[dayClass(day)]" v-for="(day, index) in days" :key="index">{{ day.text }}</view>
      </view>
    </view>
  </scroll-view>
</template>
<script setup lang="ts">
import dayjs, { Dayjs, UnitType } from "dayjs"
import { isArray, isEmpty } from "../utils/check"
import { diffDate, getDateByOffset } from "../utils/date"
import { useStyle, useColor, useUnit, useParent } from "../hooks"
import { calendarKey, calendarMonthEmits, calendarMonthProps, CalendarDate, CalendarDay } from "./index"

defineOptions({ name: "zm-calendar" })

const props = defineProps(calendarMonthProps)
const emits = defineEmits(calendarMonthEmits)
const { parent: calendar } = useParent(calendarKey)

const dayStyle = computed(() => {
  return (day: CalendarDay, index: number) => {
    const style: any = {}
    if (index === 0) {
      const week = dayjs(day.date).day()
      const weeks = [0, 1, 2, 3, 4, 5, 6]
      const first = +calendar.props.firstDayOfWeek
      const realWeeks = [...weeks.slice(first, 7), ...weeks.slice(0, first)]
      const index = realWeeks.indexOf(week)
      style.gridColumnStart = index + 1
    }
    return useStyle(style)
  }
})

const dayClass = computed(() => {
  return (day: any) => {
    const list: string[] = []
    if (day.type) list.push(`zm-calendar__month__day--${day.type}`)
    return list
  }
})

const title = computed(() => {
  if (props.showTitle && props.switchMode === "default") {
    return dayjs(props.date).format("YYYY年MM月")
  }
  return ""
})

const days = computed(() => {
  const days: any[] = []
  for (let day = 1; day <= dayjs(props.date).daysInMonth(); day++) {
    const date = dayjs(props.date).date(day).format("YYYY-MM-DD")
    let config = { date, type: getDayType(date), text: day }
    // if (props.formatter) {
    //   config = props.formatter(config);
    // }
    days.push(config)
  }
  return days
})

function getDayType(day: CalendarDate) {
  const { mode } = calendar.props
  const { currentDate, minDate, maxDate } = calendar
  if (diffDate(day, minDate.value, "day") < 0 || diffDate(day, maxDate.value, "day") > 0) {
    return "disabled"
  }

  if (isEmpty(currentDate.value)) {
    return ""
  }

  if (isArray(currentDate.value)) {
    if (mode === "multiple") {
      return getMultipleDayType(day)
    }
    if (mode === "range") {
      return getRangeDayType(day)
    }
  } else if (mode === "single") {
    return diffDate(day, currentDate.value, "day") === 0 ? "selected" : ""
  }
  return ""
}

/**
 * 获取多选模式下时间的选中类型
 */
function getMultipleDayType(day: CalendarDate) {
  const { currentDate } = calendar
  // 判断当前日期是否被选中
  const isSelected = (date: CalendarDate) => isArray(currentDate) && currentDate.some((item: Dayjs) => dayjs(item).isSame(dayjs(date), "day"))

  // 如果当前日期被选中
  if (isSelected(day)) {
    // 获取前一天的日期
    const prevDay = getDateByOffset(day, -1)
    // 获取后一天的日期
    const nextDay = getDateByOffset(day, 1)
    // 判断前一天是否被选中
    const prevSelected = isSelected(prevDay)
    // 判断后一天是否被选中
    const nextSelected = isSelected(nextDay)
    // 如果前一天的日期和后一天的日期都被选中，则返回"multiple-middle"
    if (prevSelected && nextSelected) {
      return "multiple-middle"
    }
    // 如果前一天的日期被选中，则返回"end"
    if (prevSelected) {
      return "end"
    }
    // 如果后一天的日期被选中，则返回"start"
    if (nextSelected) {
      return "start"
    }
    // 如果前一天的日期和后一天的日期都没有被选中，则返回"multiple-selected"
    return "multiple-selected"
  }
  // 如果当前日期没有被选中，则返回空字符串
  return ""
}

function getRangeDayType(day: CalendarDate) {
  const { currentDate, allowSameDay } = props
  if (isArray(currentDate)) {
    const [startDay, endDay] = currentDate

    if (!startDay) return ""

    if (!endDay) {
      return dayjs(day).isSame(dayjs(startDay)) ? "start" : ""
    }

    if (allowSameDay && dayjs(day).isSame(dayjs(startDay)) && dayjs(day).isSame(dayjs(endDay))) {
      return "start-end"
    }
    if (dayjs(day).isSame(dayjs(startDay))) {
      return "start"
    }
    if (dayjs(day).isSame(dayjs(endDay))) {
      return "end"
    }
    if (dayjs(day).isAfter(dayjs(startDay), "day") && dayjs(day).isAfter(dayjs(endDay), "day")) {
      return "middle"
    }
  }
  return ""
}

function onScroll() {}

function onClickDay(day: any) {
  console.log(day)
}

defineExpose({ name: "zm-calendar-month" })
</script>
<script lang="ts">
export default {
  name: "zm-calendar",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-calendar__month {
  display: flex;
  flex-direction: column;

  &__title {
    height: 80rpx;
    font-size: 28rpx;
    text-align: center;
    font-weight: bold;
    line-height: 80rpx;
  }

  &__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  &__day {
    height: 120rpx;
    display: flex;
    font-size: 32rpx;
    position: relative;
    align-items: center;
    justify-content: center;

    &--selected {
      color: #fff;
      border-radius: 8rpx;
      background-color: var(--primary-color);
    }
  }
}
</style>
