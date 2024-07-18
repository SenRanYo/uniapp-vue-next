<template>
  <view class="zm-text" :style="[style]" :class="[classs, customClass]" v-if="prefix || suffix" @click="onClick">
    <text class="zm-text__prefix" :style="[prefixStyle]" :decode="decode" :selectable="selectable" :user-select="selectable">{{ prefix }}</text>
    <text class="zm-text__text" :style="[textStyle]" :decode="decode" :selectable="selectable" :user-select="selectable">
      <slot>{{ text }}</slot>
    </text>
    <text class="zm-text__suffix" :style="[suffixStyle]" :decode="decode" :selectable="selectable" :user-select="selectable">{{ suffix }}</text>
  </view>
  <text v-else class="zm-text" :class="[classs, customClass]" :style="[textStyle]" :decode="decode" :selectable="selectable" :user-select="selectable" @click="onClick">
    <slot>{{ text }}</slot>
  </text>
</template>
<script setup lang="ts">
import { textEmits, textProps } from "./index"
import { useStyle, useColor, useUnit } from "../hooks"

defineOptions({ name: "zm-text" })

const props = defineProps(textProps)
const emits = defineEmits(textEmits)

const style = computed(() => {
  const style: any = {}
  style.fontWeight = props.weight
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.size)
  if (props.rows && props.rows !== Infinity) {
    style["-webkit-line-clamp"] = props.rows
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const textStyle = computed(() => {
  const style: any = {}
  style.fontWeight = props.weight
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.size)
  style.textAlign = props.align
  style.lineHeight = props.lineHeight
  style.textOverflow = props.overflow
  style.textDecoration = props.decoration
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const prefixStyle = computed(() => {
  const style: any = {}
  style.fontWeight = props.prefixWeight
  style.color = useColor(props.prefixColor)
  style.fontSize = useUnit(props.prefixSize)
  style.marginRight = useUnit(props.prefixGutter)
  style.textDecoration = props.prefixDecoration
  return useStyle(style)
})

const suffixStyle = computed(() => {
  const style: any = {}
  style.fontWeight = props.suffixWeight
  style.color = useColor(props.suffixColor)
  style.fontSize = useUnit(props.suffixSize)
  style.marginLeft = useUnit(props.suffixGutter)
  style.textDecoration = props.suffixDecoration
  return useStyle(style)
})

const classs = computed(() => {
  const list: string[] = []
  if (props.clickable) list.push("zm-text--clickable")
  if (props.rows && props.rows !== Infinity) {
    list.push("zm-text--rows")
  }
  return list
})

/**
 * 点击事件
 */
function onClick() {
  if (props.cell) {
    uni.makePhoneCall({ phoneNumber: props.text as string })
  }
  emits("click")
}

defineExpose({ name: "zm-text" })
</script>
<script lang="ts">
export default {
  name: "zm-text",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-text {
  &--rows {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  &--clickable {
    /* #ifndef MP-WEIXIN */
    cursor: pointer;
    /* #endif */
    &:active {
      opacity: 0.6;
    }
  }
}
</style>
