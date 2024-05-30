<template>
  <view class="zm-action-sheet" :class="[customClass]">
    <zm-popup
      ref="popup"
      mode="bottom"
      background="#ffffff"
      :show.sync="visible"
      :height="height"
      :z-index="zIndex"
      :overlay="overlay"
      :duration="duration"
      :closeable="closeable"
      :border-radius="borderRadius"
      :overlay-style="overlayStyle"
      :close-on-click-overlay="closeOnClickOverlay"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      @open="onOpen"
      @close="onClose"
      @opened="onOpened"
      @closed="onClosed"
    >
      <view slot="header" class="zm-action-sheet__header" v-if="isShowHeader">
        <slot name="title">
          <view class="zm-action-sheet__title" v-if="title" :style="[titleStyle]">{{ title }}</view>
        </slot>
        <slot name="description">
          <view class="zm-action-sheet__description" v-if="description" :style="[descriptionStyle]">{{ description }}</view>
        </slot>
      </view>
      <slot>
        <view class="zm-action-sheet__actions">
          <view
            v-for="(item, index) in actions"
            :key="index"
            class="zm-action-sheet__actions__item"
            :class="[actionItemClass(item)]"
            :hover-class="actionItemHoverClass(item)"
            :hover-stay-time="50"
            @click="onClickAction(item, index)"
          >
            <zm-loading v-if="item.loading" size="32rpx"></zm-loading>
            <template v-else>
              <text class="action-title" :style="[actionItemTitleStyle(item)]">{{ item.title }}</text>
              <text v-if="item.description" class="action-description" :style="[actionItemDescriptionStyle(item)]">{{ item.description }}</text>
            </template>
          </view>
        </view>
      </slot>
      <view slot="footer" class="zm-action-sheet__footer">
        <slot name="cancel">
          <view class="zm-action-sheet__cancel" hover-class="zm-action-sheet__cancel--active" :hover-stay-time="50" @click="onClickCancel">{{ cancelText }}</view>
        </slot>
      </view>
    </zm-popup>
  </view>
</template>

<script setup lang="ts">
import { useStyle, useUnit, useColor } from "../hooks"
import { actionSheetEmits, actionSheetProps, Action, ActionItem } from "./index"

defineOptions({ name: "zm-action-sheet" })
const emits = defineEmits(actionSheetEmits)
const props = defineProps(actionSheetProps)

const slots = useSlots()
const popup = ref(null)
const action = ref("show")
const visible = ref(false)

const titleStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.titleColor)
  style.fontSize = useUnit(props.titleSize)
  style.fontWeight = props.titleWeight
  return useStyle(style)
})

const descriptionStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.descriptionColor)
  style.fontSize = useUnit(props.descriptionSize)
  style.fontWeight = props.descriptionWeight
  return useStyle(style)
})

const actionItemClass = computed(() => {
  return (item: any) => {
    const list = []
    if (item.loading) list.push("zm-action-sheet__actions__item--loading")
    if (item.disabled) list.push("zm-action-sheet__actions__item--disabled")
    return list
  }
})

const actionItemHoverClass = computed(() => {
  return (item: any) => {
    if (item.loading || item.disabled) return ""
    return "zm-action-sheet__actions__item--active"
  }
})

const actionItemTitleStyle = computed(() => {
  return (item: any) => {
    return { ...useStyle(props.actionTitleStyle), ...useStyle(item.titleStyle) }
  }
})

const actionItemDescriptionStyle = computed(() => {
  return (item: any) => {
    return { ...useStyle(props.actionDescriptionStyle), ...useStyle(item.descriptionStyle) }
  }
})

const isShowHeader = computed(() => {
  return props.title || props.description || slots.title || slots.description
})

watch(
  () => props.show,
  (val) => {
    if (val) open()
    else close("show")
  },
  { immediate: true },
)

watch(
  () => visible.value,
  (val) => {
    emits("update:show", val)
  },
  { immediate: true },
)

function open() {
  visible.value = true
}

function close(action: Action = "show") {
  if (visible.value) popup.value?.close(action)
}

function onClose(action: Action) {
  emits("close", action)
}

function onClosed(action: Action) {
  emits("closed", action)
}

function onOpen() {
  emits("open")
}

function onOpened() {
  emits("opened")
}

function onClickAction(item: any, index: number) {
  if (item.loading || item.disabled) return
  emits("select", action, index)
  if (props.closeOnClickAction) close("action")
}

function onClickCancel() {
  emits("cancel")
  this.close("cancel")
}

defineExpose({ name: "zm-action-sheet" })
</script>
<script lang="ts">
export default {
  name: "zm-action-sheet",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-action-sheet {
  z-index: 13999;

  &__header {
    padding: 24rpx;
    border-bottom: 2rpx solid #f7f8fa;
  }

  &__title {
    font-size: 32rpx;
    overflow: hidden;
    font-weight: bold;
    text-align: center;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  &__description {
    color: #969799;
    font-size: 28rpx;
    overflow: hidden;
    margin-top: 24rpx;
    text-align: center;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  &__actions {
    display: flex;
    flex-direction: column;

    &__item {
      display: flex;
      padding: 24rpx;
      position: relative;
      align-items: center;
      flex-direction: column;

      &::before {
        top: 50%;
        left: 50%;
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        background: #000;
        pointer-events: none;
        transform: translate(-50%, -50%);
      }

      &--active::before {
        content: "";
        opacity: 0.05;
      }

      &--disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &--loading {
        cursor: not-allowed;
      }

      .action-title {
        font-size: 32rpx;
      }

      .action-description {
        color: #969799;
        font-size: 24rpx;
        margin-top: 12rpx;
      }
    }
  }

  &__footer {
    border-top: 16rpx solid #f7f8fa;
  }

  &__cancel {
    display: flex;
    padding: 24rpx;
    color: #646566;
    font-size: 32rpx;
    position: relative;
    text-align: center;
    justify-content: center;

    &::before {
      top: 50%;
      left: 50%;
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      background: #000;
      pointer-events: none;
      transform: translate(-50%, -50%);
    }

    &--active::before {
      content: "";
      opacity: 0.05;
    }
  }
}
</style>
