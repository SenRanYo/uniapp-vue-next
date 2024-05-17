import Col from "./zm-col.vue"

export const colProps = {
  /**
   * @description 栅格占据的列数
   */
  span: { type: Number, default: 24 },
  /**
   * @description 垂直对齐方式
   */
  align: { type: String, default: "stretch", values: ["start", "end", "center", "stretch", "baseline"] },
  /**
   * @description 水平对齐方式
   */
  justify: { type: String, default: "start", values: ["start", "end", "center", "between", "around"] },
  /**
   * @description 栅格左侧的间隔格数
   */
  offset: { type: Number, default: 0 },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const colEmits = {}

export type ColEmits = typeof colEmits
export type ColExpose = {
  name: "zm-col"
}
export type ColInstance = InstanceType<typeof Col>
