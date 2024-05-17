import Transition from "./zm-transition.vue"
import { isBoolean } from "../utils/check"

export const transitionProps = {
  /**
   * @description 是否显示
   */
  show: { type: Boolean, default: false },
  /**
   * @description 动画模式，有效值fade、zoom、fade-zoom、fade-top、fade-bottom、fade-left、fade-right、slide-top、slide-bottom、slide-left、slide-right
   */
  mode: { type: [String, Array, null], default: "fade" },
  /**
   * @description 元素层级
   */
  zIndex: { type: [String, Number], default: "" },
  /**
   * @description 过渡时间
   */
  duration: { type: Number, default: 300 },
  /**
   * @description 元素穿透
   */
  penetrate: { type: Boolean, default: false },
  /**
   * @description 进入延时
   */
  enterDelay: { type: Number, default: 0 },
  /**
   * @description 离开延时
   */
  leaveDelay: { type: Number, default: 0 },
  /**
   * @description 进入动画函数
   */
  enterTimingFunction: { type: String, default: "ease-out" },
  /**
   * @description 离开动画函数
   */
  leaveTimingFunction: { type: String, default: "ease-in" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const transitionEmits = {
  "update:show": (show: boolean) => isBoolean(show),
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  click: () => true,
}

export type TransitionEmits = typeof transitionEmits
export type TransitionExpose = {
  name: "zm-transition"
  open: () => void
  close: () => void
  step: () => void
}
export type TransitionInstance = InstanceType<typeof Transition>
