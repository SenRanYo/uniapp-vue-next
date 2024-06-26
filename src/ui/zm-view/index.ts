import View from "./zm-view.vue"
import type { ExtractPropTypes } from "vue"

export const viewKey = Symbol("zm-view")
export const viewProps = {
  /**
   * @description 高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * @description 是否能够滚动
   */
  scroll: { type: Boolean, default: true },
  /**
   * @description 背景色
   */
  background: { type: String, default: "" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const viewEmits = {
  scroll: (options: Page.PageScrollOption) => true,
  reachTop: () => true,
  reachBottom: () => true,
  touchstart: (event: any) => true,
  touchend: (event: any) => true,
  touchmove: (event: any) => true,
}

export type ViewEmits = typeof viewEmits
export type ViewProps = ExtractPropTypes<typeof viewProps>
export type ViewInstance = InstanceType<typeof View>
