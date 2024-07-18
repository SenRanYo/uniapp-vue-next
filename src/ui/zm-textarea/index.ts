import Textarea from "./zm-textarea.vue"
import type { ExtractPropTypes, PropType } from "vue"
import { InputConfirmType, TextareaOnLinechangeEvent } from "@uni-helper/uni-app-types/index"

export const textareaProps = {
  /**
   * 输入值
   */
  modelValue: { type: [String, Number], default: () => "" },
  /**
   * 是否禁用
   */
  disabled: { type: Boolean, default: false },
  /**
   * 是否显示清除按钮
   */
  clearable: { type: Boolean, default: true },
  /**
   * 最大输入长度，设置为 -1 的时候不限制最大长度
   */
  maxlength: { type: [String, Number], default: 200 },
  /**
   * 背景颜色
   */
  background: { type: String, default: "" },
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
   * 设置右下角按钮的文字，兼容性详见uni-app文档
   */
  confirmType: { type: String as PropType<InputConfirmType>, default: "done" },
  /**
   * 点击键盘右下角按钮时是否保持键盘不收起，H5无效
   */
  confirmHold: { type: Boolean, default: false },
  /**
   * 是否显示键盘上方带有”完成“按钮那一栏
   */
  showConfirmBar: { type: Boolean, default: true },
  /**
   * 自动获取焦点，在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
   */
  focus: { type: Boolean, default: false },
  /**
   * 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
   */
  fixed: { type: Boolean, default: false },
  /**
   * 是否自动增加高度
   */
  autoHeight: { type: Boolean, default: false },
  /**
   * 输入对齐方式，可选值为 left center right
   */
  inputAlign: { type: String, default: "left", validator: (v: string) => ["left", "center", "right"].includes(v) },
  /**
   * 是否忽略组件内对文本合成系统事件的处理。为 false 时将触发 compositionstart、compositionend、compositionupdate 事件，且在文本合成期间会触发 input 事件
   */
  ignoreCompositionEvent: { type: Boolean, default: true },
  /**
   * 指定focus时光标的位置
   */
  cursor: { type: [String, Number], default: -1 },
  /**
   * 光标颜色
   */
  cursorColor: { type: String, default: "" },
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
   * 输入框清除图标
   */
  clearIcon: { type: String, default: "cross" },
  /**
   * 输入框清除图标大小
   */
  clearIconSize: { type: [String, Number], default: "24rpx" },
  /**
   * 输入框清除图标颜色
   */
  clearIconColor: { type: String, default: "#fff" },
  /**
   * 输入框清除图标粗细
   */
  clearIconWeight: { type: [String, Number], default: "" },
  /**
   * 输入框清除图标背景色
   */
  clearIconBackground: { type: String, default: "" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const textareaEmits = {
  clear: () => true,
  focus: () => true,
  blur: (value: string) => true,
  confirm: (value: string) => true,
  linechange: (event: TextareaOnLinechangeEvent) => true,
  keyboardheightchange: () => true,
  input: (value: string) => true,
  change: (value: string) => true,
  "update:modelValue": (value: string) => true,
}

export type TextareaEmits = typeof textareaEmits
export type TextareaProps = ExtractPropTypes<typeof textareaProps>
export type TextareaInstance = InstanceType<typeof Textarea>
