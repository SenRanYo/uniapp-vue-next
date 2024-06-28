import Progress from "./zm-progress.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const progressProps = {
  /**
   * @description 进度百分比
   */
  percentage: { type: [Number, String], default: 0 },
  /**
   * @description 进度条的颜色
   */
  color: { type: String, default: "" },
  /**
   * @description 进度条背景色
   */
  background: { type: String, default: "" },
  /**
   * @description 进度文本内容
   */
  text: { type: String, default: "" },
  /**
   * @description 是否显示进度文本内容
   */
  showText: { type: Boolean, default: true },
  /**
   * @description 进度文本颜色
   */
  textColor: { type: String, default: "" },
  /**
   * @description 进度文本大小
   */
  textSize: { type: [String, Number], default: "" },
  /**
   * @description 进度文本粗细
   */
  textWeight: { type: [String, Number], default: "" },
  /**
   * @description 进度条的高度
   */
  height: { type: [Number, String], default: "24rpx" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const progressEmits = {
  finish: () => true,
}

export type ProgressProps = ExtractPropTypes<typeof progressProps>
export type ProgressExpose = { name: "zm-progress" }
export type ProgressInstance = InstanceType<typeof Progress>
