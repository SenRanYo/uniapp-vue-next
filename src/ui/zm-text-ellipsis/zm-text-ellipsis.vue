<template>
  <view class="zm-text-ellipsis" :class="[customClass]" :style="[style]" @click="onClick">
    <view class="zm-text-ellipsis__col">{{ colText }}</view>
    <view class="zm-text-ellipsis__placeholders">
      <text class="zm-text-ellipsis__placeholder" v-for="(placeholder, index) in placeholders" :key="index">{{ placeholder }}</text>
    </view>
    <text class="zm-text-ellipsis__text">{{ contentText }}</text>
    <text class="zm-text-ellipsis__action" @click="onClickAction">{{ isExpand ? collapseText : expandText }}</text>
  </view>
</template>

<script setup lang="ts">
import { useStyle, useElRect, useElRects } from "../hooks"
import { textEllipsisEmits, textEllipsisProps } from "./index"

defineOptions({ name: "zm-text-ellipsis" })

const emits = defineEmits(textEllipsisEmits)
const props = defineProps(textEllipsisProps)

const rect = ref<UniApp.NodeInfo>(null)
const colRect = ref<UniApp.NodeInfo>(null)
const actionRect = ref<UniApp.NodeInfo>(null)
const placeholders = ref([])
const contentText = ref("")

const instance = getCurrentInstance()

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const colText = computed(() => {
  return props.text.match(/[\u4e00-\u9fa5]/)[0] || props.text?.slice(0, 1) || ""
})

const isExpand = computed(() => {
  return contentText.value === props.text
})

async function resize() {
  rect.value = await useElRect(".zm-text-ellipsis", instance)
  colRect.value = await useElRect(".zm-text-ellipsis__col", instance)
  actionRect.value = await useElRect(".zm-text-ellipsis__action", instance)
  genPlaceholder()
}

async function genPlaceholder(step = 0) {
  if (rect.value) {
    const list = []
    const maxWidth = Math.floor(rect.value.width * +props.rows)
    const maxHeihgt = Math.floor(colRect.value.height * +props.rows)
    const textCount = maxWidth / colRect.value?.width
    for (let i = 1; i < 6; i++) {
      list.unshift(props.text?.slice(0, Math.trunc(textCount) - i - step) + props.dots)
    }
    for (let i = 0; i < 6; i++) {
      list.push(props.text?.slice(0, Math.trunc(textCount) + i + step) + props.dots)
    }
    placeholders.value = list
    await nextTick()
    const placeholderRects = await useElRects(".zm-text-ellipsis__placeholder", instance)
    const placeholderIndex = placeholderRects.findIndex((item) => Math.floor(item.height) === maxHeihgt)
    contentText.value = placeholders.value[placeholderIndex]
    await nextTick()
    const ellipsisRect = await useElRect(".zm-text-ellipsis", instance)
    if (Math.floor(ellipsisRect.height) !== maxHeihgt) genPlaceholder(1)
  }
}

function onClick(event: TouchEvent) {
  emits("click", event)
}

function onClickAction() {
  if (isExpand.value) {
    resize()
  } else {
    contentText.value = props.text
  }
}

onMounted(() => resize())
defineExpose({ name: "zm-text-ellipsis" })
</script>
<script lang="ts">
export default {
  name: "zm-text-ellipsis",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-text-ellipsis {
  position: relative;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  &__col {
    top: 0;
    left: 0;
    opacity: 0;
    width: min-content;
    position: absolute;
  }

  &__placeholders {
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    opacity: 0;
    position: absolute;
    pointer-events: none;
    flex-direction: column;
  }

  &__placeholder {
    // top: 0;
    // left: 0;
    // right: 0;
    // position: absolute;
    // white-space: pre-wrap;
    // overflow-wrap: break-word;
  }

  &__action {
    padding-left: 8rpx;
    white-space: nowrap;
    color: var(--primary-color);
  }
}
</style>
