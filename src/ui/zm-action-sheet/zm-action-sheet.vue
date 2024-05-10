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
      <view slot="header" class="zm-action-sheet__header">
        <slot name="title">
          <view class="zm-action-sheet__title" :style="[titleStyle]">{{ title }}</view>
        </slot>
        <slot name="description">
          <view class="zm-action-sheet__description" :style="[descriptionStyle]">{{ description }}</view>
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
            @click="handleClickAction(item, index)"
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
        <zm-line size="16rpx" color="#f7f8fa"></zm-line>
        <slot name="cancel">
          <view class="zm-action-sheet__cancel" hover-class="zm-action-sheet__cancel--active" :hover-stay-time="50" @click="onClickCancel">{{ cancelText }}</view>
        </slot>
      </view>
    </zm-popup>
  </view>
</template>

<script>
/**
 * @name zm-action-sheet 操作面板
 * @description 自定义操作面板组件，用于展示一组操作项和取消按钮。
 * @prop {Boolean} show - 是否显示操作面板，默认为 false。
 * @prop {Array} actions - 操作项列表，默认为空数组。
 * @prop {Number|String} height - 操作面板的高度，默认为空字符串。
 * @prop {String} title - 标题文本，默认为空字符串。
 * @prop {Number|String} titleSize - 标题文本的字体大小，默认为空字符串。
 * @prop {String} titleColor - 标题文本的字体颜色，默认为空字符串。
 * @prop {Number|String} titleWeight - 标题文本的字体粗细，默认为空字符串。
 * @prop {String} description - 描述文本，默认为空字符串。
 * @prop {Number|String} descriptionSize - 描述文本的字体大小，默认为空字符串。
 * @prop {String} descriptionColor - 描述文本的字体颜色，默认为空字符串。
 * @prop {Number|String} descriptionWeight - 描述文本的字体粗细，默认为空字符串。
 * @prop {String} cancelText - 取消按钮的文本，默认为 "取消"。
 * @prop {Number|String} cancelTextSize - 取消按钮的字体大小，默认为空字符串。
 * @prop {String} cancelTextColor - 取消按钮的字体颜色，默认为空字符串。
 * @prop {Number|String} cancelTextWeight - 取消按钮的字体粗细，默认为空字符串。
 * @prop {Object|String} actionTitleStyle - 操作项标题的样式，默认为空字符串。
 * @prop {Object|String} actionDescriptionStyle - 操作项描述的样式，默认为空字符串。
 * @prop {Boolean} closeable - 是否可关闭操作面板，默认为 true。
 * @prop {Number|String} duration - 动画过渡的时间，默认为 300。
 * @prop {Number|String} borderRadius - 操作面板的圆角大小，默认为 "16rpx"。
 * @prop {Number|String} zIndex - 操作面板的层级，默认为空字符串。
 * @prop {Boolean} overlay - 是否显示遮罩层，默认为 true。
 * @prop {Object|String} overlayStyle - 遮罩层的样式，默认为空字符串。
 * @prop {Boolean} closeOnClickAction - 点击操作项后是否关闭操作面板，默认为 true。
 * @prop {Boolean} closeOnClickOverlay - 点击遮罩层后是否关闭操作面板，默认为 true。
 * @prop {Boolean} safeAreaInsetBottom - 是否在底部安全区域显示，默认为 true。
 * @prop {String} customClass - 自定义类名，默认为空字符串。
 * @event {Function} close - 关闭操作面板的事件。
 * @event {Function} closed - 操作面板关闭后的事件。
 * @event {Function} open - 打开操作面板的事件。
 * @event {Function} opened - 操作面板打开后的事件。
 * @event {Function} select - 选择操作项的事件，参数为选中的操作项和索引。
 * @event {Function} cancel - 取消操作的事件。
 */

