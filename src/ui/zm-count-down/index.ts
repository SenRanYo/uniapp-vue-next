import CountDown from "./zm-count-down.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const countDownProps = {
  /**
   * 倒计时时长，单位毫秒
   */
  time: { type: [Number, String], default: "" },
  /**
   * 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒
   */
  format: { type: String, default: "HH:mm:ss" },
  /**
   * 是否自动开始倒计时
   */
  autoStart: { type: Boolean, default: true },
  /**
   * 是否展示毫秒倒计时
   */
  millisecond: { type: Boolean, default: false },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const countDownEmits = {
  finish: () => true,
  change: (value: CountDownTimeData) => true,
}

export type CountDownTimeData = {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}
export type CountDownProps = ExtractPropTypes<typeof countDownProps>
export type CountDownExpose = { name: "zm-count-down" }
export type CountDownInstance = InstanceType<typeof CountDown>
