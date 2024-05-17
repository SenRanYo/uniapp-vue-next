import Row from "./zm-row.vue"

export const rowProps = {
  /**
   * @description 间隔距离
   */
  gap: { type: [String, Number], default: "" },
  /**
   * @description 列间隔距离
   */
  colGap: { type: [String, Number], default: "" },
  /**
   * @description 行间隔距离
   */
  rowGap: { type: [String, Number], default: "" },
  /**
   * @description 垂直对齐方式
   */
  align: { type: String, default: "stretch", values: ["start", "end", "center", "stretch", "baseline"] },
  /**
   * @description 水平对齐方式
   */
  justify: { type: String, default: "start", values: ["start", "end", "center", "between", "around"] },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const rowEmits = {}

export type RowEmits = typeof rowEmits
export type RowExpose = {
  name: "zm-row"
  resize: () => void
}

export type RowInstance = InstanceType<typeof Row>
