import Form from "./zm-form.vue"
import type { ExtractPropTypes, PropType } from "vue"
import { FieldValidateError } from "../zm-field"

export const formKey = Symbol("zm-form")
export const formProps = {
  /**
   * 表单数据对象
   */
  model: { type: Object, default: () => ({}) },
  /**
   * 表单验证规则
   */
  rules: { type: Object as PropType<FormValidateRules>, default: () => ({}) },
  /**
   * 表单项 label 宽度
   */
  labelWidth: { type: [String, Number], default: "" },
  /**
   * 表单项 label 对齐方式，可选值为 left center right top
   */
  labelAlign: { type: String, default: "left", validator: (v: string) => ["left", "center", "right", "top"].includes(v) },
  /**
   * 输入框对齐方式，可选值为 left center right
   */
  inputAlign: { type: String, default: "left", validator: (v: string) => ["left", "center", "right"].includes(v) },
  /**
   * 错误提示文案对齐方式，可选值为 left center right
   */
  errorMessageAlign: { type: String, default: "left", validator: (v: string) => ["left", "center", "right"].includes(v) },
  /**
   * 表单校验触发时机，可选值为 blur change submit 支持通过数组同时设置多个值，具体用法见下方表格
   */
  validateTrigger: { type: [String, Array], default: "blur", validator: (v: string) => ["blur", "change", "submit"].includes(v) },
  /**
   * 是否在 label 后面添加冒号
   */
  colon: { type: Boolean, default: false },
  /**
   * 是否显示表单必填星号
   */
  required: { type: Boolean, default: false },
  /**
   * 是否禁用表单中的所有输入框
   */
  disabled: { type: Boolean, default: false },
  /**
   * 是否将表单中的所有输入框设置为只读状态
   */
  readonly: { type: Boolean, default: false },
  /**
   * 是否在某一项校验不通过时停止校验
   */
  validateFirst: { type: Boolean, default: false },
  /**
   * 是否在提交表单且校验不通过时滚动至错误的表单项
   */
  scrollToError: { type: Boolean, default: false },
  /**
   * 是否在校验不通过时标红输入框
   */
  showError: { type: Boolean, default: false },
  /**
   * 是否在校验不通过时在输入框下方展示错误提示
   */
  showErrorMessage: { type: Boolean, default: true },
  /**
   * 是否在按下回车键时提交表单
   */
  submitOnEnter: { type: Boolean, default: true },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const formEmits = {
  /**
   * 提交表单且验证不通过后触发
   */
  failed: (result: { values: Record<string, unknown>; errors: FieldValidateError[] }) => true,
  /**
   * 提交表单且验证通过后触发
   */
  submit: (values: Record<string, unknown>) => true,
}

export type FormValidateRule = {
  pattern?: RegExp
  trigger?: FormValidateTrigger | FormValidateTrigger[]
  message?: FormRuleMessage
  required?: boolean
  validator?: FormRuleValidator
  formatter?: FormRuleFormatter
  validateEmpty?: boolean
}
export type FormValidateRules = Record<string, FormValidateRule>[]
export type FormRuleMessage = string | ((value: any, rule: FormValidateRule) => string)
export type FormRuleFormatter = (value: any, rule: FormValidateRule) => string
export type FormRuleValidator = (value: any, rule: FormValidateRule) => boolean | string | Promise<boolean | string>
export type FormValidateError = { prop?: string; message: string }
export type FormValidateTrigger = "blur" | "change" | "submit"
export type FormValidationStatus = "passed" | "failed" | "unvalidated"
export type FormEmits = typeof formEmits
export type FormProps = ExtractPropTypes<typeof formProps>
export type FormExpose = {
  /**
   * 提交表单，与点击提交按钮的效果等价
   */
  submit: () => void
  /**
   * 获取所有表单项当前的值
   */
  getValues: () => Record<string, unknown>
  /**
   * 验证表单，支持传入一个或多个 name 来验证单个或部分表单项，不传入 name 时，会验证所有表单项
   */
  validate: (name?: string | string[]) => Promise<void>
  /**
   * 重置表单项的验证提示，支持传入一个或多个 name 来重置单个或部分表单项，不传入 name 时，会重置所有表单项
   */
  resetValidation: (name?: string | string[]) => void
  /**
   * 获取所有表单项的校验状态，状态包括 passed failed unvalidated
   */
  getValidationStatus: () => Record<string, unknown>
  /**
   * 滚动到对应表单项的位置，默认滚动到顶部，第二个参数传 false 可滚动至底部
   */
  scrollToField: (name: string, alignToTop: boolean) => void
}
export type FormInstance = InstanceType<typeof Form>
