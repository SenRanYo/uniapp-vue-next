import Search from "./zm-search.vue"
import type { ExtractPropTypes, PropType } from "vue"
import { InputOnBlurEvent, InputOnFocusEvent } from "@uni-helper/uni-app-types/index"

export const searchProps = {
  /**
   * @description 绑定值
   */
  modelValue: { type: String, default: "" },
  /**
   * @description 搜索框形状
   */
  shape: { type: String as PropType<SearchShape>, default: "square", validator: (v: string) => ["round", "square"].includes(v) },
  /**
   * @description 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * @description 占位文字
   */
  placeholder: { type: String, default: "请输入搜索关键词" },
  /**
   * @description 是否启用输入框
   */
  disabled: { type: Boolean, default: false },
  /**
   * @description 是否启用清除控件
   */
  clearabled: { type: Boolean, default: true },
  /**
   * @description 输入框最大能输入的长度
   */
  maxlength: { type: Number, default: -1 },
  /**
   * @description 输入框高度
   */
  height: { type: [String, Number], default: "68rpx" },
  /**
   * @description 外边距
   */
  margin: { type: [String, Number], default: "" },
  /**
   * @description 颜色
   */
  color: { type: String, default: "" },
  /**
   * @description 是否自动获得焦点
   */
  focus: { type: Boolean, default: false },
  /**
   * @description 边框
   */
  border: { type: String, default: "" },
  /**
   * @description 圆角值
   */
  radius: { type: [String, Number], default: "8rpx" },
  /**
   * @description 搜索框字体大小
   */
  fontSize: { type: [String, Number], default: "" },
  /**
   * @description 搜索图标
   */
  icon: { type: String, default: "search" },
  /**
   * @description 搜索图标大小
   */
  iconSize: { type: [String, Number], default: "28rpx" },
  /**
   * @description 搜索图标颜色
   */
  iconColor: { type: String, default: "" },
  /**
   * @description 搜索图标大小
   */
  iconWeight: { type: String, default: "" },
  /**
   * @description 是否显示右侧控件(右侧的"搜索"按钮)
   */
  action: { type: Boolean, default: true },
  /**
   * @description 右侧控件文字
   */
  actionText: { type: String, default: "搜索" },
  /**
   * @description 右侧控件文字大小
   */
  actionSize: { type: [String, Number], default: "" },
  /**
   * @description 右侧控件文字颜色
   */
  actionColor: { type: String, default: "#333" },
  /**
   * @description 右侧控件文字大小
   */
  actionWeight: { type: String, default: "" },
  /**
   * @description 输入框内容水平对齐方式
   */
  inputAlign: { type: String, default: "left", validator: (v: string) => ["left", "center", "right"].includes(v) },
  /**
   * @description 自定义输入框样式，对象形式
   */
  inputStyle: { type: [String, Object], default: "" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const searchEmits = {
  blur: (event: InputOnBlurEvent) => true,
  focus: (event: InputOnFocusEvent) => true,
  click: (event: TouchEvent) => true,
  cancel: () => true,
  clear: (event: TouchEvent) => true,
  action: (event: TouchEvent) => true,
  search: (value: string) => true,
  change: (value: string) => true,
  "update:modelValue": (value: string) => true,
}

export const searchInputAlign = ["left", "center", "right"]

export type SearchShape = "round" | "square"
export type SearchInputAlign = "left" | "center" | "right"
export type SearchEmits = typeof searchEmits
export type SearchProps = ExtractPropTypes<typeof searchProps>
export type SearchInstance = InstanceType<typeof Search>
