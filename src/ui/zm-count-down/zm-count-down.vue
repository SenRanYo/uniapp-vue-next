<template>
  <view class="zm-count-down" :class="[customClass]" :style="[style]">
    <slot :time="timeData">
      <text class="zm-count-down__text">{{ formatTimeText }}</text>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { useStyle } from "../hooks"
import { padZero } from "../utils/utils"
import { countDownEmits, countDownProps, CountDownTimeData } from "./index"

defineOptions({ name: "zm-count-down" })

const emits = defineEmits(countDownEmits)
const props = defineProps(countDownProps)

const timer = ref(null)
const runing = ref(false)
const endTime = ref(null)
const remainTime = ref(0)
const rafLastTime = ref(null)
const timeData = ref<CountDownTimeData>(null)
const formatTimeText = ref("")

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

function tick() {
  const next = () => {
    timer.value = useRequestAnimationFrame(() => {
      const remain = Math.max(endTime.value - Date.now(), 0)
      timeData.value = parseTimeData(remain)
      formatTimeText.value = parseTimeFormat(timeData.value, props.format)
      if (props.millisecond) {
        emits("change", parseTimeData(remain))
      } else if (!isSameSecond(remain, remainTime.value)) {
        emits("change", parseTimeData(remain))
      }
      remainTime.value = remain
      if (remain === 0) {
        emits("finish")
        pause()
      } else next()
    })
  }
  next()
}

function start() {
  if (runing.value) return
  runing.value = true
  endTime.value = Date.now() + remainTime.value
  tick()
}

function reset() {
  pause()
  remainTime.value = +props.time
  if (props.autoStart) start()
}

function pause() {
  runing.value = false
  useCancelRequestAnimationFrame(timer.value)
}

function isSameSecond(time1: number, time2: number) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000)
}

function parseTimeFormat(time: any, format: string) {
  let { days, hours, minutes, seconds, milliseconds } = time
  if (format.indexOf("DD") === -1) {
    hours += days * 24
  } else {
    format = format.replace("DD", padZero(days))
  }
  if (format.indexOf("HH") === -1) {
    minutes += hours * 60
  } else {
    format = format.replace("HH", padZero(hours))
  }
  if (format.indexOf("mm") === -1) {
    seconds += minutes * 60
  } else {
    format = format.replace("mm", padZero(minutes))
  }
  if (format.indexOf("ss") === -1) {
    milliseconds += seconds * 1000
  } else {
    format = format.replace("ss", padZero(seconds))
  }
  return format.replace("SSS", padZero(milliseconds, 3))
}

function parseTimeData(time: number) {
  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR
  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOUR)
  const minutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const milliseconds = Math.floor(time % SECOND)
  return { days, hours, minutes, seconds, milliseconds }
}

function useRequestAnimationFrame(callback = () => {}) {
  const currTime = new Date().getTime()
  const timeToCall = Math.max(0, 16 - (currTime - rafLastTime.value))
  const id = setTimeout(() => {
    callback()
  }, timeToCall)
  rafLastTime.value = currTime + timeToCall
  return id
}

function useCancelRequestAnimationFrame(id: number) {
  clearTimeout(id)
}

onMounted(() => reset())
defineExpose({ name: "zm-count-down", start, reset, pause })
</script>
<script lang="ts">
export default {
  name: "zm-count-down",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-count-down {
  display: flex;
}
</style>
