<template>
  <view class="zm-image" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <view class="zm-image__error" v-if="isError">
      <slot name="error">
        <zm-icon :name="errorIcon" :size="errorIconSize" :color="errorIconColor"></zm-icon>
      </slot>
    </view>

    <view class="zm-image__loading" v-else-if="isLoading">
      <slot name="loading">
        <zm-icon :name="loadingIcon" :size="loadingIconSize" :color="loadingIconColor"></zm-icon>
      </slot>
    </view>

    <image
      class="zm-image__image"
      :style="[imageStyle]"
      :src="src"
      :mode="mode"
      :webp="webp"
      :lazy-load="lazyLoad"
      :draggable="draggable"
      :show-menu-by-longpress="showMenuByLongpress"
      @load="onLoad"
      @error="onError"
    />
  </view>
</template>

<script setup lang="ts">
import { imageEmits, imageProps } from "./index"
import { useStyle, useColor, useUnit, useUnitToPx } from "../hooks"
import { ImageOnErrorEvent, ImageOnLoadEvent } from "@uni-helper/uni-app-types"

defineOptions({ name: "zm-image" })

const emits = defineEmits(imageEmits)
const props = defineProps(imageProps)

const error = ref(false)
const loading = ref(true)

const isError = computed(() => {
  return error.value && props.showError
})

const isLoading = computed(() => {
  return loading.value && props.showLoading
})

const style = computed(() => {
  const style: any = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list = []
  if (props.round) list.push("zm-image--round")
  if (props.block) list.push("zm-image--block")
  return list
})

const imageStyle = computed(() => {
  const style: any = {}
  if (props.fadeShow) style.opacity = 0
  if (!isError.value && !isLoading.value) style.opacity = 1
  return useStyle(style)
})

const errorIconSize = computed(() => {
  if (props.errorIconSize) return useUnit(props.errorIconSize)
  return Math.min(useUnitToPx(props.width), useUnitToPx(props.height)) / 3 + "px"
})

const loadingIconSize = computed(() => {
  if (props.loadingIconSize) return useUnit(props.loadingIconSize)
  return Math.min(useUnitToPx(props.width), useUnitToPx(props.height)) / 3 + "px"
})

function onLoad(event: ImageOnLoadEvent) {
  loading.value = false
  emits("load", event)
}

function onError(event: ImageOnErrorEvent) {
  error.value = true
  emits("error", event)
}

function onClick(event: TouchEvent) {
  emits("click", event)
}

defineExpose({ name: "zm-image" })
</script>
<script lang="ts">
export default {
  name: "zm-image",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-image {
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: center;
  background-color: #f7f8fa;
  justify-content: space-between;

  &__image {
    width: 100%;
    height: 100%;
    transition: opacity 0.3s;
  }

  &__error,
  &__loading {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }

  &--block {
    display: block;
  }

  &--round {
    border-radius: 9999px;
  }
}
</style>
