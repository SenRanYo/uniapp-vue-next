import RadioGroup from "./zm-radio-group.vue"
import { isBoolean, isString } from "../utils/check"
import type { InjectionKey, ExtractPropTypes } from "vue"

export const radioGroupKey: InjectionKey<RadioGroupProvide> = Symbol("zm-radio-group")
export const radioGroupProps = {
  /**
   * @description 绑定值
   */
  modelValue: { type: [String, Number], default: () => "" },
  /**
   * @description 最大可选数量
   */
  max: { type: [Number, String], default: Infinity },
  /**
   * @description 复选框之间的间距
   */
  gap: { type: [Number, String], default: 0 },
  /**
   * @description 是否禁用
   */
  disabled: { type: Boolean, default: false },
  /**
   * @description 是否垂直布局
   */
  vertical: { type: Boolean, default: false },
  /**
   * @description 图标名称
   */
  icon: { type: String, default: "" },
  /**
   * @description 形状
   */
  shape: { type: String, default: "round", validator: (val: string) => ["round", "square", "dot"].includes(val) },
  /**
   * @description 选中的颜色
   */
  checkedColor: { type: String, default: "" },
  /**
   * @description 图标大小
   */
  iconSize: { type: [Number, String], default: "" },
  /**
   * @description 图标颜色
   */
  iconColor: { type: String, default: "" },
  /**
   * @description 图标粗细
   */
  iconWeight: { type: [Number, String], default: "" },
  /**
   * @description 图标圆角值
   */
  iconRadius: { type: [Number, String], default: "" },
  /**
   * @description 图标前缀
   */
  iconPrefix: { type: String, default: "zm-icon" },
  /**
   * @description 标签文本大小
   */
  labelSize: { type: [Number, String], default: "" },
  /**
   * @description 标签文本颜色
   */
  labelColor: { type: String, default: "" },
  /**
   * @description 标签文本粗细
   */
  labelWeight: { type: [Number, String], default: "" },
  /**
   * @description 标签与图标的间距
   */
  labelGap: { type: [String, Number], default: "" },
  /**
   * @description 标签是否在图标左侧
   */
  labelLeft: { type: Boolean, default: false },
  /**
   * @description 是否禁用标签点击
   */
  labelDisabled: { type: Boolean },
  /**
   * @description 选中的图标颜色
   */
  checkedIconColor: { type: String, default: "" },
  /**
   * @description 选中的标签颜色
   */
  checkedLabelColor: { type: String, default: "" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const radioGroupEmits = {
  click: (evnet: TouchEvent) => true,
  change: (value: string | number) => isBoolean(value) || isString(value),
  "update:modelValue": (value: string | number) => isBoolean(value) || isString(value),
}

export type RadioGroupValueType = string | number
export type RadioGroupChildrenType = { id: string; name: number | string; index: number }
export type RadioGroupEmits = typeof radioGroupEmits
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
export type RadioGroupProvide = { props: RadioGroupProps; updateValue: (value: unknown) => void }
export type RadioGroupInstance = InstanceType<typeof RadioGroup>
