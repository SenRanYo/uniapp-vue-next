<template>
  <view class="zm-picker" :class="[customClass]" :style="[style]">
    <slot name="header">
      <view class="zm-picker__header" v-if="showHeader">
        <view class="zm-picker__header__cancel" @click="onCancel">
          <slot name="cancel">
            <zm-button text text-color="#969799">{{ cancelText }}</zm-button>
          </slot>
        </view>
        <view class="zm-picker__header__title">
          <slot name="title">
            {{ title }}
          </slot>
        </view>
        <view class="zm-picker__header__confirm" @click="onConfirm">
          <slot name="confirm">
            <zm-button text>{{ confirmText }}</zm-button>
          </slot>
        </view>
      </view>
    </slot>
    <view class="zm-picker__loading" v-if="loading">
      <zm-loading size="40rpx"></zm-loading>
    </view>
    <picker-view class="zm-picker__view" :style="[viewStyle]" :indicator-style="indicatorStyle" :value="selectedIndexs"
      @change="onChange">
      <picker-view-column class="zm-picker__columns" v-for="(column, columnIndex) in columns" :key="columnIndex">
        <view class="zm-picker__columns__column" v-for="(item, index) in column" :key="index">{{ item[fields.text] }}
        </view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script setup lang="ts">
import { merge } from "../utils/utils"
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

const type = computed(() => getColumnsType(props.columns, fields.value))
const fields = computed(() => mergeFields(props.columnsFields))
const columns = computed<PickerColumn[]>(() => {
  const { columns } = props
  switch (type.value) {
    case "multiple":
      return columns
    case "cascade":
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

function onChange(data: PickerViewOnChangeEvent) {
  const value = data.detail.value
  const index = Math.max(value.findIndex((value, index) => value !== oldSelectedIndexs.value[index]), 0,)
  setValue(index, columns.value[index][value[index]][fields.value.value])

  if (type.value === "cascade") {
    const len = selectedValues.value.length
    for (let i = 0; i < len; i++) {
      const column = columns.value[i]
      if (!findColumnByValue(column, selectedValues.value[i], fields.value)) {
        setValue(i, columns.value.length ? column[0][fields.value.value] : "")
      }
    }
  }

  updateSelectedIndexs()

  emits("change", {
    values: toRaw(selectedValues.value),
    value: columns.value[index][value[index]][fields.value.value],
    indexs: toRaw(selectedIndexs.value),
    index,
    columns: selectedIndexs.value.map((_: any, index: number) => columns.value[index][selectedIndexs.value[index]]),
  })
  nextTick(() => emits("update:modelValue", selectedValues.value))
}

function onCancel() {
  emits("cancel", {
    values: toRaw(selectedValues.value),
    indexs: toRaw(selectedIndexs.value),
    columns: selectedIndexs.value.map((_: any, index: number) => columns.value[index][selectedIndexs.value[index]]),
  })
}

function onConfirm() {
  emits("confirm", {
    values: toRaw(selectedValues.value),
    indexs: toRaw(selectedIndexs.value),
    columns: selectedIndexs.value.map((_: any, index: number) => columns.value[index][selectedIndexs.value[index]]),
  })
}

function setValue(index: number, value: string | number) {
  if (selectedValues.value[index] !== value) {
    const newValues = selectedValues.value.slice(0)
    newValues[index] = value
    selectedValues.value = newValues
  }
}

function updateSelectedIndexs() {
  selectedIndexs.value = columns.value.map((column, index) => {
    const findIndex = column.findIndex((item: PickerColumn) => item[fields.value.value] === selectedValues.value[index])
    return Math.max(findIndex, 0)
  })
  oldSelectedIndexs.value = selectedIndexs.value
}

function mergeFields(fields: PickerColumnFields) {
  return merge({ text: "text", value: "value", children: "children" }, fields)
}

function getColumnsType(columns: PickerColumn[], fields: PickerColumnFields) {
  const firstColumn = columns[0]
  if (firstColumn) {
    if (Array.isArray(firstColumn)) return "multiple"
    if (fields.children in firstColumn) return "cascade"
  }
  return "default"
}

function findColumnByValue(columns: any, value: string | number, fields: Required<PickerColumnFields>): PickerColumn | undefined {
  return columns?.find((column: PickerColumn) => column[fields.value] === value)
}

function formatCascadeColumns(columns: PickerColumn[], fields: PickerColumnFields, selectedValues: (string | number)[]) {
  const formatted: PickerColumn[] = []

  let index = 0
  let column = { [fields.children]: columns }
  while (column && column[fields.children]) {
    const value = selectedValues[index]
    const children = column[fields.children]
    column = isNoEmpty(value) ? findColumnByValue(children, value, fields) : undefined
    if (!column && children.length) {
      column = findColumnByValue(children, children[0]?.[fields.value], fields)
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
  position: relative;
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

  &__loading {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    background-color: rgb(255 255 255 / 60%);
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
