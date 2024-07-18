import DropdownMenu from "./zm-dropdown-menu.vue"
import type { ExtractPropTypes } from "vue"

export const dropdownMenuKey = Symbol("zm-dropdown-menu")
export const dropdownMenuProps = {
  /**
   * 菜单高度
   */
  height: { type: [Number, String], default: "" },
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
  showIcon: { type: Boolean, default: true },
  /**
   * 元素层级
   */
  zIndex: { type: [Number, String], default: "" },
  /**
   * 是否显示遮罩层
   */
  overlay: { type: Boolean, default: true },
  /**
   * 动画时长，单位毫秒
   */
  duration: { type: [Number, String], default: "200" },
  /**
   * 菜单展开方向，可选值up、down
   */
  direction: { type: String, default: "down", validator: (v: string) => ["up", "down"].includes(v) },
  /**
   * 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * 是否在点击遮罩层后关闭菜单
   */
  closeOnClickOverlay: { type: Boolean, default: true },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const dropdownMenuEmits = {}

export type DropdownMenuEmits = typeof dropdownMenuEmits
export type DropdownMenuProps = ExtractPropTypes<typeof dropdownMenuProps>
export type DropdownMenuInstance = InstanceType<typeof DropdownMenu>
