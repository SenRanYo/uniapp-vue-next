<template>
  <view class="zm-radio" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <view class="zm-radio__icon" :class="[iconClass]" @click.stop="onClickIcon">
      <slot name="icon">
        <view class="zm-radio__icon__default" :class="{ 'is-checked': isChecked }" :style="[iconDefaultStyle]">
          <text class="zm-icon" :class="[iconClass]" :style="[iconStyle]"></text>
        </view>
      </slot>
    </view>
    <view v-if="isShowLabel" class="zm-radio__label" :style="[labelStyle]" @click.stop="onClickLabel">
      <slot>{{ label }}</slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { radioGroupKey } from "../zm-radio-group"
import { radioEmits, radioProps } from "./index"
import { useStyle, useUnit, useColor, useParent } from "../hooks"

defineOptions({ name: "zm-radio" })

const emits = defineEmits(radioEmits)
const props = defineProps(radioProps)
const slots = useSlots()
const { parent, index } = useParent(radioGroupKey)
const parentProp = (name: string) => parent && parent.props[name]

const style = computed(() => {
  const style: any = {}
  style.fontSize = useUnit(parentProp("iconSize") || props.iconSize)
  if (parentProp("iconColor") || props.iconColor) {
    style["--zm-radio-icon-color"] = useColor(parentProp("iconColor") || props.iconColor)
  }
  if (parentProp("checkedIconColor") || props.checkedIconColor) {
    style["--zm-radio-checked-icon-color"] = useColor(parentProp("checkedIconColor") || props.checkedIconColor)
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list = []
  if (isChecked.value) list.push("zm-radio--checked")
  if (parentProp("disabled") || props.disabled) list.push("zm-radio--disabled")
  if (parentProp("labelLeft") || props.labelLeft) list.push("zm-radio--left")
  return list
})

const iconStyle = computed(() => {
  const style: any = {}
  if (isChecked.value) {
    style.background = useColor(parentProp("checkedColor") || props.checkedColor)
  }
  return useStyle(style)
})

const iconClass = computed(() => {
  const list = []
  if (parentProp("shape") || props.shape) list.push(`zm-icon--${parentProp("shape") || props.shape}`)
  if (parentProp("icon") || props.icon) list.push(`${parentProp("iconPrefix") || props.iconPrefix}-${parentProp("icon") || props.icon}`)
  return list
})

const iconDefaultStyle = computed(() => {
  const style: any = {}
  style.color = useColor(parentProp("iconColor") || props.iconColor)
  style.fontSize = useUnit(parentProp("iconSize") || props.iconSize)
  style.fontWeight = parentProp("iconWeight") || props.iconWeight
  // if (!radioGroup?.round.value || !props.round) {
  //   style.borderRadius = radioGroup?.iconRadius.value || props.iconRadius
  // }
  if (parentProp("modelValue")) {
    style.borderColor = useColor(parentProp("checkedColor") || props.checkedColor)
  }
  if (isChecked.value) {
    style.borderColor = useColor(parentProp("checkedIconColor") || props.checkedIconColor)
    style.backgroundColor = useColor(parentProp("checkedIconColor") || props.checkedIconColor)
  }
  return useStyle(style)
})

const isShowLabel = computed(() => {
  return slots.default || props.label
})

const labelStyle = computed(() => {
  const style: any = {}
  style.color = useColor(parentProp("labelColor") || props.labelColor)
  style.fontSize = useUnit(parentProp("labelSize") || props.labelSize)
  style.fontWeight = parentProp("labelWeight") || props.labelWeight
  if (parentProp("modelValue") && (parentProp("checkedIconColor") || props.checkedLabelColor)) {
    style.color = useColor(parentProp("checkedLabelColor") || props.checkedLabelColor)
  }
  if (props.labelGap) {
    props.labelLeft ? (style.marginRight = useUnit(parentProp("labelGap") || props.labelGap)) : (style.marginLeft = useUnit(parentProp("labelGap") || props.labelGap))
  }
  return useStyle(style)
})

const isChecked = computed(() => {
  return parentProp("modelValue") == props.name
})

function resize() {
  console.log(index.value)
}

function toggle() {
  parent.updateValue(props.name)
}

function onClick(event: TouchEvent) {
  if (props.disabled || parentProp("disabled") || isChecked.value) return
  toggle()
  emits("click", event)
}

function onClickIcon(event: TouchEvent) {
  if (props.disabled || parentProp("disabled") || isChecked.value) return
  toggle()
  emits("click", event)
}

function onClickLabel(event: TouchEvent) {
  if (props.disabled || parentProp("disabled") || props.labelDisabled || parentProp("labelDisabled") || isChecked.value) return
  toggle()
  emits("click", event)
}

onMounted(() => resize())
defineExpose({ name: "zm-radio", toggle })
</script>
<script lang="ts">
export default {
  name: "zm-radio",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-radio {
  display: flex;
  user-select: none;
  align-items: center;

  &--disabled {
    .zm-checkbox__icon {
      background-color: #ebedf0;

      .zm-icon {
        color: #c8c9cc;
        border-color: #c8c9cc;
        background-color: #ebedf0;
      }
    }
  }

  &__icon {
    display: flex;
    cursor: pointer;
    position: relative;

    &__default {
      display: flex;
      transition: all 0.3s;
      border: 2rpx solid var(--zm-checkbox-icon-color);

      &.is-round {
        border-radius: 999px;
      }

      &.is-checked {
        border-color: var(--primary-color);
        background-color: var(--primary-color);

        .zm-icon {
          opacity: 1;
          transform: scale(1);
          transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
        }
      }
    }

    .zm-icon {
      width: 1em;
      height: 1em;
      opacity: 0;
      padding: 2rpx;
      line-height: 1;
      color: #fff;
      transform: scale(0);
      border-radius: inherit;
      box-sizing: content-box;
      transition:
        all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),
        opacity 0.1s;
    }
  }

  &__label {
    flex: 1;
    margin-left: 8rpx;
  }

  &--left {
    flex-direction: row-reverse;

    .zm-checkbox__label {
      margin-left: 0;
      margin-right: 8rpx;
    }
  }
}
</style>
