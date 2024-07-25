<template>
  <view class="zm-calendar" :class="[classs, customClass]" :style="[style]">
    <view class="zm-calendar__header">
      <view class="zm-calendar__switch">
        <view class="zm-calendar__action" @click="getPrevYear">
          <zm-icon name="arrow-double-left" size="28rpx"></zm-icon>
        </view>
        <view class="zm-calendar__action">
          <zm-icon name="arrow-left" size="28rpx"></zm-icon>
        </view>
        <view class="zm-calendar__subtitle">{{ subtitle }}</view>
        <view class="zm-calendar__action">
          <zm-icon name="arrow" size="28rpx"></zm-icon>
        </view>
        <view class="zm-calendar__action" @click="getNextYear">
          <zm-icon name="arrow-double-right" size="28rpx"></zm-icon>
        </view>
      </view>
      <view class="zm-calendar__weekdays">
        <view class="zm-calendar__weekday" v-for="(weekday, index) in weekdays" :key="index">{{ weekday }}</view>
      </view>
    </view>
    <view class="zm-calendar__body">
      <scroll-view class="zm-calendar__view" scroll-y>
        <view class="zm-calendar__month" v-for="(month, monthIndex) in months" :key="monthIndex">
          <view class="zm-calendar__title">{{ month.title }}</view>
          <view class="zm-calendar__days">
            <view class="zm-calendar__day" :class="[dayClass(day)]" v-for="(day, dayIndex) in month.days" :key="dayIndex">{{ day.day }}</view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="zm-calendar__footer">
      <zm-button round>确认</zm-button>
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

const subtitle = ref("2024年7月")
const currentDate = ref(getInitialDate())
const currentPanelDate = ref(getInitialPanelDate())

const style = computed(() => {
  const style: any = {}

  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  return list
})

const dayClass = computed(() => {
  return (day: any) => {
    const list: string[] = []
    if (day.state) list.push(`zm-calendar__day--${day.state}`)
    return list
  }
})

const minDate = computed(() => {
  if (isEmpty(props.minDate) && props.switchMode === "default") return getToday()
  return geDate(props.minDate)
})

const maxDate = computed(() => {
  if (isEmpty(props.maxDate) && props.switchMode === "default") return getToday().add(6, "month")
  return geDate(props.maxDate)
})

const months = computed(() => {
  const list: any[] = []
  if (!minDate.value || !maxDate.value) return list
  let cursor = minDate.value.clone()
  do {
    list.push({
      title: cursor.format("YYYY年M月"),
      days: Array.from({ length: cursor.daysInMonth() }, (_, i) => {
        return {
          day: cursor.date(i + 1).format("D"),
          date: cursor.date(i + 1).format("YYYY-MM-DD"),
          state: getDayType(cursor.date(i + 1)),
        }
      }),
    })
    cursor = cursor.month(cursor.month() + 1)
  } while (cursor.diff(maxDate.value, "month") < 0)
  return list
})

console.log(months.value)

const weekdays = computed(() => {
  const list = ["日", "一", "二", "三", "四", "五", "六"]
  return [...list.slice(+props.firstDayOfWeek, 7), ...list.slice(0, +props.firstDayOfWeek)]
})

const confirmDisabled = computed(() => {
  if (currentDate.value) {
    if (props.mode === "range") {
      return !(currentDate.value as Date[])[0] || !(currentDate.value as Date[])[1]
    }
    if (props.mode === "multiple") {
      return !(currentDate.value as Date[]).length
    }
  }
  return !currentDate.value
})

/**
 * 根据类型比较时间，返回时间的差值
 */
function diffDate(date1: CalendarDate, date2: CalendarDate, type: UnitType) {
  return dayjs(date1).diff(dayjs(date2), type)
}

function geDate(date: CalendarDate) {
  return dayjs(dayjs(date).format("YYYY-MM-DD"))
}

function getDays() {}

