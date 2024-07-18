import Footer from "./zm-footer.vue"
import type { ExtractPropTypes } from "vue"

export const footerProps = {
  /**
   * 元素层级
   */
  zIndex: { type: [Number, String], default: "" },
  /**
   * 距离底部偏移
   */
  offsetBottom: { type: [Number, String], default: 0 },
  /**
   * 背景色
   */
  background: { type: String, default: "" },
  /**
   * 是否开启底部安全区域
   */
  safeAreaInsetBottom: { type: Boolean },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const footerEmits = {
  rect: (rect: UniApp.NodeInfo) => true,
  height: (height: number) => true,
}

export type FooterEmits = typeof footerEmits
export type FooterProps = ExtractPropTypes<typeof footerProps>
export type FooterInstance = InstanceType<typeof Footer>
