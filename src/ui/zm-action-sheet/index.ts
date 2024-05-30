import ActionSheet from "./zm-action-sheet.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { isBoolean, isNumber, isObject, isString } from "../utils/check"

export const actionSheetProps = {
  /**
   * @description 是否显示
   */
  show: { type: Boolean, default: false },
  /**
   * @description 操作项列表
   */
  actions: { type: Array as PropType<ActionItem[]>, default: () => [] },
  /**
   * @description 操作面板的高度
   */
  height: { type: [Number, String], default: "" },
  /**
   * @description 标题文本
   */
  title: { type: String, default: "" },
  /**
   * @description 标题文本大小
   */
  titleSize: { type: [Number, String], default: "" },
  /**
   * @description 标题文本颜色
   */
  titleColor: { type: String, default: "" },
  /**
   * @description 标题文本粗细
   */
  titleWeight: { type: [Number, String], default: "" },
  /**
   * @description 描述文本
   */
  description: { type: String, default: "" },
  /**
   * @description 描述文本大小
   */
  descriptionSize: { type: [Number, String], default: "" },
  /**
   * @description 描述文本颜色
   */
  descriptionColor: { type: String, default: "" },
  /**
   * @description 描述文本粗细
   */
  descriptionWeight: { type: [Number, String], default: "" },
  /**
   * @description 取消按钮文本
   */
  cancelText: { type: String, default: "取消" },
  /**
   * @description 取消按钮文本大小
   */
  cancelTextSize: { type: [Number, String], default: "" },
  /**
   * @description 取消按钮文本颜色
   */
  cancelTextColor: { type: String, default: "" },
  /**
   * @description 取消按钮文本粗细
   */
  cancelTextWeight: { type: [Number, String], default: "" },
  /**
   * @description 操作项标题的样式
   */
  actionTitleStyle: { type: [Object, String], default: "" },
  /**
   * @description 操作项描述的样式
   */
  actionDescriptionStyle: { type: [Object, String], default: "" },
  /**
   * @description 否可关闭操作面板
   */
  closeable: { type: Boolean, default: true },
  /**
   * @description 动画过渡的时间
   */
  duration: { type: [Number, String], default: 300 },
  /**
   * @description 操作面板的圆角大小
   */
  borderRadius: { type: [Number, String], default: "16rpx" },
  /**
   * @description 元素层级
   */
  zIndex: { type: [Number, String], default: "" },
  /**
   * @description 是否显示遮罩层
   */
  overlay: { type: Boolean, default: true },
  /**
   * @description 遮罩层样式
   */
  overlayStyle: { type: [Object, String], default: "" },
  /**
   * @description 点击操作项后是否关闭操作面板
   */
  closeOnClickAction: { type: Boolean, default: true },
  /**
   * @description 点击遮罩层后是否关闭操作面板
   */
  closeOnClickOverlay: { type: Boolean, default: true },
  /**
   * @description 是否显示底部安全区域
   */
  safeAreaInsetBottom: { type: Boolean, default: true },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const actionSheetEmits = {
  "update:show": (show: Boolean) => isBoolean(show),
  close: (action: string) => isString(action),
  closed: (action: string) => isString(action),
  open: () => true,
  opened: () => true,
  select: (item: Object, index: number) => isObject(item) || isNumber(index),
  cancel: () => true,
}
export type Action = "show" | "close" | "action"
export type ActionItem = {
  title: string
  loading: boolean
  disabled: boolean
  description: string
  titleStyle: string | object
  descriptionStyle: string | object
}
export type ActionSheetEmits = typeof actionSheetEmits
export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>
export type ActionSheetExpose = { name: "zm-action-sheet" }
export type ActionSheetInstance = InstanceType<typeof ActionSheet>
