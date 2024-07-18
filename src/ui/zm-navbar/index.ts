import Navbar from "./zm-navbar.vue"

export const navbarProps = {
  /**
   * 高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * 左右内边距
   */
  padding: { type: [String, Number], default: "20rpx" },
  /**
   * 返回按钮图标颜色
   */
  backIconColor: { type: String, default: "#333333" },
  /**
   * 返回按钮图标名称
   */
  backIconName: { type: String, default: "arrow-left" },
  /**
   * 返回按钮图标大小
   */
  backIconSize: { type: [String, Number], default: "44rpx" },
  /**
   * 返回按钮文字
   */
  backText: { type: String, default: "" },
  /**
   * 返回按钮文字颜色
   */
  backTextColor: { type: String, default: "#333333" },
  /**
   * 返回按钮文字大小
   */
  backTextSize: { type: String, default: "30rpx" },
  /**
   * 标题内容
   */
  title: { type: [String, null], default: "" },
  /**
   * 标题是否居中显示
   */
  titleCenter: { type: Boolean, default: true },
  /**
   * 标题文字大小
   */
  titleSize: { type: [String, Number], default: "32rpx" },
  /**
   * 标题宽度
   */
  titleWidth: { type: [String, Number], default: "300rpx" },
  /**
   * 标题文字颜色
   */
  titleColor: { type: String, default: "#333333" },
  /**
   * 标题文字粗细
   */
  titleWeight: { type: [String, Number], default: 700 },
  /**
   * 是否显示返回按钮
   */
  isBack: { type: [Boolean, String], default: true },
  /**
   * 是否显示渐变背景
   */
  gradient: { type: Boolean, default: false },
  /**
   * 渐变背景高度
   */
  gradientHeight: { type: [String, Number], default: "200px" },
  /**
   * 背景颜色
   */
  background: { type: String, default: "#ffffff" },
  /**
   * 是否固定在顶部
   */
  fixed: { type: Boolean, default: true },
  /**
   * 是否沉浸式模式
   */
  immersive: { type: Boolean, default: false },
  /**
   * 是否显示底部边框
   */
  borderBottom: { type: Boolean, default: false },
  /**
   * 元素层级
   */
  zIndex: { type: [String, Number], default: "" },
  /**
   * 自定义返回
   */
  customBack: { type: Function, default: () => {} },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const navbarEmits = {
  rect: (rect: UniApp.NodeInfo) => true,
  height: (height: number) => true,
  gradient: (scrollTop: number) => true,
}

export type NavbarEmits = typeof navbarEmits
export type NavbarExpose = {
  name: "zm-navbar"
}
export type NavbarInstance = InstanceType<typeof Navbar>
