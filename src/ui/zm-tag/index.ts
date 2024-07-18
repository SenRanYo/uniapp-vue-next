import Tag from "./zm-tag.vue"
import type { ExtractPropTypes } from "vue"

export const tagProps = {
  /**
   * 是否显示
   */
  show: { type: Boolean, default: true },
  /**
   * 主题类型
   */
  type: { type: String, default: "primary", validator: (v: string) => ["primary", "success", "warning", "error", "info"].includes(v) },
  /**
   * 标签的文字内容
   */
  text: { type: String, default: "" },
  /**
   * 标签的文字大小
   */
  textSize: { type: [String, Number], default: "" },
  /**
   * 标签的文字颜色
   */
  textColor: { type: String, default: "" },
  /**
   * 标签的文字粗细
   */
  textWeight: { type: [String, Number], default: "" },
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
   * 是否圆形的
   */
  round: { type: Boolean, default: false },
  /**
   * 是否镂空的
   */
  plain: { type: Boolean, default: false },
  /**
   * 是否为可关闭标签
   */
  closeable: { type: Boolean, default: false },
  /**
   * 高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * 内边距
   */
  padding: { type: String, default: "" },
  /**
   * 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * 边框颜色
   */
  borderColor: { type: String, default: "" },
  /**
   * 边框大小
   */
  borderWidth: { type: [String, Number], default: "" },
  /**
   * 圆角大小
   */
  borderRadius: { type: [String, Number], default: "" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const tagEmits = {
  click: (event: TouchEvent) => true,
  close: (event: TouchEvent) => true,
  "update:show": (show: boolean) => true,
}

export type TagEmits = typeof tagEmits
export type TagProps = ExtractPropTypes<typeof tagProps>
export type TagInstance = InstanceType<typeof Tag>
