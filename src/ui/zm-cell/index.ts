import Cell from "./zm-cell.vue"
import type { ExtractPropTypes } from "vue"

export const cellProps = {
  /**
   * 标题
   */
  title: { type: [String, Number], default: "" },
  /**
   * 描述
   */
  desc: { type: [String, Number], default: "" },
  /**
   * 内容
   */
  content: { type: [String, Number], default: "" },
  /**
   * 高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * 内边距
   */
  padding: { type: [String, Number], default: "" },
  /**
   * 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * 图标名称
   */
  icon: { type: String, default: "" },
  /**
   * 图标大小
   */
  iconSize: { type: [String, Number], default: "" },
  /**
   * 图标颜色
   */
  iconColor: { type: String, default: "" },
  /**
   * 图标粗细
   */
  iconWeight: { type: [String, Number], default: "" },
  /**
   * 图标前缀
   */
  iconPrefix: { type: String, default: "" },
  /**
   * 跳转链接
   */
  url: { type: String, default: "" },
  /**
   * 跳转类型
   */
  linkType: { type: String, default: "navigateTo" },
  /**
   * 是否显示边框
   */
  border: { type: Boolean, default: false },
  /**
   * 边框颜色
   */
  borderColor: { type: String, default: "" },
  /**
   * 边框宽度
   */
  borderWidth: { type: String, default: "" },
  /**
   * 边框样式
   */
  borderStyle: { type: String, default: "" },
  /**
   * 是否可点击的
   */
  clickable: { type: Boolean, default: true },
  /**
   * 是否为链接
   */
  isLink: { type: Boolean, default: false },
  /**
   * 是否居中对齐
   */
  center: { type: Boolean, default: false },
  /**
   * 标题大小
   */
  titleSize: { type: [String, Number], default: "" },
  /**
   * 标题颜色
   */
  titleColor: { type: String, default: "" },
  /**
   * 标题粗细
   */
  titleWeight: { type: [String, Number], default: "" },
  /**
   * 描述大小
   */
  descSize: { type: [String, Number], default: "" },
  /**
   * 描述颜色
   */
  descColor: { type: String, default: "" },
  /**
   * 描述粗细
   */
  descWeight: { type: [String, Number], default: "" },
  /**
   * 内容大小
   */
  contentSize: { type: [String, Number], default: "" },
  /**
   * 内容颜色
   */
  contentColor: { type: String, default: "" },
  /**
   * 内容粗细
   */
  contentWeight: { type: [String, Number], default: "" },
  /**
   * 右侧图标名称
   */
  rightIcon: { type: String, default: "arrow" },
  /**
   * 右侧图标大小
   */
  rightIconSize: { type: [String, Number], default: "" },
  /**
   * 右侧图标颜色
   */
  rightIconColor: { type: String, default: "" },
  /**
   * 右侧图标粗细
   */
  rightIconWeight: { type: String, default: "" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const cellEmits = {
  click: (evnet: TouchEvent) => true,
}
export type CellEmits = typeof cellEmits
export type CellProps = ExtractPropTypes<typeof cellProps>
export type CellExpose = { name: "zm-cell" }
export type CellInstance = InstanceType<typeof Cell>
