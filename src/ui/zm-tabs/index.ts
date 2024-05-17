import Tabs from "./zm-tabs.vue"
import { isNumber, isString, isObject } from "../utils/check"

export const tabsProps = {
  /**
   * @description 绑定值
   */
  modelValue: { type: [String, Number], default: "" },
  /**
   * @description 列表数据
   */
  list: { type: Array, default: () => [] },
  /**
   * @description 高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * @description 是否吸顶
   */
  sticky: { type: Boolean, default: false },
  /**
   * @description 是否可以滚动
   */
  scrollable: { type: Boolean, default: false },
  /**
   * @description 激活文字大小
   */
  activeSize: { type: [String, Number], default: "" },
  /**
   * @description 激活文字颜色
   */
  activeColor: { type: String, default: "" },
  /**
   * @description 激活文字粗细
   */
  activeWeight: { type: [String, Number], default: "" },
  /**
   * @description 未激活文字大小
   */
  inactiveSize: { type: [String, Number], default: "" },
  /**
   * @description 未激活文字颜色
   */
  inactiveColor: { type: String, default: "" },
  /**
   * @description 未激活文字粗细
   */
  inactiveWeight: { type: [String, Number], default: "" },
  /**
   * @description 激活线条颜色
   */
  lineColor: { type: String, default: "" },
  /**
   * @description 激活线条宽度
   */
  lineWidth: { type: [String, Number], default: "" },
  /**
   * @description 激活线条高度
   */
  lineHeight: { type: [String, Number], default: "" },
  /**
   * @description 激活线条圆角
   */
  lineRadius: { type: [String, Number], default: "" },
  /**
   * @description 最大宽度
   */
  tabMaxWidth: { type: [String, Number], default: "" },
  /**
   * @description 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * @description 激活线条动画过渡时间
   */
  duration: { type: [String, Number], default: "" },
  /**
   * @description 吸顶时距离顶部距离
   */
  offsetTop: { type: [String, Number], default: "0" },
  /**
   * @description 是否显示底部边框线
   */
  borderBottom: { type: Boolean, default: false },
  /**
   * @description 元素层级
   */
  zIndex: { type: [String, Number], default: "" },
  /**
   * @description 文本属性字段
   */
  textKey: { type: String, default: "text" },
  /**
   * @description 内容属性字段
   */
  valueKey: { type: String, default: "value" },
  /**
   * @description 禁用属性字段
   */
  disabledKey: { type: String, default: "disabled" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const tabsEmits = {
  change: (tab: object) => isObject(tab),
  "update:modelValue": (value: string | number) => isNumber(value) || isString(value),
}

export type TabsEmits = typeof tabsProps
export type TabsExpose = {
  name: "zm-tabs"
  resize: () => void
}
export type TabsInstance = InstanceType<typeof Tabs>
