<template>
  <view v-if="visible" class="zm-transition" :style="[style]" :animation="animationData" @click="onClick">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import modes from "./modes"
import { useStyle } from "../hooks/"
import { isArray, isString } from "../utils/check"

const emits = defineEmits(["open", "opened", "close", "closed", "click"])
const props = defineProps({
  show: { type: Boolean, default: true },
  mode: { type: [String, Array, null], default: "fade" },
  zIndex: { type: [String, Number], default: "" },
  duration: { type: Number, default: 300 },
  penetrate: { type: Boolean, default: false },
  timingFunction: { type: String, default: "ease" },
  enterDelay: { type: Number, default: 0 },
  leaveDelay: { type: Number, default: 0 },
  customStyle: { type: [String, Object], default: "" },
})

const timer = ref()
const styles = ref({})
const config: any = ref({})
const visible = ref(false)
const animation = ref()
const animationData = ref()
const noCustomStep = ref(true)

const style = computed(() => {
  let style: any = {}
  style.zIndex = props.zIndex
  style.pointerEvents = props.penetrate ? "none" : "auto"
  style.transitionDuration = `${props.duration / 1000}s`
  return useStyle({ ...style, ...styles.value, ...useStyle(props.customStyle) })
})

watch(() => props, init, { deep: true })
watch(
  () => props.show,
  (state) => {
    if (state) open()
    else if (visible.value) {
      setTimeout(() => close(), props.leaveDelay)
    }
  },
  { immediate: true },
)

onMounted(() => init())

function init(cof: any = {}) {
  config.value = { delay: props.enterDelay, duration: props.duration, timingFunction: props.timingFunction, transformOrigin: "50% 50%", ...cof }
  animation.value = uni.createAnimation(config.value)
}

function run(cb: Function = () => {}) {
  animationData.value = animation.value.export()
  timer.value = setTimeout(() => cb(), config.value.duration)
}

function step(params = {}, config = {}) {
  noCustomStep.value = false
  for (let i in params) {
    try {
      if (typeof params[i] === "object") {
        animation.value[i](...params[i])
      } else {
        animation.value[i](params[i])
      }
    } catch (e) {
      console.error(`方法 ${i} 不存在`)
    }
  }
  animation.value.step(config)
}

function open() {
  clearTimeout(timer.value)
  visible.value = true
  initStyle("init")

  const next = () => {
    timer.value = setTimeout(() => {
      if (noCustomStep.value) initTransition("open").step()
      setTimeout(() => emits("open"), props.enterDelay)
      run(() => emits("opened"))
    }, 20)
  }
  nextTick(next)
}

function close() {
  emits("close")
  if (noCustomStep.value) initTransition("close").step()
  const next = () => {
    run(() => {
      visible.value = false
      animationData.value = null
      if (noCustomStep.value) initStyle("close")
      emits("closed")
    })
  }
  nextTick(next)
}

function initStyle(type = "init") {
  styles.value = { transform: "" }
  const build = (mode: string) => {
    if (modes[mode]) {
      const t = modes[mode][type]
      t.forEach((i: any) => {
        if (i.name === "transform") {
          styles.value[i.name] += `${i.method}(${i.value}) `
        } else {
          styles.value[i.name] = i.value
        }
      })
    } else {
      console.error(`mode ${mode} 不存在`)
    }
  }
  if (isArray(props.mode)) {
    props.mode.forEach((mode: string) => build(mode))
  } else if (isString(props.mode)) {
    build(props.mode)
  } else {
    console.error("mode 格式错误 不存在")
  }
}

function initTransition(type: string) {
  const build = (mode: string) => {
    const t = modes[mode][type]
    t.forEach((i: any) => {
      const v = isArray(i.value) ? i.value : [i.value]
      animation.value[i.method](...v)
    })
  }
  if (isArray(props.mode)) {
    props.mode.forEach((mode: string) => build(mode))
  } else if (isString(props.mode)) {
    build(props.mode)
  } else {
    console.error("mode 格式错误 不存在")
  }
  return animation.value
}

function onClick() {
  emits("click")
}
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-transition {
  z-index: 1;
  position: relative;
}
</style>
