import Badge from "./zm-badge.vue"
import type { ExtractPropTypes } from "vue"

export const badgeProps = {
  /**
   * 内容值
   */
  value: { type: [String, Number], default: "" },
  /**
   * 是否显示圆点
   */
  dot: { type: Boolean, default: false },
  /**
   * 图标名称
   */
  icon: { type: String, default: "" },
  /**
   * 颜色
   */
  color: { type: String, default: "" },
  /**
   * 圆点大小
   */
  dotSize: { type: [String, Number], default: "" },
  /**
   * 最大值
   */
  max: { type: [String, Number], default: "99" },
  /**
   * 为零时是否显示
   */
  showZero: { type: Boolean, default: false },
  /**
   * 高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * 圆角值
   */
  radius: { type: [String, Number], default: "" },
  /**
   * 位置偏移值
   */
  offset: { type: [String, Number, Array], default: "" },
  /**
   * 定位类型
   */
  position: { type: String, default: "" },
  /**
   * 字体大小
   */
  fontSize: { type: [String, Number], default: "" },
  /**
   * 字体颜色
   */
  fontColor: { type: String, default: "" },
  /**
   * 字体粗细
   */
  fontWeight: { type: [String, Number], default: "" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
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
