<template>
  <view class="zm-tabbar" :style="[style]">
    <view class="zm-tabbar__content safe-area-inset-bottom" :class="{ 'zm-tabbar__inner--border': border }" :style="[contentStyle]">
      <slot></slot>
    </view>
    <view class="zm-tabbar__placeholder" :style="[placeholderStyle]"></view>
  </view>
</template>

<script setup lang="ts">
import { pick } from "lodash-es"
import { viewKey } from "../zm-view"
import { tabbarEmits, tabbarProps } from "./index"
import { useStyle, useColor, useUnitToPx, useElRect, useParent } from "../hooks"

defineOptions({ name: "zm-tabbar" })
const emits = defineEmits(tabbarEmits)
const props = defineProps(tabbarProps)

const rect = ref<UniApp.NodeInfo>({})
const isExistFooter = ref(false)
const safeAreaBottomHeight = ref(17)
const instance = getCurrentInstance()
const { parent } = useParent(viewKey)

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    updateValue(value)
  },
})

const style = computed(() => {
  const style: any = {}
  if (isExistFooter.value) style.marginTop = 0
  return useStyle(style)
})

const contentStyle = computed(() => {
  return useStyle({
    height: useUnitToPx(props.height) + safeAreaBottomHeight.value + "px",
    background: useColor(props.background),
    ...useStyle(props.customStyle),
  })
})

const placeholderStyle = computed(() => {
  return useStyle({ height: rect.value?.height + "px" })
})

function onEvent() {
  parent?.mitt.on("tabbar.rect.emit", async () => {
    parent.mitt.emit("tabbar.rect", await useElRect(".zm-tabbar__content", instance))
  })
}

async function resize() {
  await nextTick()
  rect.value = await useElRect(".zm-tabbar__content", instance)
  emits("rect", rect.value)
  emits("height", rect.value.height)
  parent?.mitt.emit("tabbar.rect", rect.value)
}

async function updateValue(value: string | number) {
  emits("update:modelValue", value)
  await nextTick()
  emits("change", value)
}

onEvent()
onMounted(() => resize())
provide("zm-tabbar", { ...pick(toRefs(props), ["route", "activeColor", "inactiveColor"]), modelValue, updateValue })
defineExpose({ name: "zm-tabbar", resize })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-tabbar {
  z-index: 1000;
  position: relative;

  &__content {
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    position: fixed;

    &--border::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      inset: -50%;
      border: 1rpx solid #ebedf0;
      transform: scale(0.5);
    }
  }

  &__placeholder {
    box-sizing: content-box;
  }
}
</style>
