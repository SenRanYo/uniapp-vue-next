<template>
  <view class="zm-rate" :class="[classs, customClass]" :style="[style]" @click="onClick" @touchstart.stop="onTouchstart" @touchmove.stop="onTouchmove">
    <view class="zm-rate__item" :style="[itemStyle(index)]" v-for="(item, index) in list" :key="index">
      <view class="zm-rate__item__icon">
        <zm-icon :name="icon(item)" :size="size" :weight="iconWeight" :color="iconColor(item)"></zm-icon>
      </view>
      <view class="zm-rate__item__icon zm-rate__item__icon--half" :style="[iconHalfStyle(item, index)]" v-if="isShowHalf(item)">
        <zm-icon :name="props.icon" :size="size" :weight="iconWeight" :color="color"></zm-icon>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { rateEmits, rateProps } from "./index"
import { useStyle, useElRect, useElRects, useUnitToPx } from "../hooks"

defineOptions({ name: "zm-rate" })

const props = defineProps(rateProps)
const emits = defineEmits(rateEmits)

const score = ref(null)
const ranges = ref([])
const rect = ref<UniApp.NodeInfo>({})
const rects = ref<UniApp.NodeInfo[]>([])
const instance = getCurrentInstance()

const list = computed(() =>
  Array(props.count)
    .fill("")
    .map((_, i) => getRateStatus(props.modelValue, i + 1)),
)

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (props.disabled) list.push("zm-rate--disabled")
  if (props.readonly) list.push("zm-rate--readonly")
  return list
})

const itemStyle = computed(() => {
  return (index: number) => {
    const style: any = {}
    if (index < list.value.length - 1) {
      style.marginRight = `${useUnitToPx(props.gutter)}px`
    }
    return useStyle(style)
  }
})

const iconHalfStyle = computed(() => {
  return (item: any, index: number) => {
    const style: any = {}
    if (item.status === "full") style.width = "100%"
    if (item.status === "half") style.width = item.value * 100 + "%"
    return useStyle(style)
  }
})

const icon = computed(() => {
  return (item: any) => {
    return item.status === "full" ? props.icon : props.voidIcon
  }
})

const iconColor = computed(() => {
  return (item: any) => {
    return item.value && item.status === "full" ? props.color : props.voidColor
  }
})

const isShowHalf = computed(() => {
  return (item: any) => {
    return item.value && item.status === "half"
  }
})

async function resize() {
  await nextTick()
  rect.value = await useElRect(".zm-rate", instance)
  rects.value = await useElRects(".zm-rate__item", instance)
  await nextTick()

  updateRanges()
}

function getRateStatus(value: number, index: number) {
  if (value >= index) return { status: "full", value: 1 }

  if (value + 0.5 >= index && props.allowHalf && !props.readonly) return { status: "half", value: 0.5 }

  if (value + 1 >= index && props.allowHalf && props.readonly) {
    const cardinal = 10 ** 10
    return { status: "half", value: Math.round((value - index + 1) * cardinal) / cardinal }
  }

  return { status: "void", value: 0 }
}

async function updateRanges() {
  const gutter = useUnitToPx(props.gutter)
  rect.value = await useElRect(".zm-rate", instance)
  rects.value = await useElRects(".zm-rate__item", instance)
  ranges.value = []
  rects.value.forEach((rect, index) => {
    if (props.allowHalf) {
      let left = index === 0 ? rect.left : rect.left - gutter / 2
      let right = index === 0 ? rect.width / 2 : rect.right - rect.width / 2
      ranges.value.push({ score: index + 0.5, left, right }, { score: index + 1, left: rect.left + rect.width / 2, right: rect.right + gutter / 2 })
    } else {
      let left = index === 0 ? rect.left : rect.left - gutter / 2
      let right = index === 0 ? rect.width + gutter / 2 : left + rect.width + gutter
      ranges.value.push({ score: index + 1, left, right })
    }
  })

  console.log(ranges.value)
}

function getScoreByPosition(x: number) {
  const minLeft = Math.min(...ranges.value.map((item) => item.left))
  const maxRight = Math.max(...ranges.value.map((item) => item.right))
  for (let i = 0; i < ranges.value.length; i++) {
    if (x >= ranges.value[i].left && x < ranges.value[i].right) {
      return ranges.value[i].score
    }
  }
  if (x <= minLeft) return 0
  if (x >= maxRight) return props.count
  return props.modelValue
}

async function onClick(event: any) {
  await updateRanges()
  let value = getScoreByPosition(event.detail.x)
  updateValue(value)
}

function onTouchstart() {
  updateRanges()
}

function onTouchmove(event: any) {
  if (props.touchable) {
    let value = getScoreByPosition(event.touches[0].clientX)
    updateValue(value)
  }
}

async function updateValue(value: number) {
  if (props.disabled) return
  if (props.readonly) return
  if (value === score.value) return
  emits("change", value)
  await nextTick()
  emits("update:modelValue", value)
  score.value = value
}

onMounted(() => resize())
defineExpose({ name: "zm-rate" })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-rate {
  width: max-content;
  display: inline-flex;
  align-items: center;

  &__item {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;

    &__icon {
      display: flex;
      overflow: hidden;

      &--half {
        top: 0;
        left: 0;
        width: 0;
        z-index: 1;
        display: flex;
        overflow: hidden;
        position: absolute;
        pointer-events: none;
      }
    }
  }
}
</style>
