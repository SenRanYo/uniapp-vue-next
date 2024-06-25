import IndexBar from "./zm-index-bar.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const indexBarKey = Symbol("zm-index-bar")
export const indexBarProps = {
  /**
   * @description 索引字符列表
   */
  indexList: { type: Array as PropType<(string | number)[]>, default: () => [] },
  /**
   * @description 元素层级
   */
  zIndex: { type: [String, Number], default: "1" },
  /**
   * @description 是否自动吸顶
   */
  sticky: { type: Boolean, default: true },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const indexBarEmits = {
  select: (index: number | string) => true,
}

export type IndexBarEmits = typeof indexBarEmits
export type IndexBarProps = ExtractPropTypes<typeof indexBarProps>
export type IndexBarInstance = InstanceType<typeof IndexBar>
