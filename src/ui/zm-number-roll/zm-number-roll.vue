<template>
  <view class="zm-number-roll" :style="[style]">
    <view v-for="(column, index) in columns" :key="index" class="zm-number-roll__column" :style="[columnStyle(index)]">
      <text v-for="(v, valueIndex) in column" :key="valueIndex" class="zm-number-roll__row" :style="[columnItemStyle]">{{ v }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { formatDigit } from "../utils/utils"
import { numberRollEmits, numberRollProps } from "./index"
import { useStyle, useColor, useUnit, useElRect } from "../hooks"

defineOptions({ name: "zm-number-roll" })

const instance = getCurrentInstance()
const emits = defineEmits(numberRollEmits)
const props = defineProps(numberRollProps)
const isInit = ref(false)
const height = ref("auto")
const indexs = ref([])
const columns = ref([])
const arab = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const style = computed(() => {
  let style: any = {}
  style.height = props.fontSize ? useUnit(props.fontSize) : `${height.value}px`
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
const columnStyle = computed(() => {
  return (index: number) => {
    let style: any = {}
    let h = props.fontSize ? useUnit(props.fontSize) : `${height.value}px`
    style.transform = `translate3d(0, calc(${indexs.value[index]} * ${h} * -1), 0)`
    style.transitionTimingFunction = props.timingFunction
    if (props.duration) style.transitionDuration = `${props.duration}ms`
    return useStyle(style)
  }
})
const columnItemStyle = computed(() => {
  let style: any = {}
  style.color = useColor(props.color)
  style.height = props.fontSize ? useUnit(props.fontSize) : `${height.value}px`
  style.fontSize = props.fontSize ? useUnit(props.fontSize) : `${height.value}px`
  style.lineHeight = props.fontSize ? useUnit(props.fontSize) : `${height.value}px`
  style.fontWeight = props.fontWeight
  return useStyle(style)
})

watch(() => props.value, resize)

async function resize() {
  await nextTick()
  let value: string | number = Number(isInit.value ? props.value : 0)
  value = formatDigit(value, { decimalPlaces: props.decimalPlaces, trimZero: props.trimZero, thousandsSep: props.thousandsSep })
  let formatValueArr = String(value).split("")
  columns.value = formatValueArr.map((val) => (~arab.indexOf(val) ? arab : [val]))
  indexs.value = formatValueArr
    .reverse()
    .map((val) => (~arab.indexOf(val) ? Number(val) : 0))
    .reverse()

  initRect()
  if (!isInit.value) {
    isInit.value = true
    resize()
  }
}

function initRect() {
  useElRect(".zm-number-roll", instance).then((rect: any) => {
    height.value = rect.height
  })
}

onMounted(() => resize())
onUpdated(() => initRect())
defineExpose({ name: "zm-number-roll" })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-number-roll {
  overflow: hidden;
  display: inline-flex;

  &__column {
    transition-property: transform;
    transition-duration: 1.2s;
    transition-timing-function: ease-out;
  }

  &__row {
    color: inherit;
    display: flex;
    font-size: inherit;
    font-weight: inherit;
    justify-content: center;
    transition: all 0.3s ease-out;
  }
}
</style>
