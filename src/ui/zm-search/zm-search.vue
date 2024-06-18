<template>
  <view class="zm-search" :class="[customClass]" :style="[style]">
    <view class="zm-search__content" :class="[contentClass]" :style="[contentStyle]" @click="onClick">
      <view class="zm-search__icon">
        <slot name="icon">
          <zm-icon :name="icon" :size="iconSize" :color="iconColor" :weight="iconWeight"></zm-icon>
        </slot>
      </view>
      <input
        class="zm-search__value"
        :style="[valueStyle]"
        v-model="modelValue"
        type="text"
        confirm-type="search"
        :focus="focus"
        :disabled="disabled"
        :maxlength="maxlength"
        :placeholder="placeholder"
        @blur="onBlur"
        @focus="onFocus"
        @confirm="onConfirm"
      />
      <view class="zm-search__clear" v-if="clearabled" @click="onClickClear">
        <slot name="clear">
          <zm-icon name="clear" color="#999" size="28rpx"></zm-icon>
        </slot>
      </view>
    </view>
    <view class="zm-search__action" v-if="action" @click="onClickAction">
      <slot name="action">
        <zm-button text :text-size="actionSize" :text-color="actionColor" :text-weight="actionWeight">{{ actionText }}</zm-button>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useStyle, useColor, useUnit } from "../hooks"
import { searchEmits, searchProps, searchInputAlign } from "./index"
import { InputOnBlurEvent, InputOnFocusEvent } from "@uni-helper/uni-app-types/index"

defineOptions({ name: "zm-search" })

const emits = defineEmits(searchEmits)
const props = defineProps(searchProps)

const modelValue = ref(props.modelValue)

const style = computed(() => {
  const style: any = {}
  style.height = useUnit(props.height)
  style.margin = useUnit(props.margin)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const contentStyle = computed(() => {
  const style: any = {}
  style.border = props.border
  style.background = useColor(props.background)
  if (props.shape === "square") style.borderRadius = useUnit(props.radius)
  return useStyle(style)
})

const contentClass = computed(() => {
  return `zm-search__content--${props.shape}`
})

const valueStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  if (searchInputAlign.includes(props.inputAlign)) style.textAlign = props.inputAlign
  return useStyle({ ...style, ...useStyle(props.inputStyle) })
})

const clearabled = computed(() => {
  return props.clearabled && modelValue.value
})

watch(() => modelValue.value, updateValue)
watch(
  () => props.modelValue,
  (val) => (modelValue.value = val),
)

function updateValue(value: string) {
  emits("update:modelValue", value)
  nextTick(() => emits("change", value))
}

function onBlur(event: InputOnBlurEvent) {
  emits("blur", event)
}

function onFocus(event: InputOnFocusEvent) {
  emits("focus", event)
}

function onConfirm() {
  emits("search", modelValue.value)
}

function onClick(event: TouchEvent) {
  if (props.disabled) emits("click", event)
}

function onClickClear(event: TouchEvent) {
  modelValue.value = ""
  updateValue("")
  emits("clear", event)
}

function onClickAction(event: TouchEvent) {
  emits("action", event)
}

defineExpose({ name: "zm-search" })
</script>
<script lang="ts">
export default {
  name: "zm-search",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-search {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__content {
    flex: 1;
    height: 100%;
    display: flex;
    padding: 0 16rpx;
    align-items: center;
    background-color: #f7f8fa;

    &--round {
      border-radius: 999px;
    }
  }

  &__icon {
    display: flex;
    margin-right: 8rpx;
  }

  &__value {
    width: 100%;
    font-size: 28rpx;
  }

  &__clear {
    margin-left: 16rpx;
  }

  &__action {
    margin-left: 16rpx;
  }
}
</style>
