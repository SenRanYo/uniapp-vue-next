import TextHighlight from "./zm-text-highlight.vue"

export const textHighlightProps = {
  /**
   * 文本内容
   */
  text: { type: String, default: "" },
  /**
   * 匹配文本内容
   */
  match: { type: String, default: "" },
  /**
   * 文本颜色
   */
  color: { type: String, default: "" },
  /**
   * 文本行数
   */
  textRow: { type: [String, Number], default: "2" },
  /**
   * 文本大小
   */
  fontSize: { type: [String, Number], default: "" },
  /**
   * 文本粗细
   */
  fontWeight: { type: [String, Number], default: "" },
  /**
   * 文本行高
   */
  lineHeight: { type: [String, Number], default: "" },
  /**
   * 文本高亮颜色
   */
  highlightColor: { type: String, default: "" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const textHighlightEmits = {}

export type TextHighlightEmits = typeof textHighlightEmits
export type TextHighlightExpose = {
  name: "zm-text-highlight"
  match: () => void
}
export type TextHighlightInstance = InstanceType<typeof TextHighlight>
