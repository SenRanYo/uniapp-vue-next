<template>
  <view v-if="inited" class="zm-transition" :class="[classes, customClass]" :style="[style]" @transitionend="onTransitionEnd" @click="onClick">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { transitionEmits, transitionProps } from "./index"
import { useStyle, usePromise, useRequestAnimationFrame } from "../hooks/"

defineOptions({ name: "zm-transition" })

const emits = defineEmits(transitionEmits)
const props = defineProps(transitionProps)

const status = ref("")
const styles = ref<any>({})
const inited = ref(false)
const visible = ref(false)
const classes = ref("")
const duration = ref(0)
const enterPromise = ref(null)
const enterLifeCyclePromises = ref<any>(null)
const leaveLifeCyclePromises = ref<any>(null)
const transitionEnded = ref(false)

const style = computed(() => {
  let style: any = {}
  style.zIndex = props.zIndex
  style.pointerEvents = props.penetrate ? "none" : "auto"
  style.transitionDuration = +props.duration / 1000 + "s"
  return useStyle({ ...style, ...styles.value, ...useStyle(props.customStyle) })
})

watch(
  () => props.show,
  (val) => {
    visible.value = val
  },
  { immediate: true },
)

watch(
  () => visible.value,
  (val) => {
    val ? enter() : leave()
    emits("update:show", val)
  },
)

function classNames(name: string) {
  return {
    enter: `zm-${name}-enter zm-${name}-enter-active`,
    "enter-to": `zm-${name}-enter-to zm-${name}-enter-active`,
    leave: `zm-${name}-leave zm-${name}-leave-active`,
    "leave-to": `zm-${name}-leave-to zm-${name}-leave-active`,
  }
}

function enter() {
  abortPromise()
  enterPromise.value = usePromise(async (resolve) => {
    try {
      const names = classNames(props.name)
      status.value = "enter"
      emits("before-enter")
      styles.value.transitionTimingFunction = props.enterTimingFunction
      enterLifeCyclePromises.value = useRequestAnimationFrame()
      await enterLifeCyclePromises.value
      emits("enter")
      classes.value = names.enter
      duration.value = +props.duration
      enterLifeCyclePromises.value = useRequestAnimationFrame()
      await enterLifeCyclePromises.value
      inited.value = true
      visible.value = true
      enterLifeCyclePromises.value = useRequestAnimationFrame()
      await enterLifeCyclePromises.value
      enterLifeCyclePromises.value = null
      transitionEnded.value = false
      classes.value = names["enter-to"]
      resolve()
    } catch (error) {}
  })
}

async function leave() {
  if (!enterPromise.value) {
    transitionEnded.value = false
    return onTransitionEnd()
  }
  try {
    await enterPromise.value
    const names = classNames(props.name)
    status.value = "leave"
    emits("before-leave")
    styles.value.transitionTimingFunction = props.leaveTimingFunction
    leaveLifeCyclePromises.value = useRequestAnimationFrame()
    await leaveLifeCyclePromises.value
    emits("leave")
    classes.value = names.leave
    leaveLifeCyclePromises.value = useRequestAnimationFrame()
    await leaveLifeCyclePromises.value
    transitionEnded.value = false
    classes.value = names["leave-to"]
    leaveLifeCyclePromises.value = setPromise(+props.duration)
    await leaveLifeCyclePromises.value
    leaveLifeCyclePromises.value = null
    onTransitionEnd()
    enterPromise.value = null
  } catch (error) {}
}

function onTransitionEnd() {
  if (transitionEnded.value) return

  transitionEnded.value = true
  if (status.value === "leave") {
    emits("after-leave")
  } else if (status.value === "enter") {
    emits("after-enter")
  }

  if (!props.show && visible.value) {
    visible.value = false
  }
}

function setPromise(duration: number) {
  return usePromise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, duration)
  })
}

function abortPromise() {
  enterPromise.value?.abort()
  enterLifeCyclePromises.value?.abort()
  leaveLifeCyclePromises.value?.abort()
  enterPromise.value = null
  enterLifeCyclePromises.value = null
  leaveLifeCyclePromises.value = null
}

function onClick(event: TouchEvent) {
  emits("click", event)
}

onBeforeMount(() => props.show && enter())
defineExpose({ name: "zm-transition", enter, leave })
</script>
<script lang="ts">
export default {
  name: "zm-transition",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
@import "./index";

.zm-transition {
  z-index: 1;
  position: relative;
}
</style>
