import SidebarItem from "./zm-sidebar-item.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const sidebarItemProps = {
  /**
   * 标识符，通常为一个唯一的字符串或数字
   */
  name: { type: [String, Number], default: () => "", required: true },
  /**
   * 标题
   */
  title: { type: [String, Number], default: () => "" },
  /**
   * 高度
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
   * 背景颜色
   */
  background: { type: String, default: "" },
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

export const sidebarItemEmits = {
  blur: () => true,
}

export type SidebarItemEmits = typeof sidebarItemEmits
export type SidebarItemProps = ExtractPropTypes<typeof sidebarItemProps>
export type SidebarItemInstance = InstanceType<typeof SidebarItem>
