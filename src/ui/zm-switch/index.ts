import Switch from "./zm-switch.vue"
import type { ExtractPropTypes } from "vue"

export const switchProps = {
  /**
   * @description 开关选中状态
   */
  modelValue: { type: [Number, String, Boolean], default: false },
  /**
   * @description 开关按钮的尺寸
   */
  size: { type: [Number, String], default: "" },
  /**
   * @description 圆点与背景的间距
   */
  gutter: { type: [Number, String], default: "" },
  /**
   * @description 是否为加载状态
   */
  loading: { type: Boolean, default: false },
  /**
   * @description 是否为禁用状态
   */
  disabled: { type: Boolean, default: false },
  /**
   * @description 打开时对应的值
   */
  activeValue: { type: [Number, String, Boolean], default: true },
  /**
   * @description 关闭时对应的值
   */
  inactiveValue: { type: [Number, String, Boolean], default: false },
  /**
   * @description 打开时的背景色
   */
  activeColor: { type: String, default: "" },
  /**
   * @description 关闭时的背景色
   */
  inactiveColor: { type: String, default: "" },
  /**
   * @description 加载中图标大小
   */
  loadingIconSize: { type: [Number, String], default: "" },
  /**
   * @description 加载中图标颜色
   */
  loadingIconColor: { type: String, default: "" },
  /**
   * @description 状态变化前的回调函数
   */
  beforeChange: { type: Function },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const switchEmits = {
  change: (value: number | string | boolean) => true,
  "update:modelValue": (value: number | string | boolean) => true,
}

export type SwitchEmits = typeof switchEmits
export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchInstance = InstanceType<typeof Switch>
