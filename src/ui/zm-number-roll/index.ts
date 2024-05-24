import NumberRoll from "./zm-number-roll.vue"

export const numberRollProps = {
  /**
   * @description 数据值
   */
  value: { type: [String, Number], default: 0 },
  /**
   * @description 字体颜色
   */
  color: { type: String, default: "" },
  /**
   * @description 字体大小
   */
  fontSize: { type: [String, Number], default: 24 },
  /**
   * @description 字体粗细
   */
  fontWeight: { type: String, default: "" },
  /**
   * @description 去除0
   */
  trimZero: { type: Boolean, default: true },
  /**
   * @description 千位分隔符
   */
  thousandsSep: { type: String, default: "" },
  /**
   * @description 小数位数
   */
  decimalPlaces: { type: Number, default: 2 },
  /**
   * @description 过渡时间
   */
  duration: { type: [String, Number], default: "" },
  /**
   * @description 动画函数
   */
  timingFunction: { type: String, default: "" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const numberRollEmits = {}

export type NumberRollEmits = typeof numberRollEmits
export type NumberRollExpose = {
  name: "zm-number-roll"
}
export type NumberRollInstance = InstanceType<typeof NumberRoll>
