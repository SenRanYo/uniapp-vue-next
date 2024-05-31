import Cell from "./zm-cell.vue"
import type { ExtractPropTypes } from "vue"

export const cellProps = {
  /**
   * @description 标题
   */
  title: { type: [String, Number], default: "" },
  /**
   * @description 描述
   */
  desc: { type: [String, Number], default: "" },
  /**
   * @description 内容
   */
  content: { type: [String, Number], default: "" },
  /**
   * @description 高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * @description 内边距
   */
  padding: { type: [String, Number], default: "" },
  /**
   * @description 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * @description 图标名称
   */
  icon: { type: String, default: "" },
  /**
   * @description 图标大小
   */
  iconSize: { type: [String, Number], default: "" },
  /**
   * @description 图标颜色
   */
  iconColor: { type: String, default: "" },
  /**
   * @description 图标粗细
   */
  iconWeight: { type: [String, Number], default: "" },
  /**
   * @description 图标前缀
   */
  iconPrefix: { type: String, default: "" },
  /**
   * @description 跳转链接
   */
  url: { type: String, default: "" },
  /**
   * @description 跳转类型
   */
  linkType: { type: String, default: "navigateTo" },
  /**
   * @description 是否显示边框
   */
  border: { type: Boolean, default: false },
  /**
   * @description 边框颜色
   */
  borderColor: { type: String, default: "" },
  /**
   * @description 边框宽度
   */
  borderWidth: { type: String, default: "" },
  /**
   * @description 边框样式
   */
  borderStyle: { type: String, default: "" },
  /**
   * @description 是否可点击的
   */
  clickable: { type: Boolean, default: true },
  /**
   * @description 是否为链接
   */
  isLink: { type: Boolean, default: false },
  /**
   * @description 是否居中对齐
   */
  center: { type: Boolean, default: false },
  /**
   * @description 标题大小
   */
  titleSize: { type: [String, Number], default: "" },
  /**
   * @description 标题颜色
   */
  titleColor: { type: String, default: "" },
  /**
   * @description 标题粗细
   */
  titleWeight: { type: [String, Number], default: "" },
  /**
   * @description 描述大小
   */
  descSize: { type: [String, Number], default: "" },
  /**
   * @description 描述颜色
   */
  descColor: { type: String, default: "" },
  /**
   * @description 描述粗细
   */
  descWeight: { type: [String, Number], default: "" },
  /**
   * @description 内容大小
   */
  contentSize: { type: [String, Number], default: "" },
  /**
   * @description 内容颜色
   */
  contentColor: { type: String, default: "" },
  /**
   * @description 内容粗细
   */
  contentWeight: { type: [String, Number], default: "" },
  /**
   * @description 右侧图标名称
   */
  rightIcon: { type: String, default: "arrow" },
  /**
   * @description 右侧图标大小
   */
  rightIconSize: { type: [String, Number], default: "" },
  /**
   * @description 右侧图标颜色
   */
  rightIconColor: { type: String, default: "" },
  /**
   * @description 右侧图标粗细
   */
  rightIconWeight: { type: String, default: "" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
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
