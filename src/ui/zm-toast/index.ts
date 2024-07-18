import Toast from "./zm-toast.vue"

export const toastProps = {
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const toastEmits = {}

export type ToastOptions = {
  /**
   * 显示类型，有效值loading、await、success、fail、default
   */
  type?: "loading" | "await" | "success" | "fail" | "default"
  /**
   * 图标
   */
  icon?: string
  /**
   * 是否显示透明蒙层，防止触摸穿透
   */
  mask?: boolean
  /**
   * 显示内容
   */
  content?: string
  /**
   * 显示宽度
   */
  width?: string | number
  /**
   * 位置偏移
   */
  offset?: string | number
  /**
   * 图标大小
   */
  iconSize?: string | number
  /**
   * 图标前缀
   */
  iconPrefix?: string
  /**
   * 显示持续时间
   */
  duration?: number
  /**
   * 显示位置，有效值top、bottom、middle
   */
  position?: "top" | "bottom" | "middle"
  /**
   * 背景色
   */
  background?: string
}
export type ToastEmits = typeof toastEmits
export type ToastExpose = {
  name: "zm-toast"
  show: () => void
  hide: () => void
}
export type ToastInstance = InstanceType<typeof Toast>
