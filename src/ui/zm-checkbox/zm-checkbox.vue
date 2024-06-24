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
import { checkboxGroupKey } from "../zm-checkbox-group"
import { useStyle, useUnit, useColor, useParent } from "../hooks"
import { checkboxEmits, checkboxProps, CheckboxValueType } from "./index"

defineOptions({ name: "zm-checkbox" })

const slots = useSlots()
const emits = defineEmits(checkboxEmits)
const props = defineProps(checkboxProps)
const checkboxGroup = inject("zm-checkbox-group", null)
const { index, parent } = useParent(checkboxGroupKey)

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => updateValue(value),
})

const classs = computed(() => {
  const list = []
  if (isChecked.value) list.push("zm-checkbox--checked")
  if (prop("disabled")) list.push("zm-checkbox--disabled")
  if (prop("labelLeft")) list.push("zm-checkbox--left")
  return list
})

const style = computed(() => {
  const style: any = {}
  style.fontSize = useUnit(prop("iconSize"))
  if (prop("iconColor")) style["--zm-checkbox-icon-color"] = useColor(prop("iconColor"))
  if (prop("checkedIconColor")) style["--zm-checkbox-checked-icon-color"] = prop("checkedIconColor")
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const iconStyle = computed(() => {
  const style: any = {}
  if (modelValue.value) style.background = useColor(prop("checkedColor"))
  return useStyle(style)
})

const iconClass = computed(() => {
  const list = []
  if (prop("round")) list.push("zm-icon--round")
  if (prop("icon")) list.push(`${prop("iconPrefix")}-${prop("icon")}`)
  return list
})

const iconDefaultStyle = computed(() => {
  const style: any = {}
  style.color = useColor(prop("iconColor"))
  style.fontSize = useUnit(prop("iconSize"))
  style.fontWeight = prop("iconWeight")
  if (!prop("round")) style.borderRadius = prop("iconRadius")
  if (modelValue.value) style.borderColor = useColor(prop("checkedColor"))
  if (isChecked.value) {
    style.borderColor = useColor(prop("checkedIconColor"))
    style.backgroundColor = useColor(prop("checkedIconColor"))
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
  if (modelValue.value && prop("checkedLabelColor")) style.color = useColor(prop("checkedLabelColor"))
  if (props.labelGap) {
    props.labelLeft ? (style.marginRight = useUnit(prop("labelGap"))) : (style.marginLeft = useUnit(prop("labelGap")))
  }
  return useStyle(style)
})

const isChecked = computed(() => {
  if (props.bindGroup && parent) {
    return parent.props.modelValue.includes(props.name || index.value)
  } else {
    return modelValue.value
  }
})

function prop(name: string) {
  if (parent) return parent.props[name] || props[name]
  return props[name]
}

async function updateValue(value: CheckboxValueType) {
  emits("update:modelValue", toRaw(value))
  await nextTick()
  emits("change", toRaw(value))
}

function toggle(check?: boolean) {
  if (prop("disabled")) return
  if (parent && props.bindGroup) {
    const value = parent.props.modelValue
    const add = () => {
      const isMax = parent.props.max && value.length >= parent.props.max
      if (!isMax && !value.includes(props.name)) {
        value.push(props.name)
        parent.updateValue(value)
      }
    }
    const remove = () => {
      if (index.value !== -1) {
        value.splice(index.value, 1)
        parent.updateValue(value)
      }
    }
    if (isBoolean(check)) {
      if (check) add()
      else remove()
    } else if (index.value >= 0) {
      remove()
    } else {
      add()
    }
  } else {
    updateValue(!modelValue.value)
  }
}

function onClick(event: TouchEvent) {
  if (prop("labelDisabled")) return
  toggle()
  emits("click", event)
}

function onClickIcon(event: TouchEvent) {
  toggle()
  emits("click", event)
}

function onClickLabel(event: TouchEvent) {
  if (prop("labelDisabled")) return
  toggle()
  emits("click", event)
}

defineExpose({ name: "zm-checkbox", toggle, index: index.value })
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
