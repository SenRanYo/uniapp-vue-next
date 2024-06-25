<template>
  <view class="zm-back-top" :class="[classs, customClass]" :style="[style]">123</view>
</template>

<script setup lang="ts">
import { viewKey } from "../zm-view"
import { backTopEmits, backTopProps } from "./index"
import { useStyle, useColor, useUnit, useParent, useElRect } from "../hooks"

defineOptions({ name: "zm-back-top" })

const emits = defineEmits(backTopEmits)
const props = defineProps(backTopProps)
const { parent } = useParent(viewKey)

const rect = ref<UniApp.NodeInfo>(null)
const instance = getCurrentInstance()

const classs = computed(() => {
  const list: any = []
  return list
})

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// watch(
//   () => parent.scrollTop.value,
//   (v) => {
//     console.log(v)
//   },
// )

// function onEvent() {
//   if (parent) {
//     parent.mitt.on("scroll", (e) => {
//       console.log(e)
//     })
//   }
// }

// onMounted(() => onEvent())
defineExpose({ name: "zm-back-top" })
</script>
<script lang="ts">
export default {
  name: "zm-back-top",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-back-top {
  display: flex;
}
</style>
