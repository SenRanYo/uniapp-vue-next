<template>
  <view class="zm-switch" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <view class="zm-switch__node" :style="[nodeStyle]">
      <zm-loading v-if="loading" :size="loadingIconSize" :color="loadingIconColor"></zm-loading>
      <slot v-else name="node" :value="active"></slot>
    </view>
  </view>
</template>
<script setup lang="ts">
import { switchEmits, switchProps } from "./index"
import { useStyle, useColor, useUnit, useUnitToPx, useElRect } from "../hooks"
import { isFunction } from "../utils/check"

defineOptions({ name: "zm-switch" })

const props = defineProps(switchProps)
const emits = defineEmits(switchEmits)

const active = ref(props.modelValue)
const switchRect = ref<UniApp.NodeInfo>({})
const nodeRect = ref<UniApp.NodeInfo>({})
const instance = getCurrentInstance()

const style = computed(() => {
  const style: any = {}
  style.background = isActive.value ? useColor(props.activeColor) : useColor(props.inactiveColor)
  if (props.size) {
    style.width = useUnitToPx(props.size) * 2 + "px"
    style.height = useUnit(props.size)
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (isActive.value) list.push("zm-switch--active")
  if (props.disabled) list.push("zm-switch--disabled")
  return list
})

const nodeStyle = computed(() => {
  const style: any = {}
  const size = useUnitToPx(props.size || "40rpx")
  const gutter = props.gutter ? useUnitToPx(props.gutter) : useUnitToPx("4rpx")
  style.top = gutter + "px"
  style.left = gutter + "px"
  style.width = size - gutter * 2 + "px"
  style.height = size - gutter * 2 + "px"

  if (isActive.value) {
    style.transform = `translateX(${switchRect.value.width - nodeRect.value.width - gutter * 2}px)`
  }
  return useStyle(style)
})

const isActive = computed(() => {
  return active.value === props.activeValue
})

watch(
  () => props.modelValue,
  (val) => {
    active.value = val
  },
)

async function resize() {
  switchRect.value = await useElRect(".zm-switch", instance)
  nodeRect.value = await useElRect(".zm-switch__node", instance)
}

function onClick() {
  if (props.loading) return
  if (props.disabled) return
  updateValue(isActive.value ? props.inactiveValue : props.activeValue)
}

function updateValue(value: number | string | boolean) {
  const next = (val: number | string | boolean = value) => {
    active.value = val
    emits("change", active.value)
    emits("update:modelValue", active.value)
  }
  if (isFunction(props.beforeChange)) {
    props.beforeChange(value, next)
  } else {
    next()
  }
}

onMounted(() => resize())
defineExpose({ name: "zm-switch" })
</script>
<script lang="ts">
export default {
  name: "zm-switch",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-switch {
  /* #ifdef WEB */
  cursor: pointer;
  /* #endif */
  width: 80rpx;
  height: 40rpx;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  display: inline-flex;
  border-radius: 9999px;
  box-sizing: content-box;
  background-color: #e3e4e7;
  transition: background-color 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);

  &--active {
    background-color: var(--primary-color);
  }

  &--disabled {
    opacity: 0.6;
  }

  &__node {
    top: 4rpx;
    left: 4rpx;
    width: 32rpx;
    height: 32rpx;
    display: flex;
    position: absolute;
    align-items: center;
    border-radius: 50%;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0 6rpx 2rpx 0 rgb(0 0 0 / 5%);
    transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
  }
}
</style>
