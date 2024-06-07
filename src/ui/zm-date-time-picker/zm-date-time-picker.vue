<template>
  <view class="zm-date-picker" :class="[customClass]" :style="[style]">
    <slot name="header">
      <view class="zm-date-picker__header">
        <view class="zm-date-picker__header__cancel" @click="onCancel">
          <slot name="cancel">
            <zm-button text text-color="#969799">{{ cancelText }}</zm-button>
          </slot>
        </view>
        <view class="zm-date-picker__header__title">
          <slot name="title">
            {{ title }}
          </slot>
        </view>
        <view class="zm-date-picker__header__confirm" @click="onConfirm">
          <slot name="confirm">
            <zm-button text>{{ confirmText }}</zm-button>
          </slot>
        </view>
      </view>
    </slot>
    <view class="zm-date-picker__options">
      <picker-view :style="[viewStyle]" :value="selectedIndexes" :indicator-style="optionStyle" @change="onChange">
        <picker-view-column v-for="(column, columnIndex) in columns" :key="columnIndex">
          <view class="zm-date-picker__options__option" v-for="(item, itemIndex) in column" :key="itemIndex">{{ item.text }}</view>
        </picker-view-column>
      </picker-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import dayjs from "dayjs"
import { Dayjs } from "dayjs"
import { isDate } from "../utils/check"
import { padZero } from "../utils/utils"
import { useStyle, useUnit, useUnitToPx } from "../hooks"
import { datePickerEmits, datePickerProps, DatePickerColumnFilter, DatePickerColumnFormatter, DatePickerColumnType } from "./index"

defineOptions({ name: "zm-date-picker" })

const emits = defineEmits(datePickerEmits)
const props = defineProps(datePickerProps)

const maps = [
  { column: "year", dayjs: "year" },
  { column: "month", dayjs: "month" },
  { column: "day", dayjs: "date" },
  { column: "hour", dayjs: "hour" },
  { column: "minute", dayjs: "minute" },
  { column: "second", dayjs: "second" },
]
const date = ref(dayjs())
const selectedValues = ref<any>([])
const selectedIndexes = ref<any>([])

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const viewStyle = computed(() => {
  const style: any = {}
  style.height = useUnitToPx(props.columnHeight) * +props.visibleColumnNum + "px"
  return useStyle(style)
})

const optionStyle = computed(() => {
  const style: any = {}
  style.height = useUnit(props.columnHeight)
  return useStyle(style, "string")
})

const columns = computed(() =>
  props.columns.map((type) => {
    switch (type) {
      case "year":
        return genYearColumns()
      case "month":
        return genMonthColumns()
      case "day":
        return genDayColumns()
      case "hour":
        return genHourColumns()
      case "minute":
        return genMinuteColumns()
      case "second":
        return genSecondColumns()
    }
  }),
)

const minDate = computed(() => {
  return props.minDate || dayjs().subtract(10, "year")
})

const maxDate = computed(() => {
  return props.maxDate || dayjs().add(10, "year")
})

watch(() => props.modelValue, init, { immediate: true })

function isMin(types: DatePickerColumnType[] = []) {
  return types.every((type) => selectedValues.value[props.columns.indexOf(type)] === getDateValue(type, minDate.value))
}

function isMax(types: DatePickerColumnType[] = []) {
  let is = true
  types.forEach((type) => {
    is = selectedValues.value[props.columns.indexOf(type)] === getDateValue(type, maxDate.value)
  })

  return types.every((type) => selectedValues.value[props.columns.indexOf(type)] === getDateValue(type, maxDate.value))
}

function genColumn<T extends string>(min: number, max: number, type: T, formatter: DatePickerColumnFormatter, filter?: DatePickerColumnFilter, values?: string[]) {
  const times = <T,>(n: number, iteratee: (index: number) => T) => {
    if (n < 0) return []
    const result: T[] = Array(n)
    let index = -1
    while (++index < n) result[index] = iteratee(index)
    return result
  }
  const options = times(max - min + 1, (index) => {
    const value = padZero(min + index)
    return formatter(type, { text: value, value })
  })
  return filter ? filter(type, options, values!) : options
}

function genYearColumns() {
  const min = dayjs(minDate.value).year()
  const max = dayjs(maxDate.value).year()
  return genColumn(min, max, "year", props.columnFormatter, props.columnFilter)
}

function genMonthColumns() {
  const min = isMin(["year"]) ? dayjs(minDate.value).month() + 1 : 1
  const max = isMax(["year"]) ? dayjs(maxDate.value).month() + 1 : 12
  return genColumn(min, max, "month", props.columnFormatter, props.columnFilter)
}

