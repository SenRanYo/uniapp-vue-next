import Notify from "./zm-notify.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const notifyProps = {
  /**
   * @description 是否显示
   */
  show: { type: Boolean, default: false },
  /**
   * @description 自定义类名
   */
  type: { type: String as PropType<NotifyType>, default: "primary", validator: (t: string) => ["primary", "success", "warning", "error"].includes(t) },
  /**
   * @description 展示内容
   */
  content: { type: String, default: "" },
  /**
   * @description 展示时长，单位ms
   */
  duration: { type: [String, Number], default: "3000" },
  /**
   * @description 字体颜色
   */
  color: { type: String, default: "" },
  /**
   * @description 字体大小
   */
  fontSize: { type: [String, Number], default: "" },
  /**
   * @description 字体粗细
   */
  fontWeight: { type: String, default: "" },
  /**
   * @description 背景色
   */
  background: { type: String, default: "" },
  /**
   * @description 元素层级
   */
  zIndex: { type: [String, Number], default: "2000" },
  /**
   * @description 距离顶部偏移
   */
  offsetTop: { type: [String, Number], default: "" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const notifyEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  click: (event: TouchEvent) => true,
  "update:show": (value: boolean) => true,
}

export type NotifyOptions = {
  show?: boolean
  type?: NotifyType
  content?: string
  duration?: string | number
  color?: string
  fontSize?: string | number
  fontWeight?: string
  background?: string
  zIndex?: string | number
  offsetTop?: string | number
  customClass?: string
  customStyle?: string | Record<string, any>
}
export type NotifyType = "primary" | "success" | "warning" | "error"
export type UploadEmits = typeof notifyEmits
export type NotifyProps = ExtractPropTypes<typeof notifyProps>
export type NotifyInstance = InstanceType<typeof Notify>
