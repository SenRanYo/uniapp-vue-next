<template>
  <view class="zm-footer">
    <view class="zm-footer__inner" :style="[style]" :class="{ 'safe-area-inset-bottom': safeAreaInsetBottom }">
      <slot></slot>
    </view>
    <view class="zm-footer__placeholder" :class="{ 'safe-area-inset-bottom': safeAreaInsetBottom }" :style="[placeholderStyle]"></view>
  </view>
</template>

<script setup lang="ts">
import { viewKey } from "../zm-view"
import { footerEmits, footerProps } from "./index"
import { useStyle, useColor, useUnitToPx, useElRect, useParent } from "../hooks"

defineOptions({ name: "zm-footer" })

const emits = defineEmits(footerEmits)
const props = defineProps(footerProps)

const rect = ref<UniApp.NodeInfo>({})
const tabbarHeight = ref(0)
const instance = getCurrentInstance()
const { parent: view } = useParent(viewKey)

const style = computed(() => {
  const style: any = {}
  style.position = "fixed"
  style.zIndex = props.zIndex
  style.bottom = tabbarHeight.value + useUnitToPx(props.offsetBottom) + "px"
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const placeholderStyle = computed(() => {
  const style: any = {}
  style.height = rect.value.height + "px"
  return useStyle(style)
})

function onEvent() {
  view?.mitt.on("tabbar.rect", (rect: UniApp.NodeInfo) => {
    tabbarHeight.value = rect.height
  })
}

async function resize() {
  await nextTick()
  rect.value = await useElRect(".zm-footer__inner", instance)
  emits("rect", rect.value)
  emits("height", rect.value.height)
  view?.mitt.emit("tabbar.rect.emit")
}

onEvent()
onMounted(() => resize())
defineExpose({ name: "zm-footer" })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-footer {
  position: relative;
  margin-top: auto;

  &__inner {
    left: 0;
    width: 100%;
  }
}
</style>
