<template>
  <view class="zm-picker" :class="[customClass]" :style="[style]">
    <view class="zm-picker__header"></view>
    <picker-view class="zm-picker__view" :style="[viewStyle]" :indicator-style="indicatorStyle" :value="selectedIndexs"
      @change="onChange">
      <picker-view-column class="zm-picker__columns" v-for="(column, columnIndex) in columns" :key="columnIndex">
        <view class="zm-picker__columns__column" v-for="(item, index) in column" :key="index">{{ item[textKey] }}</view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script setup lang="ts">
import { clamp, merge } from "../utils/utils"
import { isNoEmpty } from "../utils/check"
import { useStyle, useUnit, useUnitToPx } from "../hooks"
import { PickerViewOnChangeEvent } from "@uni-helper/uni-app-types/index"
import { pickerEmits, pickerProps, PickerColumn, PickerColumnFields } from "./index"

defineOptions({ name: "zm-picker" })

const emits = defineEmits(pickerEmits)
const props = defineProps(pickerProps)

const selectedValues = ref([])
const selectedIndexs = ref<any>([])
const oldSelectedIndexs = ref<any>([])
const { text: textKey, value: valueKey, children: childrenKey } = props.columnsFields

const type = computed(() => getColumnsType(props.columns, fields.value))
const fields = computed(() => merge({ text: "text", value: "value", children: "children" }, props.columnsFields))
const columns = computed<PickerColumn[]>(() => {
  const { columns } = props
  switch (type.value) {
    case "multiple":
      return columns
    case "cascade":
      console.log(formatCascadeColumns(columns, fields.value, selectedValues.value));
      return formatCascadeColumns(columns, fields.value, selectedValues.value)
    default:
      return [columns]
  }
})

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const viewStyle = computed(() => {
  const style: any = {}
  style.height = useUnitToPx(props.columnHeight) * +props.visibleColumnNum + "px"
  return useStyle(style, "string")
})

const indicatorStyle = computed(() => {
  const style: any = {}
  style.height = useUnit(props.columnHeight)
  return useStyle(style, "string")
})

watch(
  () => props.modelValue,
  (val) => {
    selectedValues.value = val
  },
  { immediate: true },
)

function setValue(index: number, value: string | number) {
  if (selectedValues.value[index] !== value) {
    const newValues = selectedValues.value.slice(0)
    newValues[index] = value
    selectedValues.value = newValues
  }
}

function onChange(data: PickerViewOnChangeEvent) {
  const value = data.detail.value
  const index = Math.max(value.findIndex((value, index) => value !== oldSelectedIndexs.value[index]), 0)
  setValue(index, columns.value[index][value[index]][valueKey])

  if (type.value === "cascade") {
    selectedValues.value.forEach((value, index) => {
      const column = columns.value[index]
      if (!findColumnByValue(column, value)) {
        setValue(index, columns.value.length ? column[0][valueKey] : "")
      }
    })
  }
  updateSelectedIndexs()
}

function updateSelectedIndexs() {
  selectedIndexs.value = columns.value.map((column, index) => {
    const findIndex = column.findIndex((item: PickerColumn) => item[valueKey] === selectedValues.value[index])
    return Math.max(findIndex, 0)
  })
  oldSelectedIndexs.value = selectedIndexs.value
}

function getColumnsType(columns: PickerColumn[], fields: PickerColumnFields) {
  const firstColumn = columns[0]
  if (firstColumn) {
    if (Array.isArray(firstColumn)) return "multiple"
    if (fields.children in firstColumn) return "cascade"
  }
  return "default"
}

function findColumnByValue(columns: any, value: string | number): PickerColumn | undefined {
  return columns?.find((column: PickerColumn) => column[fields.value] === value)
}

function formatCascadeColumns(columns: PickerColumn[], fields: PickerColumnFields, selectedValues: (string | number)[]) {
  const formatted: PickerColumn[] = []

  let index = 0
  let column = { [fields.children]: columns }
  while (column && column[fields.children]) {
    const value = selectedValues[index]
    const children = column[fields.children]
    column = isNoEmpty(value) ? findColumnByValue(children, value) : undefined

    if (!column && children.length) {
      column = findColumnByValue(children, columns[0]?.[fields.value])
    }

    index++
    formatted.push(children)
  }

  return formatted
}

onMounted(() => updateSelectedIndexs())
defineExpose({ name: "zm-picker" })
</script>
<script lang="ts">
export default {
  name: "zm-picker",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-picker {
  display: flex;
  flex-direction: column;

  .zm-picker__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__columns {
    &__column {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
