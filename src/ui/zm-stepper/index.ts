import Stepper from "./zm-stepper.vue"
import type { ExtractPropTypes } from "vue"

export const stepperProps = {
  /**
   * 当前分值
   */
  modelValue: { type: [Number, String], default: 0 },
  /**
   * 初始值
   */
  value: { type: [Number, String], default: 0 },
  /**
   * 最小值
   */
  min: { type: [Number, String], default: 0 },
  /**
   * 最大值
   */
  max: { type: [Number, String], default: Infinity },
  /**
   * 步长，每次点击时改变的值
   */
  step: { type: [Number, String], default: 1 },
  /**
   * 标识符
   */
  name: { type: [Number, String], default: "" },
  /**
   * 是否只能输入正整数
   */
  integer: { type: Boolean, default: false },
  /**
   * 是否禁用
   */
  disabled: { type: Boolean, default: false },
  /**
   * 是否禁用增加按钮
   */
  disablePlus: { type: Boolean, default: false },
  /**
   * 是否禁用减少按钮
   */
  disableMinus: { type: Boolean, default: false },
  /**
   * 是否禁止输入框
   */
  disabledInput: { type: Boolean, default: false },
  /**
   * 输入框宽度
   */
  inputWidth: { type: [Number, String], default: "48rpx" },
  /**
   * 按钮大小
   */
  buttonSize: { type: [Number, String], default: "40rpx" },
  /**
   * 按钮颜色
   */
  buttonColor: { type: String, default: "primary" },
  /**
   * 按钮文字大小
   */
  buttonTextSize: { type: String, default: "24rpx" },
  /**
   * 按钮文字颜色
   */
  buttonTextColor: { type: String, default: "#333333" },
  /**
   * 显示的小数位数
   */
  decimalLength: { type: [Number, String], default: "" },
  /**
   * 按钮和输入框之间的间距
   */
  gutter: { type: [String, Number], default: "8rpx" },
  /**
   * 是否显示增加按钮
   */
  showPlus: { type: Boolean, default: true },
  /**
   * 是否显示减少按钮
   */
  showMinus: { type: Boolean, default: true },
  /**
   * 是否允许长按进行加减
   */
  longPress: { type: Boolean, default: true },
  /**
   * 输入值变化前的回调函数，返回 false 可阻止输入，支持返回 Promise
   */
  beforeChange: { type: Function },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const stepperEmits = {
  blur: (value: number) => true,
  focus: (value: number) => true,
  plus: (value: number) => true,
  minus: (value: number) => true,
  overlimit: (type: string) => true,
  change: (value: number | string, name: number | string) => true,
  "update:modelValue": (value: number | string) => true,
}

export type StepperEmits = typeof stepperEmits
export type StepperProps = ExtractPropTypes<typeof stepperProps>
export type StepperInstance = InstanceType<typeof Stepper>
