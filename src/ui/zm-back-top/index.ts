import BackTop from "./zm-back-top.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const backTopProps = {
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

export const backTopEmits = {
  select: (index: number | string) => true,
}

export type BackTopEmits = typeof backTopEmits
export type BackTopProps = ExtractPropTypes<typeof backTopProps>
export type BackTopInstance = InstanceType<typeof BackTop>
