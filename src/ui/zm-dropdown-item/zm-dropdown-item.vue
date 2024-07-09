<template>
  <view class="zm-dropdown-item" :class="[classs, customClass]" :style="[style]">
    <block v-if="['single', 'multiple'].includes(mode)">
      <zm-overlay v-if="prop('overlay')" :show="active" :duration="prop('duration')" :custom-style="overlayStyle" @click="onClickOverlay"></zm-overlay>
      <zm-transition
        :show="active"
        :name="transitionName"
        :duration="prop('duration')"
        :custom-style="transitionStyle"
        @before-enter="onOpen"
        @after-enter="onOpened"
        @before-leave="onClose"
        @after-leave="onClosed"
        @touchmove.prevent.stop="noop"
      >
        <view class="zm-dropdown-item__content" :style="[contentStyle]">
          <slot name="header"></slot>
          <scroll-view scroll-y enable-flex :style="[scrollViewStyle]">
            <slot>
              <view class="zm-dropdown-item__options">
                <view class="zm-dropdown-item__option" :class="{ 'is-select': isSelected(option) }" v-for="(option, index) in options" :key="index" @click="onClickOption(option)">
                  <text class="zm-dropdown-item__label" :style="[labelStyle(option)]">{{ option[labelField] }}</text>
                  <view class="zm-dropdown-item__icon" v-if="isSelected(option)">
                    <zm-icon name="success" :size="useUnit(props.iconSize)" :weight="iconWeight" :color="iconColor(option)"></zm-icon>
                  </view>
                </view>
              </view>
            </slot>
          </scroll-view>
        </view>
      </zm-transition>
    </block>
  </view>
</template>
<script setup lang="ts">
import { noop } from "../utils/utils"
import { dropdownMenuKey } from "../zm-dropdown-menu"
import { isArray, isDef, isString } from "../utils/check"
import { useStyle, useColor, useUnit, useParent } from "../hooks"
import { dropdownItemEmits, dropdownItemProps, DropdownItemValue, DropdownItemOption } from "./index"

defineOptions({ name: "zm-dropdown-item" })

const props = defineProps(dropdownItemProps)
const emits = defineEmits(dropdownItemEmits)

const { parent } = useParent(dropdownMenuKey)

const closed = ref(true)
const active = ref(false)
const current = ref<any>("")
const screenHeight = ref(0)

const style = computed(() => {
  const style: any = {}
  style.zIndex = active.value ? 2 : 1
  if (prop("direction") === "up") {
    style.top = 0
    style.bottom = screenHeight.value - parent?.rect.value.top + "px"
  }
  if (prop("direction") === "down") {
    style.top = parent?.rect.value.bottom + "px"
    style.bottom = 0
  }
  if (!active.value && closed.value) style.display = "none"
  if (props.mode === "switch") style.display = "none"
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  list.push(`zm-dropdown-item--${prop("direction")}`)
  return list
})

const overlayStyle = computed(() => {
  const style: any = {}
  style.position = "absolute"
  return useStyle(style)
})

const transitionName = computed(() => {
  const names = { up: "slide-up", down: "slide-down" }
  const direction = prop("direction")
  return names[direction || "down"]
})

const transitionStyle = computed(() => {
  const style: any = {}
  const direction = prop("direction")
  style.left = 0
  style.width = "100%"
  style.position = "absolute"
  if (direction === "up") style.bottom = 0
  if (direction === "down") style.top = 0
  return useStyle(style)
})

const contentStyle = computed(() => {
  const style: any = {}
  style.background = useColor(props.background)
  if (prop("direction") === "up") {
    style.borderTopLeftRadius = useUnit(props.borderRadius)
    style.borderTopRightRadius = useUnit(props.borderRadius)
  }
  if (prop("direction") === "down") {
    style.borderBottomLeftRadius = useUnit(props.borderRadius)
    style.borderBottomRightRadius = useUnit(props.borderRadius)
  }
  return useStyle(style)
})

const scrollViewStyle = computed(() => {
  const style: any = {}
  style.minHeight = useUnit(props.minHeight)
  style.maxHeight = useUnit(props.maxHeight)
  return useStyle(style)
})

