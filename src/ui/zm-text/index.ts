import Text from "./zm-text.vue"
import type { ExtractPropTypes } from "vue"

export const textProps = {
  /**
   * 文本内容
   */
  text: { type: [String, Number], default: "" },
  /**
   * 文本大小
   */
  size: { type: [String, Number], default: "" },
  /**
   * 文本颜色
   */
  color: { type: String, default: "" },
  /**
   * 文本粗细
   */
  weight: { type: [String, Number], default: "" },
  /**
   * 文本对齐方式，可选值 left、center、right
   */
  align: { type: [String, Number], default: "left" },
  /**
   * 展示的行数
   */
  rows: { type: [String, Number], default: Infinity },
  /**
   * 文本超出显示方式
   */
  overflow: { type: String, default: "ellipsis" },
  /**
   * 文本修饰，可选值 underline、line-through
   */
  decoration: { type: String, default: "" },
  /**
   * 文本行高
   */
  lineHeight: { type: [String, Number], default: "" },
  /**
   * 是否点击拨打电话
   */
  cell: { type: Boolean, default: false },
  /**
   * 是否解码
   */
  decode: { type: Boolean, default: false },
  /**
   * 是否可点击的，点击会有状态变化
   */
  clickable: { type: Boolean, default: false },
  /**
   * 文本是否可选
   */
  selectable: { type: Boolean, default: false },
  /**
   * 文本前缀
   */
  prefix: { type: [String, Number], default: "" },
  /**
   * 文本前缀大小
   */
  prefixSize: { type: [String, Number], default: "" },
  /**
   * 文本前缀颜色
   */
  prefixColor: { type: String, default: "" },
  /**
   * 文本前缀粗细
   */
  prefixWeight: { type: [String, Number], default: "" },
  /**
   * 文本前缀与文本的间隔
   */
  prefixGutter: { type: [String, Number], default: "" },
  /**
   * 文本前缀修饰，可选值 underline、line-through
   */
  prefixDecoration: { type: String, default: "" },
  /**
   * 文本后缀
   */
  suffix: { type: [String, Number], default: "" },
  /**
   * 文本后缀大小
   */
  suffixSize: { type: [String, Number], default: "" },
  /**
   * 文本后缀颜色
   */
  suffixColor: { type: String, default: "" },
  /**
   * 文本后缀粗细
   */
  suffixWeight: { type: [String, Number], default: "" },
  /**
   * 文本后缀与文本的间隔
   */
  suffixGutter: { type: [String, Number], default: "" },
  /**
   * 文本后缀修饰，可选值 underline、line-through
   */
  suffixDecoration: { type: String, default: "" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const textEmits = {
  click: () => true,
}
export type TextEmits = typeof textEmits
export type TextProps = ExtractPropTypes<typeof textProps>
export type TextInstance = InstanceType<typeof Text>
