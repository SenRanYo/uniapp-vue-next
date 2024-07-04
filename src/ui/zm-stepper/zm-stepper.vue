<template>
  <view class="zm-stepper" :class="[classs, customClass]" :style="[style]">
    <view v-if="showMinus" class="zm-stepper__minus" :class="[minusClasss]" @click="onMinus" @touchstart="onMinusTouchstart" @touchend="onTouchend">
      <slot name="minus" :disabled="minusDisabled">
        <view class="zm-stepper__icon" :style="[iconStyle]">
          <zm-icon name="minus" :size="buttonTextSize" :color="useColor(buttonTextColor)"></zm-icon>
        </view>
      </slot>
    </view>
    <input :style="[inputStyle]" v-model="current" :disabled="inputDisabled" class="zm-stepper__input" :type="integer ? 'number' : 'digit'" placeholder="" @input="onInput" />
    <view v-if="showPlus" class="zm-stepper__plus" :class="[plusClasss]" @click="onPlus" @touchstart="onPlusTouchstart" @touchend="onTouchend">
      <slot name="plus" :disabled="plusDisabled">
        <view class="zm-stepper__icon" :style="[iconStyle]">
          <zm-icon name="plus" :size="buttonTextSize" :color="useColor(buttonTextColor)"></zm-icon>
        </view>
      </slot>
    </view>
  </view>
</template>
<script setup lang="ts">
import { addNumber } from "../utils/utils"
import { formatNumber } from "../utils/format"
import { stepperEmits, stepperProps } from "./index"
import { useStyle, useColor, useUnit } from "../hooks"
import { InputOnInputEvent } from "@uni-helper/uni-app-types/index"
import { isNumber, isEqual, isFunction, isEmpty } from "../utils/check"

defineOptions({ name: "zm-stepper" })

const props = defineProps(stepperProps)
const emits = defineEmits(stepperEmits)

const timer = ref(null)
const loading = ref(false)
const origin = ref(initialValue())
const current = ref(initialValue())
const isLongPress = ref(false)

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (props.disabled) list.push("zm-stepper--disabled")
  return list
})

const iconStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.buttonSize)
  style.height = useUnit(props.buttonSize)
  style.background = useUnit(props.buttonColor)
  return useStyle(style)
})

const inputStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.inputWidth)
  style.margin = `0 ${useUnit(props.gutter)}`
  return useStyle(style)
})

const plusClasss = computed(() => {
  const list: string[] = []
  if (loading.value) list.push("zm-stepper__minus--loading")
  if (plusDisabled.value) list.push("zm-stepper__plus--disabled")
  return list
})

const minusClasss = computed(() => {
  const list: string[] = []
  if (loading.value) list.push("zm-stepper__minus--loading")
  if (minusDisabled.value) list.push("zm-stepper__minus--disabled")
  return list
})

const plusDisabled = computed(() => props.disabled || props.disablePlus || +current.value >= +props.max)
const minusDisabled = computed(() => props.disabled || props.disableMinus || +current.value <= +props.min)
const inputDisabled = computed(() => props.disabled || props.disabledInput)

watch(
  () => props.modelValue,
  (val) => {
    if (!isEqual(val, current.value)) {
      current.value = format(val)
    }
  },
)

function onPlus() {
  if (loading.value) return
  if (plusDisabled.value) {
    emits("overlimit", "plus")
    return
  }
  updateValue(format(addNumber(+current.value, +props.step)))
}

function onMinus() {
  if (loading.value) return
  if (minusDisabled.value) {
    emits("overlimit", "minus")
    return
  }
  updateValue(format(addNumber(+current.value, -props.step)))
}

function onInput(event: InputOnInputEvent) {
  if (isEmpty(event.detail.value)) return

  let formatted = formatNumber(event.detail.value, !props.integer)

  if (isNumber(props.decimalLength) && formatted.includes(".")) {
    const pair = formatted.split(".")
    formatted = `${pair[0]}.${pair[1].slice(0, +props.decimalLength)}`
  }

  if (+origin.value === +formatted) return
  if (event.detail.value.length < String(origin.value).length) return

  nextTick(() => {
    origin.value = event.detail.value
    current.value = format(formatted)
    const isNumeric = current.value === String(+current.value)
    updateValue(isNumeric ? +current.value : current.value)
  })
}

function onMinusTouchstart() {
  if (props.longPress) {
    isLongPress.value = false
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      isLongPress.value = true
      longPressStep("minus")
    }, 500)
  }
}
function onPlusTouchstart() {
  if (props.longPress) {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      isLongPress.value = true
      longPressStep("plus")
    }, 500)
  }
}

function onTouchend(event: TouchEvent) {
  if (props.longPress) {
    clearInterval(timer.value)
  }
  // #ifdef WEB
  if (isLongPress.value) {
    event.preventDefault()
    event.stopPropagation()
  }
  // #endif
}

function longPressStep(type = "plus") {
  timer.value = setTimeout(() => {
    type === "plus" ? onPlus() : onMinus()
    longPressStep(type)
  }, 200)
}

function updateValue(val: number | string) {
  console.log(val)
  const next = async () => {
    loading.value = false
    current.value = val
    emits("change", val, props.name)
    emits("update:modelValue", val)
  }
  if (isFunction(props.beforeChange)) {
    loading.value = true
    props.beforeChange(val, next)
  } else {
    next()
  }
}

function format(value: number | string, fixed = true) {
  value = formatNumber(String(value), !props.integer)
  value = value === "" ? 0 : +value
  value = Number.isNaN(value) ? +props.min : value
  value = fixed ? Math.max(Math.min(+props.max, value), +props.min) : value
  if (isNumber(props.decimalLength)) value = value.toFixed(+props.decimalLength)
  return value
}

function initialValue() {
  const defaultValue = props.modelValue ?? props.value
  const value = format(defaultValue)
  if (!isEqual(value, props.modelValue)) {
    emits("update:modelValue", value)
  }
  return value
}

defineExpose({ name: "zm-stepper" })
</script>
<script lang="ts">
export default {
  name: "zm-stepper",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-stepper {
  width: max-content;
  flex-shrink: 0;
  align-items: center;
  display: inline-flex;
  justify-content: center;

  &__minus {
    display: flex;
    align-items: center;
    touch-action: none;
    justify-content: center;

    &--loading {
      .zm-stepper__icon {
        cursor: not-allowed;
      }
    }

    &--disabled {
      .zm-stepper__icon {
        opacity: 0.6;
      }
    }
  }

  &__plus {
    display: flex;
    align-items: center;
    touch-action: none;
    justify-content: center;

    &--loading {
      .zm-stepper__icon {
        cursor: not-allowed;
      }
    }

    &--disabled {
      .zm-stepper__icon {
        opacity: 0.6;
      }
    }
  }

  &__icon {
    width: 40rpx;
    height: 40rpx;
    display: flex;
    align-items: center;
    border-radius: 4rpx;
    justify-content: center;
    background-color: #f2f3f5;
  }

  &__input {
    width: 48rpx;
    margin: 0 8rpx;
    font-size: 24rpx;
    text-align: center;
  }
}
</style>
