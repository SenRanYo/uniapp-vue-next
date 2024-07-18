import BackTop from "./zm-back-top.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const backTopProps = {
  /**
   * 滚动高度达到此参数值时才显示组件
   */
  offset: { type: [String, Number], default: "200rpx" },
  /**
   * 距离页面右侧的距离
   */
  right: { type: [String, Number], default: "" },
  /**
   * 距离页面底部的距离
   */
  bottom: { type: [String, Number], default: "" },
  /**
   * 元素层级
   */
  zIndex: { type: [String, Number], default: "1" },
  /**
   * 返回顶部过程中的过渡时间，单位ms
   */
  duration: { type: [String, Number], default: "200" },
  /**
   * 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * 圆角值
   */
  borderRadius: { type: [String, Number], default: "" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const backTopEmits = {
  click: (event: TouchEvent) => true,
}

export type BackTopEmits = typeof backTopEmits
export type BackTopProps = ExtractPropTypes<typeof backTopProps>
export type BackTopInstance = InstanceType<typeof BackTop>
