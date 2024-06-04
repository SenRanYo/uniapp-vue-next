<template>
  <view class="zm-radio" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <view class="zm-radio__icon" @click.stop="onClickIcon">
      <slot name="icon">
        <zm-icon :name="prop('icon')" :custom-style="iconStyle"></zm-icon>
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

const slots = useSlots()
const emits = defineEmits(radioEmits)
const props = defineProps(radioProps)
const { parent } = useParent(radioGroupKey)

const style = computed(() => useStyle(props.customStyle))

const classs = computed(() => {
  const list = []
  list.push(`zm-radio--${prop("shape")}`)
  if (prop("labelLeft")) list.push("zm-radio--left")
  if (prop("disabled")) list.push("zm-radio--disabled")
  if (isChecked.value) list.push("zm-radio--checked")
  return list
})

const iconStyle = computed(() => {
  const style: any = {}
  style.fontSize = useUnit(prop("iconSize"))
  style.fontWeight = useUnit(prop("iconWeight"))
  style.borderColor = useUnit(prop("iconColor"))
  style.borderRadius = useUnit(prop("iconRadius"))
  if (isChecked.value) {
    style.color = "#ffffff"
    style.background = useColor(prop("checkedIconColor"))
    style.borderColor = useColor(prop("checkedIconColor"))
  }
  return useStyle(style)
})

const isShowLabel = computed(() => {
  return slots.default || props.label
})

const labelStyle = computed(() => {
  const style: any = {}
  style.color = useColor(prop("labelColor"))
  style.fontSize = useUnit(prop("labelSize"))
  style.fontWeight = prop("labelWeight")
  if (isChecked.value && prop("checkedLabelColor")) style.color = useColor(prop("checkedLabelColor"))
  if (props.labelGap) {
    props.labelLeft ? (style.marginRight = useUnit(prop("labelGap"))) : (style.marginLeft = useUnit(prop("labelGap")))
  }
  return useStyle(style)
})

const isChecked = computed(() => {
  return prop("modelValue") == props.name
})

function prop(name: string) {
  if (parent) return parent.props[name] || props[name]
  return props[name]
}

function toggle() {
  parent.updateValue(props.name)
}

function onClick(event: TouchEvent) {
  if (prop("disabled") || isChecked.value) return
  toggle()
  emits("click", event)
}

function onClickIcon(event: TouchEvent) {
  if (prop("disabled") || isChecked.value) return
  toggle()
  emits("click", event)
}

function onClickLabel(event: TouchEvent) {
  if (prop("disabled") || prop("labelDisabled") || isChecked.value) return
  toggle()
  emits("click", event)
}

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
  cursor: pointer;
  user-select: none;
  align-items: center;

  &__icon {
    display: flex;
    position: relative;

    .zm-icon {
      width: 1.25em;
      height: 1.25em;
      display: flex;
      font-size: 0.8em;
      color: transparent;
      text-align: center;
      border-width: 2rpx;
      border-radius: 4rpx;
      border-style: solid;
      transition-duration: 300ms;
      transition-property: color, border-color, background-color;
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

  &--round {
    .zm-icon {
      border-radius: 50%;
    }
  }

  &--checked {
    .zm-icon {
      color: #fff;
      border-color: var(--zm-radio-checked-icon-color);
      background-color: var(--zm-radio-checked-icon-color);
    }
  }

  &--disabled {
    cursor: not-allowed;

    .zm-icon {
      border-color: #c8c9cc;
      background-color: #ebedf0;
    }
  }
}
</style>
