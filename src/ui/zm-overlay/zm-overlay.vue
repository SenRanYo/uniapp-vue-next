<template>
  <view class="zm-overlay" :class="[props.customClass]" :style="[style]" @touchmove.prevent.stop="noop">
    <zm-transition
      mode="fade"
      v-model:show="visible"
      :duration="props.duration"
      :custom-style="transitionStyle"
      @open="onOpen"
      @close="onClose"
      @opened="onOpened"
      @closed="onClosed"
      @click="onClick"
      @touchmove.prevent.stop="noop"
    >
      <slot></slot>
    </zm-transition>
  </view>
</template>

<script setup lang="ts">
import { useStyle } from "../hooks"
import { overlayEmits } from "./index"

defineOptions({ name: "zm-overlay" })

const emits = defineEmits(overlayEmits)
const props = defineProps({
  zIndex: { type: [Number, String], default: "" },
  opacity: { type: [Number, String], default: "0.7" },
  duration: { type: [Number, String], default: 300 },
  customClass: { type: String, default: "" },
  customStyle: { type: [Object, String], default: "" },
})

const model = defineModel("show", { default: false })
const visible = ref(false)

const style = computed(() => {
  return useStyle({ zIndex: props.zIndex })
})

const transitionStyle = computed(() => {
  const style: any = {}
  style.top = 0
  style.left = 0
  style.width = "100%"
  style.height = "100%"
  style.position = "fixed"
  style.background = `rgba(0, 0, 0, ${props.opacity})`
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

watch(
  () => model.value,
  (val) => {
    val ? open() : close()
  },
  { immediate: true },
)

watch(
  () => visible.value,
  (val) => {
    model.value = val
  },
)

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}

function onOpen() {
  emits("open")
}

function onOpened() {
  emits("opened")
}

function onClose() {
  emits("close")
}

function onClosed() {
  emits("closed")
}

function onClick(event: MouseEvent) {
  emits("click", event)
}

function noop() {
  return false
}

defineExpose({ name: "zm-overlay", open, close })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-overlay {
  z-index: 14000;
}
</style>
