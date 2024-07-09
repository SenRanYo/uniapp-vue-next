<template>
  <view class="zm-dropdown-item" :class="[classs, customClass]" :style="[style]">
    <block v-if="['single', 'multiple'].includes(mode)">
      <zm-overlay v-if="overlay" :show="active" :duration="duration" :custom-style="overlayStyle" @click="onClickOverlay"></zm-overlay>
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
          <scroll-view scroll-y enable-flex>
            <slot>
              <view class="zm-dropdown-item__options">
                <view class="zm-dropdown-item__option" v-for="(option, index) in options" :key="index" @click="onClickOption(option)">
                  <text class="zm-dropdown-item__label">{{ option[labelField] }}</text>
                  <view class="zm-dropdown-item__icon">
                    <zm-icon v-if="current === option[valueField]" :name="option[iconField] || 'success'" size="24rpx"></zm-icon>
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
import { useStyle, useColor, useUnit, useUnitToPx, useElRect, useParent } from "../hooks"
import { dropdownItemEmits, dropdownItemProps, DropdownItemValue, DropdownItemOption } from "./index"

defineOptions({ name: "zm-dropdown-item" })

const props = defineProps(dropdownItemProps)
const emits = defineEmits(dropdownItemEmits)
const { parent } = useParent(dropdownMenuKey)

const title = ref(props.title)
const closed = ref(true)
const active = ref(false)
const current = ref<DropdownItemValue>("")
const screenHeight = ref(0)
const transition = ref(null)
const instance = getCurrentInstance()

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
  list.push(`zm-dropdown-item--${props.direction}`)
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
  style.borderRadius = useUnit(prop("borderRadius"))
  if (prop("direction") === "up") {
    style.top = 0
    style.bottom = screenHeight.value - parent?.rect.value.top + "px"
  }
  if (prop("direction") === "down") {
    style.top = parent?.rect.value.bottom + "px"
    style.bottom = 0
  }
  return useStyle(style)
})

watch(
  () => props.modelValue,
  (value) => {
    current.value = value
  },
  { immediate: true },
)

function prop(name: string) {
  return props[name] || parent?.props[name] || ""
}

function toggle(state = !active.value) {
  active.value = state
}

async function updateValue(value: DropdownItemValue) {
  current.value = value
  emits("change", value)
  await nextTick()
  emits("update:modelValue", value)
}

function onClickOption(option: DropdownItemOption) {
  updateValue(option[props.valueField])
}

function onClickOverlay() {
  if (parent.props.closeOnClickOverlay) {
    parent.close()
  }
}

function onClickTransition() {}

function onOpen() {
  emits("open")
}

function onOpened() {
  console.log(closed.value, 333)
  closed.value = false
  emits("opened")
}

function onClose() {
  emits("close")
}

function onClosed() {
  console.log(closed.value)
  // closed.value = true
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
    padding: 24rpx;
    flex-direction: column;
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
