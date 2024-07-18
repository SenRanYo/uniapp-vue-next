import Richtext from "./zm-richtext.vue"
import type { ExtractPropTypes } from "vue"

export const richtextKey = Symbol("zm-richtext")
export const richtextProps = {
  /**
   * 要显示的富文本字符串
   */
  content: { type: [String, null], default: "" },
  /**
   * 是否允许外部链接被点击时自动复制
   */
  copyLink: { type: Boolean, default: true },
  /**
   * 主域名，设置后将给链接自动拼接上主域名或协议名
   */
  domain: { type: String, default: "" },
  /**
   * 图片出错时的占位图链接
   */
  errorImg: { type: String, default: "" },
  /**
   * 是否开启图片懒加载，nvue不支持此属性
   */
  lazyLoad: { type: Boolean, default: false },
  /**
   * 图片加载完成前的占位图，详见 占位图
   */
  loadingImg: { type: String, default: "" },
  /**
   * 是否在播放一个视频时自动暂停其它视频
   */
  pauseVideo: { type: Boolean, default: true },
  /**
   * 是否开启图片被点击时自动预览
   */
  previewImg: { type: Boolean, default: true },
  /**
   * 是否自动给 table 添加一个滚动层（使表格可以单独横向滚动）
   */
  scrollTable: Boolean,
  /**
   * 是否开启长按复制内容
   */
  selectable: Boolean,
  /**
   * 是否自动将 title 标签的内容设置到页面标题
   */
  setTitle: { type: Boolean, default: true },
  /**
   * 是否开启图片被长按时显示菜单
   */
  showImgMenu: { type: Boolean, default: true },
  /**
   * 设置标签的默认样式
   */
  tagStyle: { type: Object, default: () => ({}) },
  /**
   * 是否使用页面内锚点
   */
  useAnchor: { type: Boolean, default: false },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const richtextEmits = {
  load: () => true,
  ready: (rect: any) => true,
  error: (error: any) => true,
  imgTap: (value: any) => true,
  linkTap: (value: any) => true,
}
export type RichtextEmits = typeof richtextEmits
export type RichtextProps = ExtractPropTypes<typeof richtextProps>
export type RichtextExpose = { name: "zm-richtext" }
export type RichtextInstance = InstanceType<typeof Richtext>
