<template>
  <view class="zm-sticky" :style="[style]">
    <slot></slot>
  </view>
</template>
<script setup lang="ts">
import { viewKey } from "../zm-view"
import { stickyEmits, stickyProps } from "./index"
import { useStyle, useColor, useUnitToPx, useElRect, useParent } from "../hooks"

defineOptions({ name: "zm-sticky" })
const emits = defineEmits(stickyEmits)
const props = defineProps(stickyProps)

const isSticky = ref(false)
const navbarHeight = ref(0)
const instance = getCurrentInstance()
const { parent } = useParent(viewKey)

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

function event() {
  parent?.mitt.on("scroll", () => updateSticky())
}

async function resize() {
  await nextTick()
  // #ifdef WEB
  const head: HTMLElement = document.querySelector(".uni-page-head")
  navbarHeight.value = head.offsetHeight
  // #endif
  updateSticky()
}

function updateSticky() {
  useElRect(".zm-sticky", instance).then((rect: any) => {
    if (rect) {
      isSticky.value = rect.top <= useUnitToPx(props.offsetTop)
    }
  })
}

onBeforeMount(() => event())
onMounted(() => resize())
defineExpose({ name: "zm-sticky", resize })
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
