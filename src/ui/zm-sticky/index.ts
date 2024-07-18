import Sticky from "./zm-sticky.vue"
import { isBoolean } from "../utils/check"

export const stickyProps = {
  /**
   * 元素层级
   */
  zIndex: { type: [String, Number], default: "" },
  /**
   * 吸顶时距离顶部距离
   */
  offsetTop: { type: [String, Number], default: 0 },
  /**
   * 背景色
   */
  background: { type: String, default: "transparent" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const stickyEmits = {
  change: (sticky: boolean) => isBoolean(sticky),
}

export type StickyEmits = typeof stickyEmits
export type StickyExpose = {
  name: "zm-sticky"
  resize: () => void
}
export type StickyInstance = InstanceType<typeof Sticky>