import mixins from "../mixins"
import { useStyle, useColor, useUnit } from "../utils/style"
export default {
  name: "zm-action-sheet",
  mixins: [mixins],
  props: {
    show: { type: Boolean, default: false },
    actions: { type: Array, default: () => [] },
    height: { type: [Number, String], default: "" },
    title: { type: String, default: "" },
    titleSize: { type: [Number, String], default: "" },
    titleColor: { type: String, default: "" },
    titleWeight: { type: [Number, String], default: "" },
    description: { type: String, default: "" },
    descriptionSize: { type: [Number, String], default: "" },
    descriptionColor: { type: String, default: "" },
    descriptionWeight: { type: [Number, String], default: "" },
    cancelText: { type: String, default: "取消" },
    cancelTextSize: { type: [Number, String], default: "" },
    cancelTextColor: { type: String, default: "" },
    cancelTextWeight: { type: [Number, String], default: "" },
    actionTitleStyle: { type: [Object, String], default: "" },
    actionDescriptionStyle: { type: [Object, String], default: "" },
    closeable: { type: Boolean, default: true },
    duration: { type: [Number, String], default: 300 },
    borderRadius: { type: [Number, String], default: "16rpx" },
    zIndex: { type: [Number, String], default: "" },
    overlay: { type: Boolean, default: true },
    overlayStyle: { type: [Object, String], default: "" },
    closeOnClickAction: { type: Boolean, default: true },
    closeOnClickOverlay: { type: Boolean, default: true },
    safeAreaInsetBottom: { type: Boolean, default: true },
    customClass: { type: String, default: "" }
  },
  data() {
    return {
      action: "show",
      visible: false
    }
  },
  computed: {
    // 标题样式
    titleStyle() {
      const style = {}
      style.color = useColor(this.titleColor)
      style.fontSize = useUnit(this.titleSize)
      style.fontWeight = this.titleWeight
      return useStyle(style)
    },
    // 描述样式
    descriptionStyle() {
      const style = {}
      style.color = useColor(this.descriptionColor)
      style.fontSize = useUnit(this.descriptionSize)
      style.fontWeight = this.descriptionWeight
      return useStyle(style)
    },
    // 操作项类名
    actionItemClass() {
      return (item) => {
        const list = []
        if (item.loading) list.push("zm-action-sheet__actions__item--loading")
        if (item.disabled) list.push("zm-action-sheet__actions__item--disabled")
        return list
      }
    },
    // 操作项激活类名
    actionItemHoverClass() {
      return ({ loading, disabled }) => {
        if (loading || disabled) return ""
        return "zm-action-sheet__actions__item--active"
      }
    },
    // 操作项标题样式
    actionItemTitleStyle() {
      return (item) => {
        return { ...useStyle(this.actionTitleStyle), ...useStyle(item.titleStyle) }
      }
    },
    // 操作项描述样式
    actionItemDescriptionStyle() {
      return (item) => {
        return { ...useStyle(this.actionDescriptionStyle), ...useStyle(item.descriptionStyle) }
      }
    }
  },
  watch: {
    show: {
      handler(v) {
        if (v) this.open()
        else this.close("show")
      },
      immediate: true
    },
    visible: {
      handler(v) {
        this.$emit("update:show", v)
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    open() {
      if (this.visible) return
      this.timingFunction = "ease-out"
      this.visible = true
    },
    close(action = "show") {
      if (this.visible) this.$refs.popup.close(action)
    },
    onClose(action) {
      this.$emit("close", action)
    },
    onClosed(action) {
      this.$emit("closed", action)
    },
    onOpen() {
      this.$emit("open")
    },
    onOpened() {
      this.$emit("opened")
    },
    handleClickAction(action, index) {
      if (action.loading || action.disabled) return
      this.$emit("select", action, index)
      if (this.closeOnClickAction) this.close("action")
    },
    onClickCancel() {
      this.$emit("cancel")
      this.close("cancel")
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-action-sheet {
  z-index: 13999;
  &__title {
    display: flex;
    margin: 20rpx 60rpx;
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
    display: flex;
    margin: 20rpx 60rpx;
    font-size: 28rpx;
    overflow: hidden;
    font-weight: bold;
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
        background: #000000;
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
      background: #000000;
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