function getToday() {
  return dayjs(dayjs().format("YYYY-MM-DD"))
}

function getPrevDay(date: CalendarDate) {
  return dayjs(date).subtract(1, "day")
}
function getNextDay(date: CalendarDate) {
  return dayjs(date).add(1, "day")
}

function getPrevMonth() {}
function getNextMonth() {}

function getPrevYear() {}
function getNextYear() {}

function getInitialDate(defaultDate = props.defaultDate) {
  if (isEmpty(defaultDate)) return getToday()
  const now = getToday()

  if (props.mode === "range") {
    if (!isArray(defaultDate)) defaultDate = []
    const min = minDate.value
    const max = minDate.value
    const start = getLimitDateRange(defaultDate[0] || now, min, max ? (props.allowSameDay ? max : dayjs(max).subtract(1, "day")) : undefined)
    const end = getLimitDateRange(defaultDate[1] || (props.allowSameDay ? now : dayjs(now).add(1, "day")), min ? (props.allowSameDay ? min : dayjs(min).add(1, "day")) : undefined)
    return [start, end]
  }

  if (props.mode === "multiple") {
    if (isArray(defaultDate)) {
      return defaultDate.map((date) => getLimitDateRange(date))
    }
    return [getLimitDateRange(now)]
  }

  if (!defaultDate || isArray(defaultDate)) {
    defaultDate = now
  }
  return getLimitDateRange(defaultDate)
}

function getInitialPanelDate() {
  const date = isArray(currentDate.value) ? currentDate.value[0] : currentDate.value
  return date ? date : getLimitDateRange(getToday())
}

function getLimitDateRange(date: any, min = minDate.value, max = maxDate.value) {
  if (min && dayjs(date).isSame(dayjs(min), "day")) {
    return min
  }
  if (max && dayjs(date).isSame(dayjs(max), "day")) {
    return max
  }
  return date
}

function getDayType(day: CalendarDate) {
  if (diffDate(day, minDate.value, "day") < 0 || diffDate(day, maxDate.value, "day") > 0) {
    return "disabled"
  }

  if (isEmpty(currentDate.value)) {
    return ""
  }

  if (isArray(currentDate.value)) {
    if (props.mode === "multiple") {
      return getMultipleDayType(day)
    }
    if (props.mode === "range") {
      return getRangeDayType(day)
    }
  } else if (props.mode === "single") {
    return diffDate(day, currentDate.value, "day") === 0 ? "selected" : ""
  }
  return ""
}

/**
 * 获取多选模式下时间的选中类型
 */
function getMultipleDayType(day: CalendarDate) {
  // 判断当前日期是否被选中
  const isSelected = (date: CalendarDate) => currentDate.value.some((item: Dayjs) => dayjs(item).isSame(dayjs(date), "day"))

  // 如果当前日期被选中
  if (isSelected(day)) {
    // 获取前一天的日期
    const prevDay = getPrevDay(day)
    // 获取后一天的日期
    const nextDay = getNextDay(day)
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
  const [startDay, endDay] = currentDate.value

  if (!startDay) return ""

  if (!endDay) {
    return dayjs(day).isSame(dayjs(startDay)) ? "start" : ""
  }

  if (props.allowSameDay && dayjs(day).isSame(dayjs(startDay)) && dayjs(day).isSame(dayjs(endDay))) {
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

  return ""
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
.zm-calendar {
  flex: 1;
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    flex-direction: column;
    border-bottom: 1rpx solid #eee;
  }

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

  &__subtitle {
    flex: 1;
    font-size: 28rpx;
    text-align: center;
  }

  &__body {
    flex: 1;
    position: relative;
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

  &__title {
    height: 80rpx;
    font-size: 28rpx;
    text-align: center;
    font-weight: bold;
    line-height: 80rpx;
  }

  &__days {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
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

  &__footer {
    padding: 12rpx 24rpx;
  }
}
</style>
