import Field from "./zm-field.vue"
import type { ExtractPropTypes, PropType } from "vue"
import { InputConfirmType, TextareaOnLinechangeEvent } from "@uni-helper/uni-app-types/index"

export const fieldKey = Symbol("zm-form")
export const fieldProps = {
  /**
   * 当前输入的值
   */
  modelValue: { type: [String, Number], default: "" },
  /**
   * 输入框左侧文本
   */
  label: { type: String, default: "" },
  /**
   * 表单域字段名
   */
  prop: { type: String, default: "" },
  /**
   * 输入框类型
   */
  type: { type: String as PropType<FieldType>, default: "text" },
  /**
   * 最大输入长度，设置为 -1 的时候不限制最大长度
   */
  maxlength: { type: [String, Number], default: 2000 },
  /**
   * 是否禁用输入框
   */
  disabled: { type: Boolean, default: false },
  /**
   * 是否为只读状态，只读状态下无法输入内容
   */
  readonly: { type: Boolean, default: false },
  /**
   * 自动获取焦点，在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
   */
  focus: { type: Boolean, default: false },
  /**
   * 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
   */
  fixed: { type: Boolean, default: false },
  /**
   * 是否在 label 后面添加冒号
   */
  colon: { type: Boolean, default: false },
  /**
   * 表单校验规则
   */
  rules: { type: Array as PropType<FieldRule[]>, default: () => [] },
  /**
   * 是否显示表单必填星号
   */
  required: { type: Boolean, default: false },
  /**
   * 是否自适应内容高度，只对 textarea 有效，
   */
  autosize: { type: Boolean, default: false },
  /**
   * 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * 是否将输入内容标红
   */
  error: { type: Boolean, default: false },
  /**
   * 底部错误提示文案，为空时不展示
   */
  errorMessage: { type: String, default: "" },
  /**
   * 错误提示文案对齐方式，可选值为 left center right
   */
  errorMessageAlign: { type: String, default: "left", validator: (v: string) => ["left", "center", "right"].includes(v) },
  /**
   * 是否启用清除图标，点击清除图标后会清空输入框
   */
  clearable: { type: Boolean, default: false },
  /**
   * 清除图标名称
   */
  clearIcon: { type: String, default: "cross" },
  /**
   * 清除图标大小
   */
  clearIconSize: { type: [String, Number], default: "24rpx" },
  /**
   * 清除图标颜色
   */
  clearIconColor: { type: String, default: "#fff" },
  /**
   * 清除图标粗细
   */
  clearIconWeight: { type: [String, Number], default: "" },
  /**
   * 输入框前置图标
   */
  prefixIcon: { type: String, default: "" },
  /**
   * 输入框前置图标大小
   */
  prefixIconSize: { type: [String, Number], default: "" },
  /**
   * 输入框前置图标颜色
   */
  prefixIconColor: { type: String, default: "" },
  /**
   * 输入框前置图标粗细
   */
  prefixIconWeight: { type: [String, Number], default: "" },
  /**
   * 输入框后置图标
   */
  suffixIcon: { type: String, default: "" },
  /**
   * 输入框后置图标大小
   */
  suffixIconSize: { type: [String, Number], default: "" },
  /**
   * 输入框后置图标颜色
   */
  suffixIconColor: { type: String, default: "" },
  /**
   * 输入框后置图标粗细
   */
  suffixIconWeight: { type: [String, Number], default: "" },
  /**
   * 输入框为空时的占位符
   */
  placeholder: { type: String, default: "请输入内容" },
  /**
   * 输入框为空时的占位符颜色
   */
  placeholderColor: { type: String, default: "" },
  /**
   * 输入框为空时的占位符样式
   */
  placeholderStyle: { type: [String, Object], default: "" },
  /**
   * 表单项 label 宽度
   */
  labelWidth: { type: [String, Number], default: "" },
  /**
   * 表单项 label 字体大小
   */
  labelSize: { type: [String, Number], default: "" },
  /**
   * 表单项 label 字体颜色
   */
  labelColor: { type: String, default: "" },
  /**
   * 表单项 label 字体粗细
   */
  labelWeight: { type: [String, Number], default: "" },
  /**
   * 表单项 label 对齐方式，可选值为 left center right top
   */
  labelAlign: { type: String, default: "left", validator: (v: string) => ["left", "center", "right", "top"].includes(v) },
  /**
   * 输入框对齐方式，可选值为 left center right
   */
  inputAlign: { type: String, default: "left", validator: (v: string) => ["left", "center", "right"].includes(v) },
  /**
   * 设置右下角按钮的文字，兼容性详见uni-app文档
   */
  confirmType: { type: String as PropType<InputConfirmType>, default: "done" },
  /**
   * 是否忽略组件内对文本合成系统事件的处理。为 false 时将触发 compositionstart、compositionend、compositionupdate 事件，且在文本合成期间会触发 input 事件
   */
  ignoreCompositionEvent: { type: Boolean, default: true },
  /**
   * 指定focus时光标的位置
   */
  cursor: { type: [String, Number], default: -1 },
  /**
   * 输入框聚焦时底部与键盘的距离
   */
  cursorSpacing: { type: [String, Number], default: 30 },
  /**
   * 光标起始位置，自动聚集时有效，需与selection-end搭配使用
   */
  selectionStart: { type: [String, Number], default: -1 },
  /**
   * 光标结束位置，自动聚集时有效，需与selection-start搭配使用
   */
  selectionEnd: { type: [String, Number], default: -1 },
  /**
   * 键盘弹起时，是否自动上推页面
   */
  adjustPosition: { type: Boolean, default: true },
  /**
   * 是否显示键盘上方带有”完成“按钮那一栏
   */
  showConfirmBar: { type: Boolean, default: true },
  /**
   * 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效
   */
  autoBlur: { type: Boolean, default: false },
  /**
   * 点击键盘右下角按钮时是否保持键盘不收起，H5无效
   */
  confirmHold: { type: Boolean, default: false },
  /**
   * focus时，点击页面的时候不收起键盘，只微信小程序有效
   */
  holdKeyboard: { type: Boolean, default: false },
  /**
   * 输入框字体颜色
   */
  color: { type: String, default: "" },
  /**
   * 输入框宽度
   */
  width: { type: [String, Number], default: "" },
  /**
   * 输入框高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * 最小输入框高度
   */
  minHeight: { type: [String, Number], default: "" },
  /**
   * 输入框字体的大小
   */
  fontSize: { type: [String, Number], default: "" },
  /**
   * 输入框字体的粗细
   */
  fontWeight: { type: [String, Number], default: "" },
  /**
   * 边框样式
   */
  border: { type: String, default: "" },
  /**
   * 圆角值
   */
  borderRadius: { type: [String, Number], default: "" },
  /**
   * 是否显示字数统计
   */
  showCount: { type: Boolean, default: true },
  /**
   * 字数统计字体大小
   */
  countSize: { type: [String, Number], default: "" },
  /**
   * 字数统计字体颜色
   */
  countColor: { type: String, default: "" },
  /**
   * 字数统计字体粗细
   */
  countWeight: { type: [String, Number], default: "" },
  /**
   * 是否去掉 iOS 下的默认内边距
   */
  disableDefaultPadding: { type: Boolean, default: false },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const fieldEmits = {
  clear: () => true,
  focus: () => true,
  blur: (value: string) => true,
  confirm: (value: string) => true,
  keyboardheightchange: () => true,
  input: (value: string) => true,
  change: (value: string) => true,
  linechange: (event: TextareaOnLinechangeEvent) => true,
  startValidate: () => true,
  endValidate: (result: { status: FieldValidationStatus; message: string }) => true,
  "update:modelValue": (value: string) => true,
}

export type FieldRule = {
  pattern?: RegExp
  trigger?: FieldValidateTrigger | FieldValidateTrigger[]
  message?: FieldRuleMessage
  required?: boolean
  validator?: FieldRuleValidator
  formatter?: FieldRuleFormatter
  validateEmpty?: boolean
}
export type FieldType = "text" | "number" | "idcard" | "digit" | "tel" | "safe-password" | "nickname" | "password" | "textarea"
export type FieldRuleMessage = string | ((value: any, rule: FieldRule) => string)
export type FieldRuleFormatter = (value: any, rule: FieldRule) => string
export type FieldRuleValidator = (value: any, rule: FieldRule) => boolean | string | Promise<boolean | string>
export type FieldValidateError = { prop?: string; message: string }
export type FieldValidateTrigger = "onBlur" | "onChange" | "onSubmit"
export type FieldValidationStatus = "passed" | "failed" | "unvalidated"
export type FieldEmits = typeof fieldEmits
export type FieldProps = ExtractPropTypes<typeof fieldProps>
export type FieldExpose = {
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
export type FieldInstance = InstanceType<typeof Field>
