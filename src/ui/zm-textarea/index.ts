import Textarea from "./zm-textarea.vue"
import type { ExtractPropTypes, PropType } from "vue"
import { InputConfirmType, InputType } from "@uni-helper/uni-app-types/index"

export const textareaProps = {
  /**
   * @description 输入值
   */
  modelValue: { type: [String, Number], default: () => "" },
  /**
   * @description 是否禁用
   */
  disabled: { type: Boolean, default: false },
  /**
   * @description 是否显示清除按钮
   */
  clearable: { type: Boolean, default: true },
  /**
   * @description 最大输入长度，设置为 -1 的时候不限制最大长度
   */
  maxlength: { type: [String, Number], default: -1 },
  /**
   * @description 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * @description 输入框为空时的占位符
   */
  placeholder: { type: String, default: "请输入内容" },
  /**
   * @description 输入框为空时的占位符颜色
   */
  placeholderColor: { type: String, default: "" },
  /**
   * @description 输入框为空时的占位符样式
   */
  placeholderStyle: { type: [String, Object], default: "" },
  /**
   * @description 设置右下角按钮的文字，兼容性详见uni-app文档
   */
  confirmType: { type: String as PropType<InputConfirmType>, default: "done" },
  /**
   * @description 自动获取焦点，在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
   */
  focus: { type: Boolean, default: false },
  /**
   * @description 是否自动增加高度
   */
  autoHeight: { type: Boolean, default: false },
  /**
   * @description 是否忽略组件内对文本合成系统事件的处理。为 false 时将触发 compositionstart、compositionend、compositionupdate 事件，且在文本合成期间会触发 input 事件
   */
  ignoreCompositionEvent: { type: Boolean, default: true },
  /**
   * @description 指定focus时光标的位置
   */
  cursor: { type: [String, Number], default: -1 },
  /**
   * @description 输入框聚焦时底部与键盘的距离
   */
  cursorSpacing: { type: [String, Number], default: 30 },
  /**
   * @description 光标起始位置，自动聚集时有效，需与selection-end搭配使用
   */
  selectionStart: { type: [String, Number], default: -1 },
  /**
   * @description 光标结束位置，自动聚集时有效，需与selection-start搭配使用
   */
  selectionEnd: { type: [String, Number], default: -1 },
  /**
   * @description 键盘弹起时，是否自动上推页面
   */
  adjustPosition: { type: Boolean, default: true },
  /**
   * @description 是否显示键盘上方带有”完成“按钮那一栏
   */
  showConfirmBar: { type: Boolean, default: true },
  /**
   * @description focus时，点击页面的时候不收起键盘，只微信小程序有效
   */
  holdKeyboard: { type: Boolean, default: false },
  /**
   * @description 输入框字体颜色
   */
  color: { type: String, default: "" },
  /**
   * @description 输入框宽度
   */
  width: { type: [String, Number], default: "" },
  /**
   * @description 输入框高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * @description 输入框字体的大小
   */
  fontSize: { type: [String, Number], default: "" },
  /**
   * @description 输入框字体的粗细
   */
  fontWeight: { type: [String, Number], default: "" },
  /**
   * @description 输入框清除图标
   */
  clearIcon: { type: String, default: "cross" },
  /**
   * @description 输入框清除图标大小
   */
  clearIconSize: { type: [String, Number], default: "24rpx" },
  /**
   * @description 输入框清除图标颜色
   */
  clearIconColor: { type: String, default: "#fff" },
  /**
   * @description 输入框清除图标粗细
   */
  clearIconWeight: { type: [String, Number], default: "" },
  /**
   * @description 输入框清除图标背景色
   */
  clearIconBackground: { type: String, default: "" },
  /**
   * @description 边框样式
   */
  border: { type: String, default: "" },
  /**
   * @description 圆角值
   */
  borderRadius: { type: [String, Number], default: "" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const textareaEmits = {
  clear: () => true,
  focus: () => true,
  blur: (value: string) => true,
  confirm: (value: string) => true,
  keyboardheightchange: () => true,
  input: (value: string) => true,
  change: (value: string) => true,
  "update:modelValue": (value: string) => true,
}

export type TextareaEmits = typeof textareaEmits
export type TextareaProps = ExtractPropTypes<typeof textareaProps>
export type TextareaInstance = InstanceType<typeof Textarea>
