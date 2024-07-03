import Rate from "./zm-rate.vue"
import type { ExtractPropTypes } from "vue"

export const rateProps = {
  /**
   * @description 当前分值
   */
  modelValue: { type: Number, default: 0 },
  /**
   * @description 图标选中时的名称
   */
  icon: { type: String, default: "star" },
  /**
   * @description 图标未选中时的名称
   */
  voidIcon: { type: String, default: "star-o" },
  /**
   * @description 最多可选数量
   */
  count: { type: Number, default: 5 },
  /**
   * @description 图标大小
   */
  size: { type: [String, Number], default: "" },
  /**
   * @description 图标选中时的颜色
   */
  color: { type: String, default: "primary" },
  /**
   * @description 图标未选中时的颜色
   */
  voidColor: { type: String, default: "#c8c9cc" },
  /**
   * @description 图标间距
   */
  gutter: { type: [String, Number], default: "8rpx" },
  /**
   * @description 是否为只读
   */
  readonly: { type: Boolean, default: false },
  /**
   * @description 是否可以通过滑动手势选择评分
   */
  touchable: { type: Boolean, default: true },
  /**
   * @description 是否禁用
   */
  disabled: { type: Boolean, default: false },
  /**
   * @description 图标禁用时的颜色
   */
  disabledColor: { type: String, default: "#c8c9cc" },
  /**
   * @description 是否允许半星选择
   */
  allowHalf: { type: Boolean, default: false },
  /**
   * @description 图标粗细
   */
  iconWeight: { type: [String, Number], default: "" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const rateEmits = {
  change: (value: number) => true,
  "update:modelValue": (value: number) => true,
}

export type RateEmits = typeof rateEmits
export type RateProps = ExtractPropTypes<typeof rateProps>
export type RateInstance = InstanceType<typeof Rate>
