import Line from "./zm-line.vue"

export const lineProps = {
  /**
   * @description 线条颜色
   */
  color: { type: String, default: "" },
  /**
   * @description 线条宽度
   */
  width: { type: [Number, String], default: "100%" },
  /**
   * @description 线条高度
   */
  height: { type: [Number, String], default: "2rpx" },
  /**
   * @description 线条类型 solid 实线 dashed 虚线 dotted 点线
   */
  type: { type: String, default: "solid" },
  /**
   * @description 是否为垂直线条，默认为水平线条
   */
  vertical: { type: Boolean, default: false },
  /**
   * @description 外间距
   */
  margin: { type: [Number, String], default: "" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const lineEmits = {}

export type LineEmits = typeof lineEmits
export type LineExpose = {
  name: "zm-line"
}
export type LineInstance = InstanceType<typeof Line>
