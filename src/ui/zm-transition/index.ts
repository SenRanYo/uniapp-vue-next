import Transition from "./zm-transition.vue"
import { isBoolean } from "../utils/check"
import type { ExtractPropTypes } from "vue"

export const transitionProps = {
  /**
   * 是否显示
   */
  show: { type: Boolean, default: false },
  /**
   * 动画名称，有效值fade、zoom、fade-zoom、fade-up、fade-down、fade-left、fade-right、slide-up、slide-down、slide-left、slide-right
   */
  name: { type: String, default: "fade" },
  /**
   * 元素层级
   */
  zIndex: { type: [String, Number], default: "" },
  /**
   * 过渡时间
   */
  duration: { type: [Number, String], default: 300 },
  /**
   * 元素穿透
   */
  penetrate: { type: Boolean, default: false },
  /**
   * 进入动画函数
   */
  enterTimingFunction: { type: String, default: "ease-out" },
  /**
   * 离开动画函数
   */
  leaveTimingFunction: { type: String, default: "ease-in" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const transitionEmits = {
  "update:show": (show: boolean) => isBoolean(show),
  click: (event: TouchEvent) => true,
  enter: () => true,
  leave: () => true,
  "before-enter": () => true,
  "after-enter": () => true,
  "after-leave": () => true,
  "before-leave": () => true,
}

export type TransitionEmits = typeof transitionEmits
export type TransitionProps = ExtractPropTypes<typeof transitionProps>
export type TransitionInstance = InstanceType<typeof Transition>
