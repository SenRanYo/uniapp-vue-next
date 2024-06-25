<template>
  <view class="zm-index-anchor" :class="[classs, customClass]" :style="[style]">
    <slot>
      <view class="zm-index-anchor__index" :style="[indexStyle]">{{ index }}</view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { indexBarKey } from "../zm-index-bar"
import { indexAnchorEmits, indexAnchorProps } from "./index"
import { useStyle, useColor, useUnit, useParent, useElRect } from "../hooks"

defineOptions({ name: "zm-index-anchor" })

const emits = defineEmits(indexAnchorEmits)
const props = defineProps(indexAnchorProps)
const { index: childrenIndex, parent } = useParent(indexBarKey)

const rect = ref<UniApp.NodeInfo>(null)
const instance = getCurrentInstance()

const classs = computed(() => {
  const list: any = []
  if (parent.stickyIndex.value >= childrenIndex.value) list.push("zm-index-anchor--sticky")
  return list
})

const style = computed(() => {
  const style: any = {}
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  if (parent.stickyIndex.value >= childrenIndex.value) style.background = useColor(props.stickyBackground)
  if (parent?.props.sticky) {
    style.top = 0
    style.position = "sticky"
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const indexStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  style.fontWeight = props.fontWeight
  if (parent.stickyIndex.value >= childrenIndex.value) {
    style.color = useColor(props.stickyColor)
    style.fontSize = useUnit(props.stickyFontSize)
    style.fontWeight = props.stickyFontWeight
  }
  return useStyle(style)
})

async function resize() {
  rect.value = await useElRect(".zm-index-anchor", instance)
}

onMounted(() => resize())
defineExpose({ name: "zm-index-anchor", rect, resize })
</script>
<script lang="ts">
export default {
  name: "zm-index-anchor",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-index-anchor {
  z-index: 2;
  height: 60rpx;
  display: flex;
  align-items: center;

  &--sticky {
    background-color: #fff;
  }

  &__index {
    flex: 1;
    padding: 12rpx 24rpx;
  }
}
</style>
