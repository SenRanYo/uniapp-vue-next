import SidebarItem from "./zm-sidebar-item.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const sidebarItemProps = {
  /**
   * @description 标识符，通常为一个唯一的字符串或数字
   */
  name: { type: [String, Number], default: () => "", required: true },
  /**
   * @description 标题
   */
  title: { type: [String, Number], default: () => "" },
  /**
   * @description 宽度
   */
  width: { type: [String, Number], default: "" },
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

export const sidebarItemEmits = {
  blur: () => true,
}

export type SidebarItemEmits = typeof sidebarItemEmits
export type SidebarItemProps = ExtractPropTypes<typeof sidebarItemProps>
export type SidebarItemInstance = InstanceType<typeof SidebarItem>
