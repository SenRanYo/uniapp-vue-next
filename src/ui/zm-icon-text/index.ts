import IconText from "./zm-icon-text.vue"

export const iconTextProps = {
  /**
   * 图标名称或者图片地址
   */
  name: { type: String, default: "" },
  /**
   * 图标大小
   */
  size: { type: [String, Number], default: "" },
  /**
   * 图标颜色
   */
  color: { type: String, default: "" },
  /**
   * 图标圆角
   */
  radius: { type: [String, Number], default: "" },
  /**
   * 图标粗细
   */
  weight: { type: String, default: "" },
  /**
   * 文本内容
   */
  text: { type: [String, Number], default: "" },
  /**
   * 文本大小
   */
  textSize: { type: [String, Number], default: "" },
  /**
   * 文本颜色
   */
  textColor: { type: String, default: "" },
  /**
   * 文本粗细
   */
  textWeight: { type: String, default: "" },
  /**
   * 文本和图标的间隔
   */
  textGap: { type: [String, Number], default: "" },
  /**
   * 文本在图标左边
   */
  textLeft: { type: Boolean, default: false },
  /**
   * 图标为图片时的宽度
   */
  width: { type: [String, Number], default: "" },
  /**
   * 图标为图片时的高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * 图标为图片时的显示模式
   */
  imageMode: { type: String, default: "scaleToFill" },
  /**
   * 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * 自定义图标名称前缀
   */
  customPrefix: { type: String, default: "zm-icon" },
  /**
   * 激活时的样式
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const iconTextEmits = {
  click: (rect: TouchEvent) => true,
}

export type IconTextEmits = typeof iconTextEmits
export type IconTextExpose = {
  name: "zm-icon-text"
}
export type IconTextInstance = InstanceType<typeof IconText>