const labelStyle = computed(() => {
  return (option: DropdownItemOption) => {
    const style: any = {}
    style.color = checkIsSelected(option) ? useColor(props.activeOptionColor) : useColor(props.optionColor)
    style.fontSize = useUnit(props.optionSize)
    style.fontWeight = useUnit(props.optionWeight)
    return useStyle(style)
  }
})

const iconColor = computed(() => {
  return (option: DropdownItemOption) => (checkIsSelected(option) ? useColor(props.activeOptionColor) : useColor(props.optionColor))
})

const isSelected = computed(() => {
  return (option: DropdownItemOption) => checkIsSelected(option)
})

const title = computed(() => {
  if (props.mode === "multiple") return props.title
  const find = props.options.find((option) => option[props.valueField] === props.modelValue)
  return find ? find[props.labelField] : props.title
})

watch(
  () => props.modelValue,
  (value) => {
    current.value = value
  },
  { immediate: true },
)

function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (isDef(parent.props[name])) return parent.props[name]
  return ""
}

function toggle(state = !active.value) {
  active.value = state
}

function checkIsSelected(option: DropdownItemOption) {
  if (props.mode === "multiple") {
    if (isArray(props.modelValue)) {
      return props.modelValue.includes(option[props.valueField])
    }
    if (isString(props.modelValue)) {
      return props.modelValue.split(",").includes(option[props.valueField])
    }
  }
  if (props.mode === "single") {
    return props.modelValue === option[props.valueField]
  }
  return false
}

async function updateValue(value: DropdownItemValue) {
  current.value = value
  emits("change", toRaw(value))
  await nextTick()
  emits("update:modelValue", toRaw(value))
}

function onClickOption(option: DropdownItemOption) {
  if (props.mode === "multiple") {
    if (isArray(props.modelValue)) {
      const index = current.value.findIndex((val: any) => val === option[props.valueField])
      index >= 0 ? current.value.splice(index, 1) : current.value.push(option[props.valueField])
      updateValue(current.value)
    }
    if (isString(props.modelValue)) {
      const list = props.modelValue ? props.modelValue.split(",") : []
      const index = list.findIndex((val: any) => val === option[props.valueField])
      index >= 0 ? list.splice(index, 1) : list.push(option[props.valueField])
      console.log(index, list)
      updateValue(list.join(","))
    }
  }
  if (props.mode === "single") {
    if (props.modelValue === option[props.valueField]) return
    updateValue(option[props.valueField])
  }
  // updateValue(option[props.valueField])
}

function onClickOverlay() {
  if (parent.props.closeOnClickOverlay) {
    parent.close()
  }
}

function onOpen() {
  emits("open")
}

function onOpened() {
  closed.value = false
  emits("opened")
}

function onClose() {
  emits("close")
}

function onClosed() {
  closed.value = true
  emits("closed")
}

function resize() {
  screenHeight.value = uni.getSystemInfoSync().screenHeight
}

onMounted(() => resize())
defineExpose({ name: "zm-dropdown-item", title, active, toggle })
</script>
<script lang="ts">
export default {
  name: "zm-dropdown-item",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-dropdown-item {
  left: 0;
  right: 0;
  z-index: 1;
  position: fixed;
  overflow: hidden;
  border-top: 2rpx solid #eee;

  &__content {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: #fff;
  }

  &__options {
    display: flex;
    flex-direction: column;
  }

  &__option {
    display: flex;
    margin: 0 24rpx;
    padding: 24rpx 0;
    position: relative;
    align-items: center;
    justify-content: space-between;

    &:not(:last-child)::after {
      content: " ";
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      box-sizing: border-box;
      pointer-events: none;
      border-bottom: 1rpx solid #ebedf0;
    }

    &.is-select {
      color: var(--primary-color);
    }
  }

  &__label {
    flex: 1;
    overflow: hidden;
    margin-right: 24rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &--up {
    .zm-dropdown-item__content {
      border-radius: 24rpx 24rpx 0 0;
    }
  }

  &--down {
    .zm-dropdown-item__content {
      border-radius: 0 0 24rpx 24rpx;
    }
  }
}
</style>
