import Tabbar from "./zm-tabbar.vue"
import { isString, isNumber } from "../utils/check"

export const tabbarProps = {
  /**
   * 绑定值
   */
  modelValue: { type: [String, Number], default: "" },
  /**
   * 是否固定定位
   */
  fixed: { type: Boolean, default: false },
  /**
   * 是否显示边框线
   */
  border: { type: Boolean, default: true },
  /**
   * 元素层级
   */
  zIndex: { type: [String, Number], default: "" },
  /**
   * 激活颜色
   */
  activeColor: { type: String, default: "" },
  /**
   * 未激活颜色
   */
  inactiveColor: { type: String, default: "" },
  /**
   * 是否开启路由模式
   */
  route: { type: Boolean, default: false },
  /**
   * 高度
   */
  height: { type: [String, Number], default: "100rpx" },
  /**
   * 背景色
   */
  background: { type: String, default: "#ffffff" },
  /**
   * 是否开启底部安全区适配
   */
  safeAreaInsetBottom: { type: Boolean, default: true },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const tabbarEmits = {
  "update:modelValue": (value: string | number) => isString(value) || isNumber(value),
  change: (name: string | number) => isString(name) || isNumber(name),
  rect: (rect: UniApp.NodeInfo) => true,
  height: (height: number) => true,
}

export type TabbarEmits = typeof tabbarEmits
export type TabbarExpose = {
  name: "zm-tabbar"
  resize: () => void
}
export type TabbarInstance = InstanceType<typeof Tabbar>
