import Keyboard from "./zm-keyboard.vue"
import type { ExtractPropTypes } from "vue"

export const keyboardProps = {
  /**
   * @description 是否显示
   */
  show: { type: Boolean, default: false },
  /**
   * @description 标题
   */
  title: { type: [String, Number], default: "" },
  /**
   * @description 键盘类型，可选值car、card、number
   */
  mode: { type: String, default: "number", validator: (v: string) => ["car", "card", "number"].includes(v) },
  /**
   * @description 最大输入长度
   */
  maxlength: { type: [String, Number], default: Infinity },
  /**
   * @description 元素层级
   */
  zIndex: { type: [String, Number], default: "" },
  /**
   * @description 是否打乱键盘按键的顺序
   */
  random: { type: Boolean, default: false },
  /**
   * @description 是否显示遮罩
   */
  overlay: { type: Boolean, default: true },
  /**
   * @description 是否显示小数点按钮
   */
  showDot: { type: Boolean, default: false },
  /**
   * @description 是否显示顶部栏
   */
  showHeader: { type: Boolean, default: true },
  /**
   * @description 是否显示取消按钮
   */
  showCancel: { type: Boolean, default: true },
  /**
   * @description 关闭按钮文字
   */
  cancelText: { type: String, default: "取消" },
  /**
   * @description 关闭按钮文字大小
   */
  cancelTextSize: { type: [String, Number], default: "" },
  /**
   * @description 关闭按钮文字颜色
   */
  cancelTextColor: { type: String, default: "error" },
  /**
   * @description 关闭按钮文字粗细
   */
  cancelTextWeight: { type: [String, Number], default: "" },
  /**
   * @description 是否显示确认按钮
   */
  showConfirm: { type: Boolean, default: true },
  /**
   * @description 确认按钮文字
   */
  confirmText: { type: String, default: "确定" },
  /**
   * @description 确认按钮文字大小
   */
  confirmTextSize: { type: [String, Number], default: "" },
  /**
   * @description 确认按钮文字颜色
   */
  confirmTextColor: { type: String, default: "" },
  /**
   * @description 确认按钮文字粗细
   */
  confirmTextWeight: { type: [String, Number], default: "" },
  /**
   * @description 背景颜色
   */
  background: { type: String, default: "#f2f3f5" },
  /**
   * @description 是否开启底部安全区适配
   */
  safeAreaInsetBottom: { type: Boolean, default: true },
  /**
   * @description 是否允许点击遮罩收起键盘
   */
  closeOnClickOverlay: { type: Boolean, default: true },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const keyboardEmits = {
  open: () => true,
  close: () => true,
  cancel: () => true,
  confirm: () => true,
  input: (value: string) => true,
  delete: () => true,
  change: (value: string) => true,
  "update:show": (show: boolean) => true,
}

export type KeyboardEmits = typeof keyboardEmits
export type KeyboardProps = ExtractPropTypes<typeof keyboardProps>
export type KeyboardInstance = InstanceType<typeof Keyboard>
