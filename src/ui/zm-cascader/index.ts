import Cascader from "./zm-cascader.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const cascaderProps = {
  /**
   * 绑定值
   */
  modelValue: { type: [String, Number], default: () => "" },
  /**
   * 顶部标题
   */
  title: { type: String, default: "" },
  /**
   * 可选项数据源
   */
  options: { type: Array as PropType<CascaderOption[]>, default: [] },
  /**
   * 未选中时的提示文案
   */
  placeholder: { type: String, default: "请选择" },
  /**
   * 选项文字颜色
   */
  color: { type: String, default: "#323233" },
  /**
   * 选中选项文字颜色
   */
  activeColor: { type: String, default: "primary" },
  /**
   * 是否开启手势左右滑动切换
   */
  swipeable: { type: Boolean, default: true },
  /**
   * 是否显示关闭图标
   */
  closeable: { type: Boolean, default: true },
  /**
   * 是否展示头部栏
   */
  showHeader: { type: Boolean, default: true },
  /**
   * 标题大小
   */
  titleSize: { type: [String, Number], default: "" },
  /**
   * 标题大小
   */
  titleColor: { type: String, default: "" },
  /**
   * 标题大小
   */
  titleWeight: { type: [String, Number], default: "" },
  /**
   * 关闭图标名称或图片链接，等同于 Icon 组件的 name 属性
   */
  closeIcon: { type: String, default: "cross" },
  /**
   * 关闭图标大小
   */
  closeIconSize: { type: [String, Number], default: "32rpx" },
  /**
   * 关闭图标颜色
   */
  closeIconColor: { type: String, default: "#333333" },
  /**
   * 关闭图标粗细
   */
  closeIconWeight: { type: [String, Number], default: "" },
  /**
   * 关闭图标粗细
   */
  fieldKeys: { type: Object as PropType<CascaderFieldKeys>, default: () => ({ text: "text", value: "value", children: "children", disabled: "disabled" }) },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const cascaderEmits = {
  close: (evnet: TouchEvent) => true,
  change: (data: { value: string | number; selectedOptions: CascaderOption[]; index: number }) => true,
  finish: (data: { value: string | number; selectedOptions: CascaderOption[]; index: number }) => true,
  "click-tab": (data: { index: number }) => true,
  "update:modelValue": (value: string | number) => true,
}

export type CascaderTab = {
  options: CascaderOption[]
  selected: CascaderOption | null
}
export type CascaderOption = {
  text: string
  value: string | number
  color?: string
  children?: CascaderOption[]
  disabled?: boolean
  customClass?: string
  customStyle?: string | Record<string, string>
}
export type CascaderFieldKeys = { text: string; value: string; children: string; disabled: string }
export type CascaderNameType = string | number
export type CascaderEmits = typeof cascaderEmits
export type CascaderProps = ExtractPropTypes<typeof cascaderProps>
export type CascaderInstance = InstanceType<typeof Cascader>
