import NoticeBar from "./zm-notice-bar.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const noticeBarProps = {
  /**
   * 显示内容，vertical 垂直模式时要求内容为数组
   */
  text: { type: [String, Array], default: "" },
  /**
   * 滚动模式
   */
  mode: { type: String as PropType<NoticeBarMode>, default: "horizontal", validator: (v: string) => ["vertical", "horizontal"].includes(v) },
  /**
   * 内容文本颜色
   */
  color: { type: String, default: "" },
  /**
   * 滚动速率(px/s)
   */
  speed: { type: Number, default: 60 },
  /**
   * 垂直滚动时自动切换时间间隔
   */
  interval: { type: Number, default: 3000 },
  /**
   * 垂直滚动时滑动动画时长
   */
  duration: { type: Number, default: 500 },
  /**
   * 是否开启滚动
   */
  scrollable: { type: Boolean, default: true },
  /**
   * 最小高度
   */
  minHeight: { type: [String, Number], default: "80rpx" },
  /**
   * 内容文本大小
   */
  fontSize: { type: [String, Number], default: "" },
  /**
   * 内容文本粗细
   */
  fontWeight: { type: [String, Number], default: "" },
  /**
   * 左侧图标名称
   */
  icon: { type: [String, Array], default: "volume-o" },
  /**
   * 左侧图标名称
   */
  iconSize: { type: [String, Number], default: "" },
  /**
   * 左侧图标颜色
   */
  iconColor: { type: String, default: "primary" },
  /**
   * 左侧图标粗细
   */
  iconWeight: { type: [String, Number], default: "" },
  /**
   * 右侧图标名称
   */
  rightIcon: { type: [String, Array], default: "" },
  /**
   * 右侧图标名称
   */
  rightIconSize: { type: [String, Number], default: "" },
  /**
   * 右侧图标颜色
   */
  rightIconColor: { type: String, default: "primary" },
  /**
   * 右侧图标粗细
   */
  rightIconWeight: { type: [String, Number], default: "" },
  /**
   * 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const noticeBarEmits = {
  click: (event: TouchEvent) => true,
}

export type NoticeBarMode = "vertical" | "horizontal"
export type NoticeBarProps = ExtractPropTypes<typeof noticeBarProps>
export type NoticeBarExpose = { name: "zm-notice-bar" }
export type NoticeBarInstance = InstanceType<typeof NoticeBar>
