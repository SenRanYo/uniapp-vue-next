import Dialog from "./zm-dialog.vue"
import { isBoolean } from "../utils/check"

export const dialogProps = {
  /**
   * 是否显示
   */
  show: { type: Boolean, default: false },
  /**
   * 标题
   */
  title: { type: String, default: "" },
  /**
   * 宽度
   */
  width: { type: [Number, String], default: "" },
  /**
   * 高度
   */
  height: { type: [Number, String], default: "" },
  /**
   * 内容
   */
  content: { type: String, default: "" },
  /**
   * 内容对齐方式
   */
  contentAlign: { type: String, default: "center", values: ["left", "center", "right"] },
  /**
   * 是否显示确认按钮
   */
  showConfirmButton: { type: Boolean, default: true },
  /**
   * 是否显示取消按钮
   */
  showCancelButton: { type: Boolean, default: false },
  /**
   * 确认按钮文字
   */
  confirmButtonText: { type: String, default: "确认" },
  /**
   * 确认按钮文字颜色
   */
  confirmButtonColor: { type: String, default: "var(--primary-color)" },
  /**
   * 取消按钮文字
   */
  cancelButtonText: { type: String, default: "取消" },
  /**
   * 取消按钮文字颜色
   */
  cancelButtonColor: { type: String, default: "" },
  /**
   * 是否对调确认和取消按钮位置
   */
  buttonReverse: { type: Boolean, default: false },
  /**
   * 否显示遮罩层
   */
  overlay: { type: Boolean, default: true },
  /**
   * 自定义遮罩层样式
   */
  overlayStyle: { type: [Object, String], default: () => ({}) },
  /**
   * 是否点击遮罩层后关闭
   */
  closeOnClickOverlay: { type: Boolean, default: false },
  /**
   * 内边距
   */
  padding: { type: [Number, String], default: "" },
  /**
   * 弹窗顶部偏移
   */
  offsetTop: { type: [Number, String], default: "" },
  /**
   * 是否异步关闭
   */
  asyncClose: { type: Boolean, default: false },
  /**
   * 元素层级
   */
  zIndex: { type: [Number, String], default: "" },
  /**
   * 弹窗打开过渡时间,单位毫秒
   */
  duration: { type: [Number, String], default: 300 },
  /**
   * 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * 弹窗圆角
   */
  borderRadius: { type: [Number, String], default: "16rpx" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
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
   * 是否显示
   */
  show?: boolean
  /**
   * 标题
   */
  title?: string
  /**
   * 宽度
   */
  width?: string | number
  /**
   * 高度
   */
  height?: string | number
  /**
   * 内容
   */
  content?: string
  /**
   * 内容对齐方式
   */
  contentAlign?: "left" | "center" | "right"
  /**
   * 是否显示确认按钮
   */
  showConfirmButton?: boolean
  /**
   * 是否显示取消按钮
   */
  showCancelButton?: boolean
  /**
   * 确认按钮文字
   */
  confirmButtonText?: string
  /**
   * 确认按钮文字颜色
   */
  confirmButtonColor?: string
  /**
   * 取消按钮文字
   */
  cancelButtonText?: string
  /**
   * 取消按钮文字颜色
   */
  cancelButtonColor?: string
  /**
   * 是否对调确认和取消按钮位置
   */
  buttonReverse?: boolean
  /**
   * 否显示遮罩层
   */
  overlay?: boolean
  /**
   * 自定义遮罩层样式
   */
  overlayStyle?: object
  /**
   * 是否点击遮罩层后关闭
   */
  closeOnClickOverlay?: boolean
  /**
   * 内边距
   */
  padding?: string | number
  /**
   * 弹窗顶部偏移
   */
  offsetTop?: string | number
  /**
   * 是否异步关闭
   */
  asyncClose?: boolean
  /**
   * 元素层级
   */
  zIndex?: string | number
  /**
   * 弹窗打开过渡时间,单位毫秒
   */
  duration?: string | number
  /**
   * 背景颜色
   */
  background?: string
  /**
   * 弹窗圆角
   */
  borderRadius?: string | number
  /**
   * 自定义样式
   */
  customStyle?: object
  /**
   * 确认回调
   */
  onConfirm?: (next?: { close: (action?: CloseAction) => void; done: (action?: DoneAction) => void }) => void
  /**
   * 取消回调
   */
  onCancel?: (next?: { close: (action?: CloseAction) => void; done: (action?: DoneAction) => void }) => void
  /**
   * 遮罩层回调
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
