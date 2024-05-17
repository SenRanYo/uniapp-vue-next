<template>
  <view class="zm-text-highlight" :style="[style]" :class="[props.customClass]">
    <text v-for="(item, index) in list" :key="index" :style="[textStyle(item)]" class="zm-text-highlight__text" :class="{ 'is-matched': text && item.matched }">
      {{ item.text }}
    </text>
  </view>
</template>

<script setup lang="ts">
import { isNoEmpty } from "../utils/check"
import { textHighlightProps } from "./index"
import { useStyle, useColor, useUnit } from "../hooks"

defineOptions({ name: "zm-text-highlight" })

const props = defineProps(textHighlightProps)
const list = ref([])

const style = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  style.fontWeight = props.fontWeight
  style.lineHeight = props.lineHeight
  style["-webkit-line-clamp"] = props.textRow
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const textStyle = computed(() => {
  return (val: any) => {
    const style: any = {}
    if (val.matched) style.color = useColor(props.highlightColor)
    return useStyle(style)
  }
})

watch(() => props.text, match, { immediate: true })
watch(() => props.match, match, { immediate: true })

function match() {
  const escapeRegExp = (val: string) => {
    return val.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  }
  if (props.text && isNoEmpty(props.match)) {
    const escapedMatch = escapeRegExp(props.match)
    const parts = props.text.split(new RegExp(`(${escapedMatch})`)).filter(Boolean)
    list.value = parts.map((text: string) => {
      return { text, matched: text === props.match }
    })
  } else {
    list.value = [{ text: props.text, matched: false }]
  }
}

defineExpose({ name: "zm-text-highlight", match })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-text-highlight {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  &__text.is-matched {
    color: var(--primary-color);
  }
}
</style>
