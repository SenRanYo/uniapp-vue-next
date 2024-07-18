import Checkbox from "./zm-checkbox.vue"
import { isBoolean } from "../utils/check"
import type { ExtractPropTypes } from "vue"

export const checkboxProps = {
  /**
   * 绑定值
   */
  modelValue: { type: Boolean, default: false },
  /**
   * 标识符，通常为一个唯一的字符串或数字
   */
  name: { type: [Number, String], required: true, default: "" },
  /**
   * 标签文本内容
   */
  label: { type: [Number, String], default: "" },
  /**
   * 是否与复选框组绑定
   */
  bindGroup: { type: Boolean, default: true },
  /**
   * 是否禁用
   */
  disabled: { type: Boolean, default: false },
  /**
   * 图标名称
   */
  icon: { type: String, default: "check" },
  /**
   * 圆形的
   */
  round: { type: Boolean, default: false },
  /**
   * 选中的颜色
   */
  checkedColor: { type: String, default: "" },
  /**
   * 图标大小
   */
  iconSize: { type: [Number, String], default: "" },
  /**
   * 图标颜色
   */
  iconColor: { type: String, default: "#c8c9cc" },
  /**
   * 图标粗细
   */
  iconWeight: { type: [Number, String], default: "" },
  /**
   * 图标前缀
   */
  iconPrefix: { type: String, default: "zm-icon" },
  /**
   * 图标圆角值
   */
  iconRadius: { type: [Number, String], default: "" },
  /**
   * 标签文本大小
   */
  labelSize: { type: [Number, String], default: "" },
  /**
   * 标签文本颜色
   */
  labelColor: { type: String, default: "" },
  /**
   * 标签文本粗细
   */
  labelWeight: { type: [Number, String], default: "" },
  /**
   * 标签文本与图标的间距
   */
  labelGap: { type: [String, Number], default: "" },
  /**
   * 标签文本是否在图标左侧
   */
  labelLeft: { type: Boolean, default: false },
  /**
   * 是否禁用标签文本点击
   */
  labelDisabled: { type: Boolean },
  /**
   * 选中时的图标颜色
   */
  checkedIconColor: { type: String, default: "" },
  /**
   * 选中时的标签文本颜色
   */
  checkedLabelColor: { type: String, default: "" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const checkboxEmits = {
  click: (evnet: TouchEvent) => true,
  change: (value: CheckboxValueType) => true,
  "update:modelValue": (value: CheckboxValueType) => true,
}

export type CheckboxValueType = string | number | boolean
export type CheckboxEmits = typeof checkboxEmits
export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxExpose = { name: "zm-checkbox" }
export type CheckboxInstance = InstanceType<typeof Checkbox>
