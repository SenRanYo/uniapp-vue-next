import IndexAnchor from "./zm-index-anchor.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const indexAnchorProps = {
  /**
   * 索引字符
   */
  index: { type: [String, Number], default: "" },
  /**
   * 字符颜色
   */
  color: { type: String, default: "" },
  /**
   * 高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * 字符大小
   */
  fontSize: { type: [String, Number], default: "" },
  /**
   * 字符粗细
   */
  fontWeight: { type: [String, Number], default: "" },
  /**
   * 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * 吸顶时字符颜色
   */
  stickyColor: { type: String, default: "" },
  /**
   * 吸顶时字符大小
   */
  stickyFontSize: { type: [String, Number], default: "" },
  /**
   * 吸顶时字符粗细
   */
  stickyFontWeight: { type: [String, Number], default: "" },
  /**
   * 吸顶时背景颜色
   */
  stickyBackground: { type: String, default: "" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const indexAnchorEmits = {
  blur: () => true,
}

export type IndexAnchorEmits = typeof indexAnchorEmits
export type IndexAnchorProps = ExtractPropTypes<typeof indexAnchorProps>
export type IndexAnchorInstance = InstanceType<typeof IndexAnchor>
