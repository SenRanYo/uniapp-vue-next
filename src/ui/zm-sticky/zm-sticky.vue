<template>
  <view class="zm-sticky" :style="[style]">
    <slot></slot>
  </view>
</template>
<script setup lang="ts">
import { Mitt } from "../utils/mitt"
import { useStyle, useColor, useUnitToPx, useElRect, useParent } from "../hooks"

interface View {
  mitt: Mitt
}

defineOptions({ name: "zm-sticky" })
const emits = defineEmits(["change"])
const props = defineProps({
  zIndex: { type: [String, Number], default: "" },
  offsetTop: { type: [String, Number], default: 0 },
  background: { type: String, default: "transparent" },
})

const rect = ref()
const isSticky = ref(false)
const navbarHeight = ref(0)
const view: View = inject("zm-view")
const instance = getCurrentInstance()

const style = computed(() => {
  const style: any = {}
  style.zIndex = props.zIndex
  style.top = useUnitToPx(props.offsetTop) + navbarHeight.value + "px"
  style.background = useColor(props.background)
  return useStyle(style)
})

watch(
  () => isSticky.value,
  (val) => emits("change", val),
  { immediate: true },
)

async function resize() {
  await nextTick()
  updateSticky()
  rect.value = await useElRect(".zm-sticky__inner", instance)
}

function event() {
  view.mitt.on("scroll", (e) => {})
}

async function updateSticky() {
  const rect: any = await useElRect(".zm-sticky", instance)
  if (rect) {
    isSticky.value = rect.top <= useUnitToPx(props.offsetTop)
  }
}

onMounted(() => {
  event()
  resize()
})

defineExpose({ resize })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-sticky {
  left: 0;
  width: 100%;
  position: sticky;

  &__inner {
    left: 0;
    width: 100%;
  }
}
</style>
