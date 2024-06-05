<template>
  <view class="zm-cascader" :class="[customClass]" :style="[style]" @click="onClick">
    <view class="zm-cascader__header" v-if="showHeader">
      <slot name="title">
        <text class="zm-cascader__header__title">{{ title }}</text>
      </slot>
      <slot name="close">
        <zm-icon
          v-if="closeable"
          custom-class="zm-cascader__header__close"
          :name="closeIcon"
          :size="closeIconSize"
          :color="closeIconColor"
          :weight="closeIconWeight"
          @click="onClickClose"
        ></zm-icon>
      </slot>
    </view>
    <scroll-view scroll-x>
      <view class="zm-cascader__tabs">
        <view
          class="zm-cascader__tabs__tab"
          :class="{ 'zm-cascader__tabs__tab--unselected': !item.selected }"
          v-for="(item, index) in tabs"
          :key="index"
          @click="onClickTab(item, index)"
        >
          {{ item.selected ? item.selected[textKey] : placeholder }}
        </view>
        <view class="zm-cascader__tabs__line" :style="[tabsLineStyle]"></view>
      </view>
    </scroll-view>
    <swiper class="zm-cascader__swiper" :current="activeTab" @change="onSwiperChange">
      <swiper-item class="zm-cascader__swiper__item" v-for="(item, index) in tabs" :key="index">
        <view class="zm-cascader__options">
          <view
            class="zm-cascader__options__option"
            :class="{ 'zm-cascader__options__option--selected': option[valueKey] === item.selected[valueKey] }"
            v-for="(option, optionIndex) in item.options"
            :key="optionIndex"
            @click="onClickOption(option, index)"
          >
            <view class="option-text">{{ option[textKey] }}</view>
            <zm-icon name="check" v-if="option[valueKey] === item.selected[valueKey]"></zm-icon>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import { useStyle, useColor, useUnit, useUnitToPx, useElRects } from "../hooks"
import { cascaderEmits, cascaderProps, CascaderOption, CascaderTab } from "./index"
import { ImageOnErrorEvent, ImageOnLoadEvent, SwiperOnChange } from "@uni-helper/uni-app-types"

defineOptions({ name: "zm-cascader" })

const emits = defineEmits(cascaderEmits)
const props = defineProps(cascaderProps)
const instance = getCurrentInstance()

const tabs = ref<CascaderTab[]>([])
const tabsRect = ref<UniApp.NodeInfo[]>([])
const activeTab = ref(0)

const { text: textKey, value: valueKey, children: childrenKey, disabled: disabledKey } = props.fieldKeys

const style = computed(() => {
  const style: any = {}

  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const tabsLineStyle = computed(() => {
  const style: any = {}
  if (tabsRect.value.length > 0 && tabsRect.value[activeTab.value]) {
    style.left = `${tabsRect.value[activeTab.value].left}px`
    style.width = `${tabsRect.value[activeTab.value].width}px`
  }
  return style
})

watch(
  () => tabs.value,
  (val) => {
    console.log(val, "tabs")
  },
  { immediate: true },
)

watch(
  () => activeTab.value,
  (val) => {
    console.log(val, "activeTab")
  },
  { immediate: true },
)

watch(() => props.options, updateTabs, { deep: true })
watch(
  () => activeTab.value,
  () => {
    updateRect()
  },
  { immediate: true },
)
watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      const values = tabs.value.map((tab) => tab.selected?.[valueKey])
      if (values.includes(value)) return
    }
    updateTabs()
  },
)

function updateTabs() {
  const { options, modelValue } = props
  if (modelValue !== undefined) {
    const selectedOptions = getSelectedOptionsByValue(options, modelValue)

    if (selectedOptions) {
      let optionsCursor = options

      tabs.value = selectedOptions.map((option) => {
        const tab = { options: optionsCursor, selected: option }

        const next = optionsCursor.find((item) => item[valueKey] === option[valueKey])
        if (next) {
          optionsCursor = next[childrenKey]
        }

        return tab
      })

      if (optionsCursor) {
        tabs.value.push({ options: optionsCursor, selected: null })
      }

      nextTick(() => {
        activeTab.value = tabs.value.length - 1
      })

      return
    }
    tabs.value = [{ options, selected: null }]
  }
}

function getSelectedOptionsByValue(options: CascaderOption[], value: string | number): CascaderOption[] {
  for (const option of options) {
    if (option[valueKey] === value) return [option]

    if (option[childrenKey]) {
      const selectedOptions = getSelectedOptionsByValue(option[childrenKey], value)
      if (selectedOptions) return [option, ...selectedOptions]
    }
  }
}

async function updateRect() {
  await nextTick()
  tabsRect.value = await useElRects(".zm-cascader__tabs__tab", instance)
}

function onClickTab(item: CascaderTab, index: number) {
  activeTab.value = index
}

function onClickOption(option: CascaderOption, index: number) {
  if (option[disabledKey]) return

  tabs.value[index].selected = option

  if (tabs.value.length > index + 1) {
    tabs.value = tabs.value.slice(0, index + 1)
  }

  if (option[childrenKey]) {
    const nextTab = { options: option[childrenKey], selected: null }

    if (tabs.value[index + 1]) {
      tabs.value[index + 1] = nextTab
    } else {
      tabs.value.push(nextTab)
    }

    nextTick(() => {
      activeTab.value++
    })
  }

  const selectedOptions = tabs.value.map((tab) => tab.selected).filter(Boolean)

  emits("update:modelValue", option[valueKey])

  const params = { value: option[valueKey], index, selectedOptions }
  emits("change", params)

  if (!option[childrenKey]) {
    emits("finish", params)
  }
}

function onClick(event: TouchEvent) {
  emits("click", event)
}

function onSwiperChange(event: any) {
  activeTab.value = event.detail.current
}

function onClickClose() {}

updateTabs()
defineExpose({ name: "zm-cascader" })
</script>
<script lang="ts">
export default {
  name: "zm-cascader",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-cascader {
  &__header {
    display: flex;
    padding: 24rpx;
    align-items: center;
    justify-content: space-between;

    &__title {
      font-size: 32rpx;
      font-weight: bold;
    }

    &__close {
      cursor: pointer;
    }
  }

  &__tabs {
    height: 100rpx;
    display: flex;
    padding: 0 12rpx;
    position: relative;

    &__tab {
      height: 100%;
      display: flex;
      cursor: pointer;
      margin: 0 12rpx;
      font-size: 28rpx;
      width: max-content;
      font-weight: bold;
      align-items: center;
      justify-content: center;

      &--unselected {
        color: #969799;
        font-weight: normal;
      }
    }

    &__line {
      left: 0;
      width: 100rpx;
      bottom: 0;
      height: 6rpx;
      position: absolute;
      transition: all 0.3s;
      border-radius: 4rpx;
      background-color: var(--primary-color);
    }
  }

  &__options {
    padding-top: 24rpx;

    &__option {
      display: flex;
      font-size: 28rpx;
      font-weight: bold;
      padding: 12rpx 24rpx;
      align-items: center;
      justify-content: space-between;

      &--selected {
        color: var(--primary-color);
      }
    }
  }
}
</style>
