import Sidebar from "./zm-sidebar.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const sidebarKey = Symbol("zm-sidebar")
export const sidebarProps = {
  /**
   * 绑定值
   */
  modelValue: { type: [String, Number], default: () => "" },
  /**
   * 宽度
   */
  width: { type: [String, Number], default: "" },
  /**
   * 高度，默认自动
   */
  height: { type: [String, Number], default: "" },
  /**
   * 标题颜色
   */
  color: { type: String, default: "" },
  /**
   * 激活项文字颜色
   */
  activeColor: { type: String, default: "" },
  /**
   * 字体大小
   */
  fontSize: { type: [String, Number], default: "" },
  /**
   * 激活项文字大小
   */
  activeFontSize: { type: [String, Number], default: "" },
  /**
   * 字体粗细
   */
  fontWeight: { type: [String, Number], default: "" },
  /**
   * 激活项文字粗细
   */
  activeFontWeight: { type: [String, Number], default: "" },
  /**
   * 激活线条颜色
   */
  lineColor: { type: String, default: "" },
  /**
   * 激活线条宽度
   */
  lineWidth: { type: [String, Number], default: "" },
  /**
   * 激活线条高度
   */
  lineHeight: { type: [String, Number], default: "" },
  /**
   * 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * 是否自动滚动
   */
  autoScroll: { type: Boolean, default: true },
  /**
   * 激活项背景颜色
   */
  activeBackground: { type: String, default: "" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const sidebarEmits = {
  change: (value: SidebarValue) => true,
  "update:modelValue": (value: SidebarValue) => true,
}

export type SidebarValue = number | string
export type SidebarEmits = typeof sidebarEmits
export type SidebarProps = ExtractPropTypes<typeof sidebarProps>
export type SidebarInstance = InstanceType<typeof Sidebar>
