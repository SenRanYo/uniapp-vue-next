import CellGroup from "./zm-cell-group.vue"
import type { ExtractPropTypes } from "vue"

export const cellGroupKey = Symbol("zm-cell-group")
export const cellGroupProps = {
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
   * @description 描述内容大小
   */
  descSize: { type: [String, Number], default: "" },
  /**
   * @description 描述内容颜色
   */
  descColor: { type: String, default: "" },
  /**
   * @description 描述内容粗细
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
   * @description 是否显示边框
   */
  border: { type: Boolean, default: true },
  /**
   * @description 圆角值
   */
  borderRadius: { type: [String, Number], default: "" },
  /**
   * @description 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const cellGroupEmits = {}

export type CellGroupEmits = typeof cellGroupEmits
export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>
export type CellGroupExpose = { name: "zm-cell-group" }
export type CellGroupInstance = InstanceType<typeof CellGroup>
