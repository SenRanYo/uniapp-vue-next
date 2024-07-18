import Row from "./zm-row.vue"

export const rowProps = {
  /**
   * 间隔距离
   */
  gap: { type: [String, Number], default: "" },
  /**
   * 列间隔距离
   */
  colGap: { type: [String, Number], default: "" },
  /**
   * 行间隔距离
   */
  rowGap: { type: [String, Number], default: "" },
  /**
   * 垂直对齐方式
   */
  align: { type: String, default: "stretch", values: ["start", "end", "center", "stretch", "baseline"] },
  /**
   * 水平对齐方式
   */
  justify: { type: String, default: "start", values: ["start", "end", "center", "between", "around"] },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
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
