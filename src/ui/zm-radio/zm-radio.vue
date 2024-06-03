<template>
  <view class="zm-radio" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <view class="zm-radio__icon" @click.stop="onClickIcon">
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
import { useStyle, useUnit, useColor } from "../hooks"
import { radioEmits, radioProps, RadioNameType } from "./index"

defineOptions({ name: "zm-radio" })
const emits = defineEmits(radioEmits)
const props = defineProps(radioProps)
const radioGroup = inject("zm-radio-group", null)

const index = ref(null)
const slots = useSlots()

const style = computed(() => {
  const style: any = {}
  style.fontSize = useUnit(radioGroup?.iconSize.value || props.iconSize)
  if (radioGroup?.iconColor.value || props.iconColor) {
    style["--zm-radio-icon-color"] = useColor(radioGroup?.iconColor.value || props.iconColor)
  }
  if (radioGroup?.checkedIconColor.value || props.checkedIconColor) {
    style["--zm-radio-checked-icon-color"] = useColor(radioGroup?.checkedIconColor.value || props.checkedIconColor)
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list = []
  if (isChecked.value) list.push("zm-radio--checked")
  if (radioGroup?.disabled.value || props.disabled) list.push("zm-radio--disabled")
  if (radioGroup?.labelLeft.value || props.labelLeft) list.push("zm-radio--left")
  return list
})

const iconStyle = computed(() => {
  const style: any = {}
  if (isChecked.value) {
    style.background = useColor(radioGroup?.checkedColor.value || props.checkedColor)
  }
  return useStyle(style)
})

const iconClass = computed(() => {
  const list = []
  if (radioGroup?.shape.value || props.shape) list.push(`zm-icon--${radioGroup?.shape.value || props.shape}`)
  if (radioGroup?.icon.value || props.icon) list.push(`${radioGroup?.iconPrefix.value || props.iconPrefix}-${radioGroup?.icon.value || props.icon}`)
  return list
})

const iconDefaultStyle = computed(() => {
  const style: any = {}
  style.color = useColor(radioGroup?.iconColor.value || props.iconColor)
  style.fontSize = useUnit(radioGroup?.iconSize.value || props.iconSize)
  style.fontWeight = radioGroup?.iconWeight.value || props.iconWeight
  // if (!radioGroup?.round.value || !props.round) {
  //   style.borderRadius = radioGroup?.iconRadius.value || props.iconRadius
  // }
  if (radioGroup?.modelValue.value) {
    style.borderColor = useColor(radioGroup?.checkedColor.value || props.checkedColor)
  }
  if (isChecked.value) {
    style.borderColor = useColor(radioGroup?.checkedIconColor.value || props.checkedIconColor)
    style.backgroundColor = useColor(radioGroup?.checkedIconColor.value || props.checkedIconColor)
  }
  return useStyle(style)
})

const isShowLabel = computed(() => {
  return slots.default || props.label
})

const labelStyle = computed(() => {
  const style: any = {}
  style.color = useColor(radioGroup?.labelColor.value || props.labelColor)
  style.fontSize = useUnit(radioGroup?.labelSize.value || props.labelSize)
  style.fontWeight = radioGroup?.labelWeight.value || props.labelWeight
  if (radioGroup?.modelValue.value && (radioGroup?.checkedLabelColor.value || props.checkedLabelColor)) {
    style.color = useColor(radioGroup?.checkedLabelColor.value || props.checkedLabelColor)
  }
  if (props.labelGap) {
    props.labelLeft ? (style.marginRight = useUnit(radioGroup?.labelGap.value || props.labelGap)) : (style.marginLeft = useUnit(radioGroup?.labelGap.value || props.labelGap))
  }
  return useStyle(style)
})

const isChecked = computed(() => {
  return radioGroup.modelValue.value == props.name
})

function resize() {
  radioGroup?.addChildren({ name: props.name })
  index.value = radioGroup?.childrens.value.findIndex(({ name }) => name === props.name)
}

function toggle() {
  radioGroup.updateValue(props.name)
}

function onClick(event: TouchEvent) {
  if (props.disabled || radioGroup?.disabled.value || isChecked.value) return
  toggle()
  emits("click", event)
}

function onClickIcon(event: TouchEvent) {
  if (props.disabled || radioGroup?.disabled.value || isChecked.value) return
  toggle()
  emits("click", event)
}

function onClickLabel(event: TouchEvent) {
  if (props.disabled || radioGroup?.disabled.value || props.labelDisabled || radioGroup.labelDisabled.value || isChecked.value) return
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
