import Sidebar from "./zm-sidebar.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const sidebarKey = Symbol("zm-sidebar")
export const sidebarProps = {
  /**
   * @description 绑定值
   */
  modelValue: { type: [String, Number], default: () => "" },
  /**
   * @description 宽度
   */
  width: { type: [String, Number], default: "" },
  /**
   * @description 高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * @description 列表项高度
   */
  itemHeight: { type: [String, Number], default: "" },
  /**
   * @description 标题颜色
   */
  color: { type: String, default: "" },
  /**
   * @description 激活项文字颜色
   */
  activeColor: { type: String, default: "" },
  /**
   * @description 字体大小
   */
  fontSize: { type: [String, Number], default: "" },
  /**
   * @description 激活项文字大小
   */
  activeFontSize: { type: [String, Number], default: "" },
  /**
   * @description 字体粗细
   */
  fontWeight: { type: [String, Number], default: "" },
  /**
   * @description 激活项文字粗细
   */
  activeFontWeight: { type: [String, Number], default: "" },
  /**
   * @description 激活线条颜色
   */
  lineColor: { type: String, default: "" },
  /**
   * @description 激活线条宽度
   */
  lineWidth: { type: [String, Number], default: "" },
  /**
   * @description 激活线条高度
   */
  lineHeight: { type: [String, Number], default: "" },
  /**
   * @description 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * @description 激活项背景颜色
   */
  activeBackground: { type: String, default: "" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const sidebarEmits = {
  blur: () => true,
  change: (value: SidebarValue) => true,
  "update:modelValue": (value: SidebarValue) => true,
}

export type SidebarValue = number | string
export type SidebarEmits = typeof sidebarEmits
export type SidebarProps = ExtractPropTypes<typeof sidebarProps>
export type SidebarInstance = InstanceType<typeof Sidebar>
