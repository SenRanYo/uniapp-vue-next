<template>
  <view class="zm-checkbox" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <view class="zm-checkbox__icon" @click.stop="onClickIcon">
      <slot name="icon">
        <view class="zm-checkbox__icon__default" :class="{ 'is-round': round, 'is-checked': isChecked }" :style="[iconDefaultStyle]">
          <text class="zm-icon" :class="[iconClass]" :style="[iconStyle]"></text>
        </view>
      </slot>
    </view>
    <view v-if="isShowLabel" class="zm-checkbox__label" :style="[labelStyle]" @click.stop="onClickLabel">
      <slot>{{ label }}</slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { isBoolean } from "../utils/check"
import { useStyle, useUnit, useColor } from "../hooks"
import { checkboxEmits, checkboxProps, CheckboxValueType } from "./index"

defineOptions({ name: "zm-checkbox" })
const emits = defineEmits(checkboxEmits)
const props = defineProps(checkboxProps)
const checkboxGroup = inject("zm-checkbox-group", null)

const slots = useSlots()
const index = ref(null)

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    updateValue(value)
  },
})

const style = computed(() => {
  const style: any = {}
  style.fontSize = useUnit(checkboxGroup?.iconSize.value || props.iconSize)
  if (checkboxGroup?.iconColor.value || props.iconColor) {
    style["--zm-checkbox-icon-color"] = useColor(checkboxGroup?.iconColor.value || props.iconColor)
  }
  if (checkboxGroup?.checkedIconColor.value || props.checkedIconColor) {
    style["--zm-checkbox-checked-icon-color"] = useColor(checkboxGroup?.checkedIconColor.value || props.checkedIconColor)
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list = []
  if (isChecked.value) list.push("zm-checkbox--checked")
  if (checkboxGroup?.disabled.value || props.disabled) list.push("zm-checkbox--disabled")
  if (checkboxGroup?.labelLeft.value || props.labelLeft) list.push("zm-checkbox--left")
  return list
})

const iconStyle = computed(() => {
  const style: any = {}
  if (modelValue.value) {
    style.background = useColor(checkboxGroup?.checkedColor.value || props.checkedColor)
  }
  return useStyle(style)
})

const iconClass = computed(() => {
  const list = []
  if (checkboxGroup?.round.value || props.round) list.push("zm-icon--round")
  if (checkboxGroup?.icon.value || props.icon) list.push(`${checkboxGroup?.iconPrefix.value || props.iconPrefix}-${checkboxGroup?.icon.value || props.icon}`)
  return list
})

const iconDefaultStyle = computed(() => {
  const style: any = {}
  style.color = useColor(checkboxGroup?.iconColor.value || props.iconColor)
  style.fontSize = useUnit(checkboxGroup?.iconSize.value || props.iconSize)
  style.fontWeight = checkboxGroup?.iconWeight.value || props.iconWeight
  if (!checkboxGroup?.round.value || !props.round) {
    style.borderRadius = checkboxGroup?.iconRadius.value || props.iconRadius
  }
  if (modelValue.value) {
    style.borderColor = useColor(checkboxGroup?.checkedColor.value || props.checkedColor)
  }
  if (isChecked.value) {
    style.borderColor = useColor(checkboxGroup?.checkedIconColor.value || props.checkedIconColor)
    style.backgroundColor = useColor(checkboxGroup?.checkedIconColor.value || props.checkedIconColor)
  }
  return useStyle(style)
})

const isShowLabel = computed(() => {
  return slots.default || props.label
})

const labelStyle = computed(() => {
  const style: any = {}
  style.color = useColor(checkboxGroup?.labelColor.value || props.labelColor)
  style.fontSize = useUnit(checkboxGroup?.labelSize.value || props.labelSize)
  style.fontWeight = checkboxGroup?.labelWeight.value || props.labelWeight
  if (modelValue.value && (checkboxGroup?.checkedLabelColor.value || props.checkedLabelColor)) {
    style.color = useColor(checkboxGroup?.checkedLabelColor.value || props.checkedLabelColor)
  }
  if (props.labelGap) {
    props.labelLeft ? (style.marginRight = useUnit(checkboxGroup?.labelGap.value || props.labelGap)) : (style.marginLeft = useUnit(checkboxGroup?.labelGap.value || props.labelGap))
  }
  return useStyle(style)
})

const isChecked = computed(() => {
  if (props.bindGroup && checkboxGroup) {
    return checkboxGroup?.modelValue.value.includes(props.name || index.value)
  } else {
    return modelValue.value
  }
})

function resize() {
  checkboxGroup?.addChildren({ name: props.name })
  index.value = checkboxGroup?.childrens.value.findIndex(({ name }) => name === props.name)
}

async function updateValue(value: CheckboxValueType) {
  emits("update:modelValue", toRaw(value))
  await nextTick()
  emits("change", toRaw(value))
}

function toggle(check?: boolean) {
  if (props.disabled || checkboxGroup?.disabled.value) return
  if (checkboxGroup && props.bindGroup) {
    const value = checkboxGroup.modelValue.value
    const index = value.indexOf(props.name)
    const add = () => {
      const isMax = checkboxGroup.max.value && value.length >= checkboxGroup.max.value
      if (!isMax && !value.includes(props.name)) {
        value.push(props.name)
        checkboxGroup.updateValue(value)
      }
    }
    const remove = () => {
      if (index !== -1) {
        value.splice(index, 1)
        checkboxGroup.updateValue(value)
      }
    }
    if (isBoolean(check)) {
      if (check) add()
      else remove()
    } else if (index >= 0) {
      remove()
    } else {
      add()
    }
  } else {
    updateValue(!modelValue.value)
  }
}

function onClick(event: TouchEvent) {
  if (this.checkboxGroup?.labelDisabled || this.labelDisabled) return
  toggle()
  emits("click", event)
}
function onClickIcon(event: TouchEvent) {
  toggle()
  emits("click", event)
}
function onClickLabel(event: TouchEvent) {
  if (checkboxGroup?.labelDisabled.value || props.labelDisabled) return
  toggle()
  emits("click", event)
}

onMounted(() => resize())
defineExpose({ name: "zm-checkbox", toggle })
</script>
<script lang="ts">
export default {
  name: "zm-checkbox",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-checkbox {
  display: flex;
  user-select: none;

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
    position: relative;
    transition: all 0.3s;
    flex: 0;

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
