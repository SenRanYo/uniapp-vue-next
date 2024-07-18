import Icon from "./zm-icon.vue"

export const iconProps = {
  /**
   * 图标名称或者图片地址
   */
  name: { type: [String, null], default: "" },
  /**
   * 图标大小
   */
  size: { type: [String, Number], default: "" },
  /**
   * 图标颜色
   */
  color: { type: [String, null], default: "" },
  /**
   * 图标圆角
   */
  radius: { type: [String, Number], default: "" },
  /**
   * 图标粗细
   */
  weight: { type: [String, null], default: "" },
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
  imageMode: {
    type: String,
    default: "scaleToFill",
    values: ["scaleToFill", "aspectFit", "aspectFill", "widthFix", "heightFix", "top", "bottom", "center", "left", "right", "top left", "top right", "bottom left", "bottom right"],
  },
  /**
   * 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * 自定义图标名称前缀
   */
  customPrefix: { type: String, default: "zm-icon" },
  /**
   * 激活时的类名
   */
  hoverClass: { type: String, default: "zm-icon--hover" },
  /**
   * 自定义类名
   */
  hoverStyle: { type: [String, Object], default: () => ({}) },
  /**
   * 激活时的样式
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const iconEmits = {
  click: (rect: TouchEvent) => true,
}

export type IconEmits = typeof iconEmits
export type IconExpose = {
  name: "zm-icon"
}
export type IconInstance = InstanceType<typeof Icon>
