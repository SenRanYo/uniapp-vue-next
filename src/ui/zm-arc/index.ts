import Arc from "./zm-arc.vue"
import type { ExtractPropTypes } from "vue"

export const arcProps = {
  /**
   * @description 弧形高度
   */
  height: { type: [Number, String], default: "130rpx" },
  /**
   * @description 圆弧半径
   */
  percent: { type: [Number, String], default: 120 },
  /**
   * @description 背景色
   */
  background: { type: String, default: "" },
  /**
   * @description 顶部位置
   */
  top: { type: [Number, String], default: 0 },
  /**
   * @description 左边位置
   */
  left: { type: [Number, String], default: 0 },
  /**
   * @description 是否固定定位
   */
  fixed: { type: Boolean, default: true },
  /**
   * @description 元素层级
   */
  zIndex: { type: [Number, String], default: "" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const arcEmits = {
  click: (evnet: TouchEvent) => true,
}
export type ArcEmits = typeof arcEmits
export type ArcProps = ExtractPropTypes<typeof arcProps>
export type ArcExpose = { name: "zm-arc" }
export type ArcInstance = InstanceType<typeof Arc>
