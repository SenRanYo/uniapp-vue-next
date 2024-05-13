<template>
  <view class="zm-tabs" :class="[wrapClass, customClass]" :style="[wrapStyle]">
    <scroll-view :scroll-x="scrollable" enable-flex scroll-with-animation :scroll-left="scrollLeft" class="zm-tabs__scroll">
      <view class="zm-tabs__list">
        <view
          v-for="(item, idx) in list"
          :key="idx"
          :style="[tabStyle(idx)]"
          class="zm-tabs__tab"
          :class="{ 'is-active': index === idx, 'is-disabled': item[disabledKey] }"
          @click="onClickTab(idx)"
        >
          <text class="zm-tabs__text" :style="[textStyle(idx)]">{{ item[textKey] }}</text>
        </view>
        <view class="zm-tabs__line" :style="[lineStyle]"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { useStyle, useUnit, useColor, useElRect } from "../hooks"

const emits = defineEmits(["change", "update:modelValue"])
const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  list: { type: Array, default: () => [] },
  height: { type: [String, Number], default: "" },
  sticky: { type: Boolean, default: false },
  scrollable: { type: Boolean, default: false },
  activeSize: { type: [String, Number], default: "" },
  activeColor: { type: String, default: "" },
  activeWeight: { type: [String, Number], default: "" },
  inactiveSize: { type: [String, Number], default: "" },
  inactiveColor: { type: String, default: "" },
  inactiveWeight: { type: [String, Number], default: "" },
  lineColor: { type: String, default: "" },
  lineWidth: { type: [String, Number], default: "" },
  lineHeight: { type: [String, Number], default: "" },
  lineRadius: { type: [String, Number], default: "" },
  tabMaxWidth: { type: [String, Number], default: "" },
  background: { type: String, default: "" },
  duration: { type: [String, Number], default: "" },
  offsetTop: { type: [String, Number], default: "0" },
  borderBottom: { type: Boolean, default: false },
  zIndex: { type: [String, Number], default: "" },
  textKey: { type: String, default: "text" },
  valueKey: { type: String, default: "value" },
  disabledKey: { type: String, default: "disabled" },
  customClass: { type: String, default: "" },
  customStyle: { type: [Object, String], default: "" },
})

const init = ref(false)
const index = ref(0)
const tabsRect: any = ref([])
const lineRect: any = ref({})
const scrollRect: any = ref({})
const scrollLeft = ref(0)

const wrapClass = computed(() => {
  const list = []
  if (props.sticky) list.push("zm-tabs--sticky")
  if (props.scrollable) list.push("zm-tabs--scrollable")
  if (props.borderBottom) list.push("zm-tabs--border")
  return list
})

const wrapStyle = computed(() => {
  const style: any = {}
  style.zIndex = props.zIndex
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  if (props.sticky) {
    style.top = useUnit(props.offsetTop)
    style.position = "sticky"
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const tabStyle = computed(() => {
  return (idx: number) => {
    return useStyle({ maxWidth: useUnit(props.tabMaxWidth) })
  }
})

const textStyle = computed(() => {
  return (idx: any) => {
    const style: any = {}
    if (index.value === idx) {
      style.color = useColor(props.activeColor)
      style.fontSize = useUnit(props.activeSize)
      style.fontWeight = props.activeWeight
    } else {
      style.color = useColor(props.inactiveColor)
      style.fontSize = useUnit(props.inactiveSize)
      style.fontWeight = props.inactiveWeight
    }
    return useStyle(style)
  }
})

const lineStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.lineWidth)
  style.height = useUnit(props.lineHeight)
  style.background = useColor(props.lineColor)
  style.borderRadius = useUnit(props.lineRadius)
  style.transitionDuration = props.duration
  const tabRect = tabsRect.value[index.value]
  if (tabRect) {
    let left = 0
    if (props.lineWidth == "100%") {
      left = tabRect.left - scrollRect.value.left
      style.width = tabRect.width + "px"
    } else {
      left = tabRect.left + (tabRect.width - lineRect.value.width) / 2 - scrollRect.value.left
    }
    style.transform = `translate(${left}px)`
  }
  if (init.value) style.visibility = "visible"
  return useStyle(style)
})

watch(() => props.list, resize, { deep: true, immediate: true })
watch(() => props.modelValue, onValueChange, { immediate: true })
watch(() => index.value, onIndexChange)

async function resize() {
  await nextTick()
  tabsRect.value = await useElRect(".zm-tabs__tab", true)
  lineRect.value = await useElRect(".zm-tabs__line")
  scrollRect.value = await useElRect(".zm-tabs__scroll")
  init.value = true
}

function onClickTab(idx: number) {
  if (index.value === idx) return
  if (props.list[idx][props.disabledKey]) return
  index.value = idx
}

function onValueChange(val: number) {
  const idx = props.list.findIndex((item) => item[props.valueKey] === val)
  index.value = idx >= 0 ? idx : 0
}

function onIndexChange() {
  emits("change", props.list[index.value])
  emits("update:modelValue", props.list[index.value][props.valueKey])
}

defineExpose({ resize })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-tabs {
  width: 100%;
  height: 88rpx;
  display: flex;
  z-index: 1;
  position: relative;
  background-color: #fff;

  &--border::after {
    left: 0;
    width: 100%;
    bottom: 0;
    content: "";
    position: absolute;
    border-bottom: 1rpx solid #eee;
  }

  &--scrollable {
    .zm-tabs__tab {
      flex: 1 0 auto;
    }
  }

  &__scroll {
    flex: 1;
    display: flex;
    position: relative;
  }

  &__list {
    flex: 1;
    height: 100%;
    display: flex;
    position: relative;
  }

  &__tab {
    flex: 1;
    display: flex;
    padding: 0 24rpx;
    position: relative;
    align-items: center;
    justify-content: center;

    &.is-active {
      .zm-tabs__text {
        color: $primary-color;
      }
    }

    &.is-disabled {
      opacity: 0.5;
    }
  }

  &__text {
    font-size: 28rpx;
    overflow: hidden;
    display: -webkit-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    transition: all 0.3s ease;
    -webkit-box-orient: vertical;
  }

  &__line {
    bottom: 0;
    width: 40rpx;
    height: 6rpx;
    position: absolute;
    visibility: hidden;
    border-radius: 9999rpx;
    transition: all 0.3s ease-out;
    background-color: var(--theme-color);
  }
}
</style>
