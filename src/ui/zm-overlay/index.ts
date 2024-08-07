import Overlay from "./zm-overlay.vue"
import { isBoolean } from "../utils/check"

export const overlayProps = {
  /**
   * 是否显示
   */
  show: { type: Boolean, default: false },
  /**
   * 元素层级
   */
  zIndex: { type: [Number, String], default: "" },
  /**
   * 透明度
   */
  opacity: { type: [Number, String], default: "0.7" },
  /**
   * 过渡时间
   */
  duration: { type: [Number, String], default: 300 },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const overlayEmits = {
  "update:show": (show: boolean) => isBoolean(show),
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  click: (event: any) => true,
}

export type OverlayEmits = typeof overlayEmits
export type OverlayExpose = {
  name: "zm-overlay"
  open: () => void
  close: () => void
}
export type OverlayInstance = InstanceType<typeof Overlay>
