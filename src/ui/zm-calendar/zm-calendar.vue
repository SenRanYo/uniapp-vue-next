<template>
  <view class="zm-calendar" :class="[customClass]" :style="[style]">
    <zm-calendar-header @change="onPanelChange"></zm-calendar-header>
    <view class="zm-calendar__body">
      <scroll-view class="zm-calendar__view" scroll-y enable-flex>
        <zm-calendar-month :date="month" v-for="(month, index) in months" :key="index"></zm-calendar-month>
      </scroll-view>
    </view>
    <zm-calendar-footer></zm-calendar-footer>
  </view>
</template>
<script setup lang="ts">
import dayjs from "dayjs"
import { clone } from "../utils/utils"
import { isArray, isEmpty } from "../utils/check"
import { useStyle, useChildren } from "../hooks"
import { diffDate, getDateByOffset } from "../utils/date"
import { calendarKey, calendarEmits, calendarProps, CalendarDate, CalendarDay } from "./index"
import zmCalendarMonth from "./zm-calendar-month.vue"
import zmCalendarHeader from "./zm-calendar-header.vue"
import zmCalendarFooter from "./zm-calendar-footer.vue"

const props = defineProps(calendarProps)
const emits = defineEmits(calendarEmits)
const { linkChildren } = useChildren(calendarKey)

const today = ref("")
const currentDate = ref<CalendarDate | CalendarDate[]>("")
const currentmonth = ref<CalendarDate | CalendarDate[]>("")
const currentPanelDate = ref<CalendarDate>("")

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const months = computed(() => {
  const list: any[] = []
  if (props.switchMode === "default") {
    let cursor = dayjs(minDate.value).date(1)
    do {
      list.push(cursor.format("YYYY-MM-DD"))
      cursor = cursor.month(cursor.month() + 1)
    } while (cursor.diff(maxDate.value, "month") < 0)
  } else {
    list.push(getDate(currentPanelDate.value))
  }
  return list
})

// 最小日期
const minDate = computed(() => {
  let date = getDate(props.minDate)
  if (isEmpty(props.minDate) && props.switchMode === "default") date = today.value
  return date
})

// 最大日期
const maxDate = computed(() => {
  let date = getDate(props.maxDate)
  if (isEmpty(props.maxDate) && props.switchMode === "default") date = getDateByOffset(today.value, 6, "month")
  return date
})

// 点击日期
function onClickDay(day: CalendarDay) {
  if (props.readonly) return
  if (props.mode === "range") {
    rangeSelect(day)
  } else if (props.mode === "multiple") {
    multipleSelect(day)
  } else {
    singleSelect(day)
  }
}

// 面板日期改变
function onPanelChange(date: string) {
  currentPanelDate.value = date
}

function getDate(date: CalendarDate) {
  return date ? dayjs(date).format("YYYY-MM-DD") : ""
}

// 初始化
function init() {
  today.value = dayjs().format("YYYY-MM-DD")
  currentDate.value = initDate()
  currentmonth.value = initDate()
  currentPanelDate.value = initPanelDate()
}

// 初始化日期
function initDate(date = props.defaultDate) {
  if (date === null) return date
  const { mode, allowSameDay } = props
  if (mode === "range") {
    if (!isArray(date)) date = []
    const min = minDate.value
    const max = maxDate.value
    const start = getDate(date[0]) || today.value
    const end = getDate(date[1]) || (allowSameDay ? today.value : getDateByOffset(today.value, 1, "day"))
    const startDate = limitDateRange(start, min, allowSameDay ? max : getDateByOffset(max, -1, "day"))
    const endDate = limitDateRange(end, allowSameDay ? min : getDateByOffset(min, 1, "day"))
    return [startDate, endDate]
  }

  if (mode === "multiple") {
    return isArray(date) ? date.map((date) => limitDateRange(date)) : [limitDateRange(today.value)]
  }

  return limitDateRange(today.value)
}

// 初始化面板时间
function initPanelDate() {
  const panel = isArray(currentDate.value) ? currentDate.value[0] : currentDate.value
  return panel ? panel : limitDateRange(today.value)
}

// 日期区间限制
function limitDateRange(date: string | Date, min = minDate.value, max = maxDate.value) {
  if (min && dayjs(date).isSame(dayjs(min), "day")) {
    return min
  }
  if (max && dayjs(date).isSame(dayjs(max), "day")) {
    return max
  }
  return date
}

// 单项选择
function singleSelect(day: CalendarDay) {
  currentDate.value = day.date
  emits("select", clone(day.date))
}

// 区间选择
function rangeSelect(day: CalendarDay) {
  const { date } = day
  const { maxRange, allowSameDay } = props

  // 设置选中日期
  const setDate = (val: CalendarDate[]) => {
    const diff = diffDate(date[0], date[1])
    if (maxRange && diff > +maxRange) {
      currentDate.value = [val[0], getDateByOffset(val[0], +maxRange - 1), "day"]
      emits("select", clone(currentDate.value))
      emits("overRange")
    } else {
      currentDate.value = val
      emits("select", clone(val))
    }
  }

  if (isArray(currentDate.value)) {
    const [start, end] = currentDate.value
    // 如果只有开始日期
    if (start && !end) {
      // 比较点击日期和开始日期的天数
      const diff = diffDate(date, start, "day")
      if (diff > 0) {
        setDate([start, date])
      } else if (diff < 0) {
        setDate([date])
      } else if (allowSameDay) {
        setDate([date, date])
      }
    } else {
      setDate([date])
    }
  } else {
    setDate([date])
  }
}

// 多选选择
function multipleSelect(day: CalendarDay) {
  const { date } = day
  // 设置选中日期
  const setDate = (dates: CalendarDate[]) => {
    if (props.maxRange && dates.length > +props.maxRange) {
      emits("overRange")
    } else {
      currentDate.value = dates
      emits("select", clone(dates))
    }
  }

  if (isArray(currentDate.value)) {
    const dates = currentDate.value
    const selectedIndex = dates.findIndex((dateItem) => diffDate(dateItem, date) === 0)
    if (selectedIndex > -1) {
      const [unselectedDate] = dates.splice(selectedIndex, 1)
      emits("unselect", clone(unselectedDate))
    } else {
      setDate([...dates, date])
    }
  } else {
    setDate([date])
  }
}

onMounted(() => init())
linkChildren({ props, currentDate, currentmonth, minDate, maxDate, currentPanelDate })
defineExpose({ name: "zm-calendar" })
defineOptions({ name: "zm-calendar" })
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
    flex-direction: column;
  }
}
</style>
