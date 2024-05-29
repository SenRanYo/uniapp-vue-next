import Footer from "./zm-footer.vue"

export const footerProps = {
  /**
   * @description 元素层级
   */
  zIndex: { type: [Number, String], default: "" },
  /**
   * @description 距离底部偏移
   */
  offsetBottom: { type: [Number, String], default: 0 },
  /**
   * @description 背景色
   */
  background: { type: String, default: "" },
  /**
   * @description 是否开启底部安全区域
   */
  safeAreaInsetBottom: { type: Boolean },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const footerEmits = {
  rect: (rect: UniApp.NodeInfo) => true,
}

export type FooterEmits = typeof footerEmits
export type FooterExpose = {
  name: "zm-footer"
}
export type FooterInstance = InstanceType<typeof Footer>
