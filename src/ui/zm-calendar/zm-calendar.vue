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
import zmCalendarMonth from "./zm-calendar-month.vue"
import zmCalendarHeader from "./zm-calendar-header.vue"
import zmCalendarFooter from "./zm-calendar-footer.vue"
import dayjs from "dayjs"
import { clone } from "../utils/utils"
import { isArray, isEmpty } from "../utils/check"
import { diffDate, getDateByOffset } from "../utils/date"
import { useStyle, useColor, useUnit, useParent, useChildren } from "../hooks"
import { calendarKey, calendarEmits, calendarProps, CalendarDate } from "./index"

defineOptions({ name: "zm-calendar" })

const props = defineProps(calendarProps)
const emits = defineEmits(calendarEmits)
const { linkChildren } = useChildren(calendarKey)

const date = ref<CalendarDate | CalendarDate[]>("")
const month = ref<CalendarDate | CalendarDate[]>("")
const panelDate = ref<CalendarDate | CalendarDate[]>("")

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const months = computed(() => {
  const list: any[] = []
  if (!minDate.value || !maxDate.value) return list
  let cursor = dayjs(minDate.value).date(1)
  do {
    list.push(cursor.format("YYYY-MM-DD"))
    cursor = cursor.month(cursor.month() + 1)
  } while (cursor.diff(maxDate.value, "month") < 0)
  return list
})

const minDate = computed(() => {
  if (isEmpty(props.minDate) && props.switchMode === "default") return getToday()
  return getDate(props.minDate)
})

const maxDate = computed(() => {
  if (isEmpty(props.maxDate) && props.switchMode === "default") return getDateByOffset(getToday(), 6, "month")
  return getDate(props.maxDate)
})

function init() {
  date.value = getInitialDate()
  month.value = getInitialDate()
  panelDate.value = getInitialPanelDate()
}

function select(val: string | string[]) {
  const setDate = (val: string | string[]) => {
    date.value = val
    emits("select", clone(val))
  }

  if (props.mode === "range") {
    const valid = checkDateRange(val as [string, string])
    if (!valid) {
      setDate([(val as string[])[0], getDateByOffset((val as string[])[0], +props.maxRange - 1), "day"])
      return
    }
  }

  setDate(val)
}

function onClickDay(day: any) {
  if (props.readonly) return
  if (props.mode === "range") {
    if (isEmpty(date.value)) {
      select([day.date])
      return
    }
    if (isArray(date.value)) {
      const [start, end] = date.value
      if (start && !end) {
        // if (diffDate(day.date, start, "day") === 1) {
        //   const disabledDay = getDisabledDate(disabledDays.value, startDay, date)
        //   if (disabledDay) {
        //     const endDay = getPrevDay(disabledDay)
        //     if (compareDay(startDay, endDay) === -1) {
        //       select([startDay, endDay])
        //     } else {
        //       select([date])
        //     }
        //   } else {
        //     select([startDay, date], true)
        //   }
        // } else if (compareToStart === -1) {
        //   select([date])
        // } else if (props.allowSameDay) {
        //   select([date, date], true)
        // }
      } else {
        select([day.date])
      }
    } else {
      select([day.date])
    }
  }
  if (props.mode === "range") {
  }
}

function onPanelChange(date: string) {
  panelDate.value = date
}

// 校验日期区间
function checkDateRange(date: [string, string]) {
  const { maxRange } = props
  if (maxRange && diffDate(date[0], date[1]) > +maxRange) {
    emits("overRange")
    return false
  }
  return true
}

function getDate(date: CalendarDate) {
  return dayjs(date).format("YYYY-MM-DD")
}

function getToday() {
  return dayjs().format("YYYY-MM-DD")
}

function getInitialDate(date = props.defaultDate) {
  const today = getToday()
  const { mode, allowSameDay } = props

  if (isEmpty(date)) return date

  if (mode === "range") {
    if (!isArray(date)) date = []
    const min = minDate.value
    const max = maxDate.value
    const start = getDate(date[0]) || today
    const end = getDate(date[1]) || (allowSameDay ? today : getDateByOffset(today, 1, "day"))
    const startDate = getLimitDateRange(start, min, allowSameDay ? max : getDateByOffset(max, -1, "day"))
    const endDate = getLimitDateRange(end, allowSameDay ? min : getDateByOffset(min, 1, "day"))
    return [startDate, endDate]
  }

  if (mode === "multiple") {
    return isArray(date) ? date.map((date) => getLimitDateRange(date)) : [getLimitDateRange(today)]
  }

  return getLimitDateRange(today)
}

function getInitialPanelDate() {
  const panel = isArray(date.value) ? date.value[0] : date.value
  return panel ? panel : getLimitDateRange(getToday())
}

function getLimitDateRange(date: string | Date, min = minDate.value, max = maxDate.value) {
  if (min && dayjs(date).isSame(dayjs(min), "day")) {
    return min
  }
  if (max && dayjs(date).isSame(dayjs(max), "day")) {
    return max
  }
  return date
}

onMounted(() => init())
linkChildren({ props, date, month, minDate, maxDate, panelDate })
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
