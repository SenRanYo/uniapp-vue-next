import Badge from "./zm-badge.vue"
import type { ExtractPropTypes } from "vue"

export const badgeProps = {
  /**
   * @description 内容值
   */
  value: { type: [String, Number], default: "" },
  /**
   * @description 是否显示圆点
   */
  dot: { type: Boolean, default: false },
  /**
   * @description 图标名称
   */
  icon: { type: String, default: "" },
  /**
   * @description 颜色
   */
  color: { type: String, default: "" },
  /**
   * @description 圆点大小
   */
  dotSize: { type: [String, Number], default: "" },
  /**
   * @description 最大值
   */
  max: { type: [String, Number], default: "99" },
  /**
   * @description 为零时是否显示
   */
  showZero: { type: Boolean, default: false },
  /**
   * @description 高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * @description 圆角值
   */
  radius: { type: [String, Number], default: "" },
  /**
   * @description 位置偏移值
   */
  offset: { type: [String, Number, Array], default: "" },
  /**
   * @description 定位类型
   */
  position: { type: String, default: "" },
  /**
   * @description 字体大小
   */
  fontSize: { type: [String, Number], default: "" },
  /**
   * @description 字体颜色
   */
  fontColor: { type: String, default: "" },
  /**
   * @description 字体粗细
   */
  fontWeight: { type: [String, Number], default: "" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const badgeEmits = {
  click: (evnet: TouchEvent) => true,
}
export type BadgeEmits = typeof badgeEmits
export type BadgeProps = ExtractPropTypes<typeof badgeProps>
export type BadgeExpose = { name: "zm-badge" }
export type BadgeInstance = InstanceType<typeof Badge>
