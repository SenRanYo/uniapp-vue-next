<template>
  <view class="zm-safe-area-top" :class="[props.customClass]" :style="[style]"></view>
</template>

<script setup lang="ts">
import { safeAreaTopEmits } from "./index"
import { useColor, useStyle } from "../hooks"

defineOptions({ name: "zm-safe-area-top" })

const emits = defineEmits(safeAreaTopEmits)
const props = defineProps({
  background: { type: String, default: "" },
  customClass: { type: String, default: "" },
  customStyle: { type: [String, Object], default: "" },
})

const height = ref(0)
const style = computed(() => {
  const style: any = {}
  style.height = height.value + "px"
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

function resize() {
  const { safeAreaInsets } = uni.getSystemInfoSync()
  if (safeAreaInsets) {
    height.value = safeAreaInsets.top
    emits("height", safeAreaInsets.top)
  }
}

onBeforeMount(() => resize())
defineExpose({ name: "zm-safe-area-top" })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-safe-area-top {
  width: 100%;
  flex-shrink: 0;
}
</style>
