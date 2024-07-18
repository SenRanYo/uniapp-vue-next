import Empty from "./zm-empty.vue"

export const emptyProps = {
  /**
   * 是否显示
   */
  show: { type: Boolean, default: true },
  /**
   * 图标内容
   */
  icon: { type: String, default: "" },
  /**
   * 文本内容
   */
  text: { type: String, default: "暂无数据~" },
  /**
   * 文本大小
   */
  textSize: { type: [String, Number], default: "" },
  /**
   * 文本颜色
   */
  textColor: { type: String, default: "" },
  /**
   * 文本粗细
   */
  textWeight: { type: [String, Number], default: "" },
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
   * 图标宽度
   */
  iconWidth: { type: [String, Number], default: "" },
  /**
   * 图标高度
   */
  iconHeight: { type: [String, Number], default: "" },
  /**
   * 外边距
   */
  margin: { type: [String, Number], default: "" },
  /**
   * 内边距
   */
  padding: { type: [String, Number], default: "" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const emptyEmits = {}

export type EmptyEmits = typeof emptyEmits
export type EmptyExpose = {
  name: "zm-empty"
}
export type EmptyInstance = InstanceType<typeof Empty>
