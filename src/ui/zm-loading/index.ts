import Loading from "./zm-loading.vue"

export const loadingProps = {
  /**
   * @description 是否显示
   */
  show: { type: Boolean, default: true },
  /**
   * @description 文本内容
   */
  text: { type: String, default: "" },
  /**
   * @description 颜色
   */
  color: { type: String, default: "" },
  /**
   * @description 类型
   */
  type: { type: String, default: "spinner" },
  /**
   * @description 大小
   */
  size: { type: [Number, String], default: "" },
  /**
   * @description 文本大小
   */
  textSize: { type: [Number, String], default: "" },
  /**
   * @description 文本颜色
   */
  textColor: { type: String, default: "" },
  /**
   * @description 文本粗细
   */
  textWeight: { type: [Number, String], default: "" },
  /**
   * @description 垂直布局
   */
  vertical: { type: Boolean, default: false },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
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
