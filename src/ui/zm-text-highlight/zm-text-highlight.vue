<template>
  <view class="zm-text-highlight" :style="[style]" :class="[customClass]">
    <text v-for="(item, index) in list" :key="index" :style="[textStyle(item)]" class="zm-text-highlight__text" :class="{ 'is-matched': text && item.matched }">
      {{ item.text }}
    </text>
  </view>
</template>

<script setup lang="ts">
import { isNoEmpty } from "../utils/check"
import { useStyle, useColor, useUnit } from "../hooks"

const props = defineProps({
  text: { type: String, default: "" },
  match: { type: String, default: "" },
  color: { type: String, default: "" },
  textRow: { type: [String, Number], default: "2" },
  fontSize: { type: [String, Number], default: "" },
  fontWeight: { type: [String, Number], default: "" },
  lineHeight: { type: [String, Number], default: "" },
  highlightColor: { type: String, default: "var(--theme-color)" },
  customStyle: { type: [Object, String], default: "" },
  customClass: { type: String, default: "" },
})

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

watch(() => props.text, handleSplit, { immediate: true })
watch(() => props.match, handleSplit, { immediate: true })

function update() {
  handleSplit()
}

function handleSplit() {
  const escapeRegExp = (val: string) => {
    return val.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") // $& 表示匹配的整个字符串
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

defineExpose({ update })
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
}
</style>
