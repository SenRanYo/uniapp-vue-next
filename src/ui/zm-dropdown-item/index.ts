import DropdownItem from "./zm-dropdown-item.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const dropdownItemKey = Symbol("zm-dropdown-item")
export const dropdownItemProps = {
  /**
   * @description 绑定值
   */
  modelValue: { type: [String, Number, Array], default: "" },
  /**
   * @description 菜单模式，可选值 single 单选模式 multiple 多选模式 switch 切换模式
   */
  mode: { type: String, default: "single", validator: (v: string) => ["single", "multiple", "switch"].includes(v) },
  /**
   * @description 菜单项标题
   */
  title: { type: [String, Number], default: "" },
  /**
   * @description 配置项数据
   */
  options: { type: Array as PropType<DropdownItemOption[]>, default: () => [] },
  /**
   * @description 是否禁用
   */
  disabled: { type: Boolean, default: false },
  /**
   * @description 菜单高度
   */
  height: { type: [String, Number], default: "auto" },
  /**
   * @description 菜单最大高度
   */
  maxHeight: { type: [String, Number], default: "auto" },
  /**
   * @description 标题颜色
   */
  titleColor: { type: String, default: "" },
  /**
   * @description 标题大小
   */
  titleSize: { type: [Number, String], default: "" },
  /**
   * @description 标题粗细
   */
  titleWeight: { type: [Number, String], default: "" },
  /**
   * @description 激活标题颜色
   */
  activeTitleColor: { type: String, default: "" },
  /**
   * @description 图标
   */
  icon: { type: String, default: "sharp-down" },
  /**
   * @description 图标大小
   */
  iconSize: { type: [Number, String], default: "" },
  /**
   * @description 图标颜色
   */
  iconColor: { type: String, default: "#e3e5e6" },
  /**
   * @description 图标粗细
   */
  iconWeight: { type: [Number, String], default: "" },
  /**
   * @description 是否显示图标
   */
  showIcon: { type: Boolean, default: true },
  /**
   * @description 是否显示遮罩层
   */
  overlay: { type: Boolean, default: true },
  /**
   * @description 动画时长，单位毫秒
   */
  duration: { type: [Number, String], default: "200" },
  /**
   * @description 菜单展开方向，可选值up、down
   */
  direction: { type: String, default: "down", validator: (v: string) => ["up", "down"].includes(v) },
  /**
   * @description 选项菜单背景颜色
   */
  background: { type: String, default: "" },
  /**
   * @description 选项菜单圆角值
   */
  borderRadius: { type: [Number, String], default: "" },
  /**
   * @description 选项文字大小
   */
  optionSize: { type: [String, Number], default: "" },
  /**
   * @description 选项文字颜色
   */
  optionColor: { type: [String, Number], default: "" },
  /**
   * @description 选项文字粗细
   */
  optionWeight: { type: [String, Number], default: "" },
  /**
   * @description 激活选项文字颜色
   */
  activeOptionColor: { type: [String, Number], default: "" },
  /**
   * @description option 图标字段
   */
  iconField: { type: String, default: "icon" },
  /**
   * @description option 名称字段
   */
  labelField: { type: String, default: "label" },
  /**
   * @description option 内容字段
   */
  valueField: { type: String, default: "value" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
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
  icon?: string
  label: string | number
  value: string | number
}
export type DropdownItemValue = string | number | any[]
export type DropdownItemEmits = typeof dropdownItemEmits
export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>
export type DropdownItemInstance = InstanceType<typeof DropdownItem>
