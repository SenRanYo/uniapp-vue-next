import Dialog from "./zm-dialog.vue"
import { isBoolean } from "../utils/check"

export const dialogProps = {
  /**
   * @description 是否显示
   */
  show: { type: Boolean, default: false },
  /**
   * @description 标题
   */
  title: { type: String, default: "" },
  /**
   * @description 宽度
   */
  width: { type: [Number, String], default: "" },
  /**
   * @description 高度
   */
  height: { type: [Number, String], default: "" },
  /**
   * @description 内容
   */
  content: { type: String, default: "" },
  /**
   * @description 内容对齐方式
   */
  contentAlign: { type: String, default: "center", values: ["left", "center", "right"] },
  /**
   * @description 是否显示确认按钮
   */
  showConfirmButton: { type: Boolean, default: true },
  /**
   * @description 是否显示取消按钮
   */
  showCancelButton: { type: Boolean, default: false },
  /**
   * @description 确认按钮文字
   */
  confirmButtonText: { type: String, default: "确认" },
  /**
   * @description 确认按钮文字颜色
   */
  confirmButtonColor: { type: String, default: "var(--theme-color)" },
  /**
   * @description 取消按钮文字
   */
  cancelButtonText: { type: String, default: "取消" },
  /**
   * @description 取消按钮文字颜色
   */
  cancelButtonColor: { type: String, default: "" },
  /**
   * @description 是否对调确认和取消按钮位置
   */
  buttonReverse: { type: Boolean, default: false },
  /**
   * @description 否显示遮罩层
   */
  overlay: { type: Boolean, default: true },
  /**
   * @description 自定义遮罩层样式
   */
  overlayStyle: { type: [Object, String], default: () => ({}) },
  /**
   * @description 是否点击遮罩层后关闭
   */
  closeOnClickOverlay: { type: Boolean, default: false },
  /**
   * @description 内边距
   */
  padding: { type: [Number, String], default: "" },
  /**
   * @description 弹窗顶部偏移
   */
  offsetTop: { type: [Number, String], default: "" },
  /**
   * @description 是否异步关闭
   */
  asyncClose: { type: Boolean, default: false },
  /**
   * @description 元素层级
   */
  zIndex: { type: [Number, String], default: "" },
  /**
   * @description 弹窗打开过渡时间,单位毫秒
   */
  duration: { type: [Number, String], default: 300 },
  /**
   * @description 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * @description 弹窗圆角
   */
  borderRadius: { type: [Number, String], default: "16rpx" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const dialogEmits = {
  "update:show": (show: boolean) => isBoolean(show),
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  cancel: (next?: { close: (action: CloseAction) => void; done: (action: DoneAction) => void }) => true,
  confirm: (next?: { close: (action: CloseAction) => void; done: (action: DoneAction) => void }) => true,
  "click-overlay": (next?: { close: (action: CloseAction) => void }) => true,
}

export type OpenAction = "inner" | "outside"
export type DoneAction = "confirm" | "cancel" | "overlay"
export type CloseAction = "confirm" | "cancel" | "overlay" | "close"

export type DialogOptions = {
  /**
   * @description 是否显示
   */
  show?: boolean
  /**
   * @description 标题
   */
  title?: string
  /**
   * @description 宽度
   */
  width?: string | number
  /**
   * @description 高度
   */
  height?: string | number
  /**
   * @description 内容
   */
  content?: string
  /**
   * @description 内容对齐方式
   */
  contentAlign?: "left" | "center" | "right"
  /**
   * @description 是否显示确认按钮
   */
  showConfirmButton?: boolean
  /**
   * @description 是否显示取消按钮
   */
  showCancelButton?: boolean
  /**
   * @description 确认按钮文字
   */
  confirmButtonText?: string
  /**
   * @description 确认按钮文字颜色
   */
  confirmButtonColor?: string
  /**
   * @description 取消按钮文字
   */
  cancelButtonText?: string
  /**
   * @description 取消按钮文字颜色
   */
  cancelButtonColor?: string
  /**
   * @description 是否对调确认和取消按钮位置
   */
  buttonReverse?: boolean
  /**
   * @description 否显示遮罩层
   */
  overlay?: boolean
  /**
   * @description 自定义遮罩层样式
   */
  overlayStyle?: object
  /**
   * @description 是否点击遮罩层后关闭
   */
  closeOnClickOverlay?: boolean
  /**
   * @description 内边距
   */
  padding?: string | number
  /**
   * @description 弹窗顶部偏移
   */
  offsetTop?: string | number
  /**
   * @description 是否异步关闭
   */
  asyncClose?: boolean
  /**
   * @description 元素层级
   */
  zIndex?: string | number
  /**
   * @description 弹窗打开过渡时间,单位毫秒
   */
  duration?: string | number
  /**
   * @description 背景颜色
   */
  background?: string
  /**
   * @description 弹窗圆角
   */
  borderRadius?: string | number
  /**
   * @description 自定义样式
   */
  customStyle?: object
  /**
   * @description 确认回调
   */
  onConfirm?: (next?: { close: (action?: CloseAction) => void; done: (action?: DoneAction) => void }) => void
  /**
   * @description 取消回调
   */
  onCancel?: (next?: { close: (action?: CloseAction) => void; done: (action?: DoneAction) => void }) => void
  /**
   * @description 遮罩层回调
   */
  onOverlay?: (next?: { close: (action?: CloseAction) => void; done: (action?: DoneAction) => void }) => void
}
export type DialogEmits = typeof dialogEmits
export type DialogExpose = {
  name: "zm-dialog"
  open: (options: DialogOptions) => void
  close: (action: CloseAction) => void
}
export type DialogInstance = InstanceType<typeof Dialog>
