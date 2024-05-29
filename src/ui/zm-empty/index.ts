import Empty from "./zm-empty.vue"

export const emptyProps = {
  /**
   * @description 是否显示
   */
  show: { type: Boolean, default: true },
  /**
   * @description 图标内容
   */
  icon: { type: String, default: "" },
  /**
   * @description 文本内容
   */
  text: { type: String, default: "暂无数据~" },
  /**
   * @description 文本大小
   */
  textSize: { type: [String, Number], default: "" },
  /**
   * @description 文本颜色
   */
  textColor: { type: String, default: "" },
  /**
   * @description 文本粗细
   */
  textWeight: { type: [String, Number], default: "" },
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
   * @description 图标宽度
   */
  iconWidth: { type: [String, Number], default: "" },
  /**
   * @description 图标高度
   */
  iconHeight: { type: [String, Number], default: "" },
  /**
   * @description 外边距
   */
  margin: { type: [String, Number], default: "" },
  /**
   * @description 内边距
   */
  padding: { type: [String, Number], default: "" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const emptyEmits = {}

export type EmptyEmits = typeof emptyEmits
export type EmptyExpose = {
  name: "zm-empty"
}
export type EmptyInstance = InstanceType<typeof Empty>
