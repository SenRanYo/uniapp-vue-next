import DropdownItem from "./zm-dropdown-item.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const dropdownItemKey = Symbol("zm-dropdown-item")
export const dropdownItemProps = {
  /**
   * 绑定值
   */
  modelValue: { type: [String, Number, Array], default: "" },
  /**
   * 菜单模式，可选值 single 单选模式 multiple 多选模式
   */
  mode: { type: String, default: "single", validator: (v: string) => ["single", "multiple"].includes(v) },
  /**
   * 菜单项标题
   */
  title: { type: [String, Number], default: "" },
  /**
   * 配置项数据
   */
  options: { type: Array as PropType<DropdownItemOption[]>, default: () => [] },
  /**
   * 是否禁用
   */
  disabled: { type: Boolean, default: false },
  /**
   * 菜单最小高度
   */
  minHeight: { type: [String, Number], default: "auto" },
  /**
   * 菜单最大高度
   */
  maxHeight: { type: [String, Number], default: "60vh" },
  /**
   * 标题颜色
   */
  titleColor: { type: String, default: "" },
  /**
   * 标题大小
   */
  titleSize: { type: [Number, String], default: "" },
  /**
   * 标题粗细
   */
  titleWeight: { type: [Number, String], default: "" },
  /**
   * 激活标题颜色
   */
  activeTitleColor: { type: String, default: "" },
  /**
   * 图标
   */
  icon: { type: String, default: "arrow-down" },
  /**
   * 图标大小
   */
  iconSize: { type: [Number, String], default: "" },
  /**
   * 图标颜色
   */
  iconColor: { type: String, default: "" },
  /**
   * 图标粗细
   */
  iconWeight: { type: [Number, String], default: "" },
  /**
   * 激活图标颜色
   */
  activeIconColor: { type: String, default: "" },
  /**
   * 是否显示图标
   */
  showIcon: { type: [Boolean, null], default: null },
  /**
   * 是否显示遮罩层
   */
  overlay: { type: [Boolean, null], default: null },
  /**
   * 动画时长，单位毫秒
   */
  duration: { type: [Number, String, null], default: null },
  /**
   * 菜单展开方向，可选值up、down
   */
  direction: { type: String, default: "", validator: (v: string) => ["up", "down", ""].includes(v) },
  /**
   * 选项菜单背景颜色
   */
  background: { type: String, default: "" },
  /**
   * 选项菜单圆角值
   */
  borderRadius: { type: [Number, String], default: "" },
  /**
   * 选项文字图标大小
   */
  optionSize: { type: [String, Number], default: "" },
  /**
   * 选项文字图标颜色
   */
  optionColor: { type: String, default: "" },
  /**
   * 选项文字图标粗细
   */
  optionWeight: { type: [String, Number], default: "" },
  /**
   * 激活选项文字图标颜色
   */
  activeOptionColor: { type: String, default: "" },
  /**
   * option 名称字段
   */
  labelField: { type: String, default: "label" },
  /**
   * option 内容字段
   */
  valueField: { type: String, default: "value" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const dropdownItemEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  change: (value: DropdownItemValue) => true,
  "update:modelValue": (value: DropdownItemValue) => true,
}

export type DropdownItemOption = {
  label: string | number
  value: string | number
}
export type DropdownItemValue = string | number | any[]
export type DropdownItemEmits = typeof dropdownItemEmits
export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>
export type DropdownItemInstance = InstanceType<typeof DropdownItem>