function genDayColumns() {
  const min = isMin(["year", "month"]) ? dayjs(minDate.value).date() : 1
  const max = isMax(["year", "month"]) ? dayjs(maxDate.value).endOf("date").date() : dayjs(date.value).set("year", date.value.year()).set("month", date.value.month()).daysInMonth()
  return genColumn(min, max, "day", props.columnFormatter, props.columnFilter)
}

function genHourColumns() {
  const min = isMin(["year", "month", "day"]) ? dayjs(minDate.value).hour() : 0
  const max = isMax(["year", "month", "day"]) ? dayjs(maxDate.value).hour() : 23
  return genColumn(min, max, "hour", props.columnFormatter, props.columnFilter)
}

function genMinuteColumns() {
  const min = isMin(["year", "month", "day", "hour"]) ? dayjs(minDate.value).minute() : 0
  const max = isMax(["year", "month", "day", "hour"]) ? dayjs(maxDate.value).minute() : 59
  return genColumn(min, max, "minute", props.columnFormatter, props.columnFilter)
}

function genSecondColumns() {
  const min = isMin(["year", "month", "day", "hour", "minute"]) ? dayjs(minDate.value).second() : 0
  const max = isMax(["year", "month", "day", "hour", "minute"]) ? dayjs(maxDate.value).second() : 59
  return genColumn(min, max, "second", props.columnFormatter, props.columnFilter)
}

function init() {
  if (props.modelValue) {
    const arr = dataTimeSplit(props.modelValue)
    if (arr.length < props.columns.length) throw new Error(`date-time-picker: ${props.modelValue} 值不符合columns类型 `)
    maps.map((map: any) => {
      const index = props.columns.findIndex((column) => column === map.column)
      const value = map.dayjs === "month" ? +arr[index] - 1 : +arr[index]
      if (index >= 0) date.value = date.value.set(map.dayjs, value)
    })
    selectedValues.value = props.columns.map((column) => getDateValue(column, date.value))
  } else {
    selectedValues.value = props.columns.map((column) => getDateValue(column, date.value))
  }

  selectedIndexes.value = props.columns.map((column) => getDateIndex(column, getDateValue(column, date.value)))
}

function setCurrentDate() {
  props.columns.forEach((column, index) => {
    const type: any = maps.find((map) => map.column === column).dayjs
    date.value = date.value.set(type, type === "month" ? selectedValues.value[index] - 1 : selectedValues.value[index])
  })
}

function dataTimeSplit(date: any) {
  if (isDate(date)) {
    return dayjs(date)
      .format("YYYY-MM-DD HH:mm:ss")
      .split(/[\s\/:-]/)
  } else {
    return date.split(/[\s\/:-]/)
  }
}

function getDateValue(type: DatePickerColumnType, date: Date | string | number | Dayjs) {
  const handler = {
    year: dayjs(date).year(),
    month: dayjs(date).month() + 1,
    day: dayjs(date).date(),
    hour: dayjs(date).hour(),
    minute: dayjs(date).minute(),
    second: dayjs(date).second(),
  }
  return padZero(handler[type])
}

function getDateIndex(type: DatePickerColumnType, value: string) {
  const columnIndex = props.columns.indexOf(type)
  const valueIndex = columns.value[columnIndex].findIndex((item) => item.value === value)
  return Math.max(valueIndex, 0)
}

function onCancel() {
  emits("cancel", { value: date.value.format(props.format), selectedValues: toRaw(selectedValues.value), selectedIndexes: toRaw(selectedIndexes.value) })
}

function onConfirm() {
  emits("confirm", { value: date.value.format(props.format), selectedValues: toRaw(selectedValues.value), selectedIndexes: toRaw(selectedIndexes.value) })
}

function onChange(data: any) {
  selectedIndexes.value = data.detail.value
  selectedValues.value = columns.value.map((column, index) => column[data.detail.value[index]].value)
  setCurrentDate()
  emits("update:modelValue", date.value.format(props.format))
  emits("change", { value: date.value.format(props.format), selectedValues: toRaw(selectedValues.value), selectedIndexes: toRaw(selectedIndexes.value) })
}

defineExpose({ name: "zm-date-picker" })
</script>
<script lang="ts">
export default {
  name: "zm-date-picker",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-date-picker {
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    padding: 24rpx;
    align-items: center;
    justify-content: space-between;

    &__title {
      font-size: 28rpx;
      font-weight: bold;
    }
  }

  &__options {
    z-index: 1;
    position: relative;

    &__option {
      display: flex;
      font-size: 28rpx;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
