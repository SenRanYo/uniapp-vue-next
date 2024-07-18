import TextEllipsis from "./zm-text-ellipsis.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const textEllipsisProps = {
  /**
   * 自定义类名
   */
  text: { type: String, default: "" },
  /**
   * 展示的行数
   */
  rows: { type: [String, Number], default: "2" },
  /**
   * 省略号的文本内容
   */
  dots: { type: String, default: "..." },
  /**
   * 展开操作的文案
   */
  expandText: { type: String, default: "展开" },
  /**
   * 收起操作的文案
   */
  collapseText: { type: String, default: "收起" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const textEllipsisEmits = {
  click: (event: TouchEvent) => true,
}

export type textEllipsisProps = ExtractPropTypes<typeof textEllipsisProps>
export type textEllipsisInstance = InstanceType<typeof TextEllipsis>
