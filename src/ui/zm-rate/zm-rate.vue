<template>
  <view class="zm-rate" :class="[classs, customClass]" :style="[style]" @click="onClick" @touchstart.stop="onTouchstart" @touchmove.stop="onTouchmove">
    <view class="zm-rate__item" :style="[itemStyle(item, index)]" v-for="(item, index) in list" :key="index">
      <view class="zm-rate__item__icon">
        <zm-icon :name="voidIcon" :size="size" :weight="iconWeight" :color="voidColor"></zm-icon>
      </view>
      <view class="zm-rate__item__icon--absolute" :style="[absoluteStyle(item, index)]">
        <zm-icon :name="icon" :size="size" :weight="iconWeight" :color="color"></zm-icon>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { rateEmits, rateProps } from "./index"
import { useUnit, useColor, useStyle, useElRect, useElRects, useUnitToPx } from "../hooks"

defineOptions({ name: "zm-rate" })

const props = defineProps(rateProps)
const emits = defineEmits(rateEmits)

const score = ref(null)
const ranges = ref([])
const rect = ref<UniApp.NodeInfo>({})
const rects = ref<UniApp.NodeInfo[]>([])
const instance = getCurrentInstance()

const list = computed(() =>
  Array(+props.count)
    .fill("")
    .map((_, i) => getRateStatus(props.modelValue, i + 1)),
)

const style = computed(() => {
  const style: any = {}
  style.padding = `0 -${useUnitToPx(props.gutter) / 2}px`
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  return list
})

const itemStyle = computed(() => {
  return (item: any, index: number) => {
    const style: any = {}
    if (index !== props.count - 1) {
      style.padding = `0 ${useUnitToPx(props.gutter) / 2}px`
    }
    return useStyle(style)
  }
})

const absoluteStyle = computed(() => {
  return (item: any, index: number) => {
    const style: any = {}
    if (item.status === "full") style.width = "100%"
    if (item.status === "half") style.width = item.value * 100 + "%"
    if (index !== props.count - 1 && item.value) {
      style.padding = `0 ${useUnitToPx(props.gutter) / 2}px`
    }
    return useStyle(style)
  }
})

watch(
  () => list.value,
  (val) => {
    console.log(val)
  },
  { immediate: true },
)

async function resize() {
  await nextTick()
  rect.value = await useElRect(".zm-rate", instance)
  rects.value = await useElRects(".zm-rate__item", instance)
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
  rect.value = await useElRect(".zm-rate", instance)
  rects.value = await useElRects(".zm-rate__item", instance)
  ranges.value = []
  rects.value.forEach((rect, index) => {
    if (props.allowHalf) {
      ranges.value.push({ score: index + 0.5, left: rect.left, right: rect.right - rect.width / 2 }, { score: index + 1, left: rect.left + rect.width / 2, right: rect.right })
    } else {
      ranges.value.push({ score: index + 1, left: rect.left, right: rect.right })
    }
  })
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
  return props.allowHalf ? 0.5 : 1
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
  let value = getScoreByPosition(event.touches[0].clientX)
  updateValue(value)
}

async function updateValue(value: number) {
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
    position: relative;

    &__icon {
      display: flex;
      overflow: hidden;

      &--absolute {
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
