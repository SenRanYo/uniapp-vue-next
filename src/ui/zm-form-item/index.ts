import FormItem from "./zm-form-item.vue"
import type { ExtractPropTypes } from "vue"
import { FieldValidateError } from "../zm-field"

export const formItemKey = Symbol("zm-form-item")
export const formItemProps = {
  /**
   * model的键名
   */
  prop: { type: String, default: "" },
  /**
   * 标签文本
   */
  label: { type: String, default: "" },
  /**
   * 错误文字
   */
  error: { type: String, default: "" },
  /**
   * 是否在 label 后面添加冒号
   */
  colon: { type: Boolean, default: false },
  /**
   * 是否为必填项，会显示标签文本右侧*号
   */
  required: { type: Boolean, default: false },
  /**
   * 标签文字大小
   */
  labelSize: { type: [String, Number], default: "" },
  /**
   * 标签文字颜色
   */
  labelColor: { type: String, default: "" },
  /**
   * 标签文字粗细
   */
  labelWeight: { type: [String, Number], default: "" },
  /**
   * 标签文字宽度
   */
  labelWidth: { type: [String, Number], default: "" },
  /**
   * 标签文字高度
   */
  labelHeight: { type: [String, Number], default: "" },
  /**
   * 标签文字行高
   */
  labelLineHeight: { type: [String, Number], default: "" },
  /**
   * 标签文字垂直对齐方式，可选值为 top center bottom
   */
  labelAlign: { type: String, default: "center", validator: (v: string) => ["top", "center", "bottom"].includes(v) },
  /**
   * 标签文字显示位置，可选值为 top left center right
   */
  labelPosition: { type: String, default: "left", validator: (v: string) => ["top", "left", "center", "right"].includes(v) },
  /**
   * 标签文字样式
   */
  labelStyle: { type: [String, Object], default: "" },
  /**
   * 错误文字大小
   */
  errorSize: { type: [String, Number], default: "" },
  /**
   * 错误文字颜色
   */
  errorColor: { type: String, default: "red" },
  /**
   * 错误文字粗细
   */
  errorWeight: { type: [String, Number], default: "" },
  /**
   * 错误文字显示位置，可选值为 left center right top
   */
  errorAlign: { type: String, default: "left", validator: (v: string) => ["left", "center", "right", "top"].includes(v) },
  /**
   * 是否显示错误文字
   */
  showError: { type: Boolean, default: true },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const formItemEmits = {
  /**
   * 提交表单且验证不通过后触发
   */
  failed: (result: { values: Record<string, unknown>; errors: FieldValidateError[] }) => true,
  /**
   * 提交表单且验证通过后触发
   */
  submit: (values: Record<string, unknown>) => true,
}

export type FormItemEmits = typeof formItemEmits
export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export type FormItemExpose = {
  /**
   * 验证表单，支持传入一个或多个 name 来验证单个或部分表单项，不传入 name 时，会验证所有表单项
   */
  validate: (name?: string | string[]) => Promise<void>
  /**
   * 对该表单项进行重置，将其值重置为初始值并移除校验结果
   */
  resetField: (name?: string | string[]) => void
  /**
   * 移除该表单项的校验结果
   */
  clearValidation: (name?: string | string[]) => void
  /**
   * 获取所有表单项的校验状态，状态包括 passed failed unvalidated
   */
  getValidationStatus: () => Record<string, unknown>
}
export type FormItemInstance = InstanceType<typeof FormItem>
