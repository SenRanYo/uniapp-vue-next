import Loading from "./zm-loading.vue"

export const loadingProps = {
  /**
   * 是否显示
   */
  show: { type: Boolean, default: true },
  /**
   * 文本内容
   */
  text: { type: String, default: "" },
  /**
   * 颜色
   */
  color: { type: String, default: "" },
  /**
   * 类型
   */
  type: { type: String, default: "spinner" },
  /**
   * 大小
   */
  size: { type: [Number, String], default: "" },
  /**
   * 文本大小
   */
  textSize: { type: [Number, String], default: "" },
  /**
   * 文本颜色
   */
  textColor: { type: String, default: "" },
  /**
   * 文本粗细
   */
  textWeight: { type: [Number, String], default: "" },
  /**
   * 垂直布局
   */
  vertical: { type: Boolean, default: false },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const loadingEmits = {
  height: (height: number) => true,
  gradient: (scrollTop: number) => true,
}

export type LoadingEmits = typeof loadingEmits
export type LoadingExpose = {
  name: "zm-loading"
}
export type LoadingInstance = InstanceType<typeof Loading>
