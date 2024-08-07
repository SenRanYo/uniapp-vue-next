import Image from "./zm-image.vue"
import type { ExtractPropTypes } from "vue"
import { ImageMode, ImageOnLoadEvent, ImageOnErrorEvent } from "@uni-helper/uni-app-types"

export const imageProps = {
  /**
   * 图片资源地址
   */
  src: { type: String, default: "" },
  /**
   * 图片裁剪、缩放的模式
   */
  mode: { type: String as PropType<ImageMode>, default: "scaleToFill" },
  /**
   * 图片宽度
   */
  width: { type: [String, Number], default: "" },
  /**
   * 图片高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * 图片圆角
   */
  radius: { type: [String, Number], default: "" },
  /**
   * 是否显示为圆形
   */
  round: { type: Boolean, default: false },
  /**
   * 是否显示块级元素
   */
  block: { type: Boolean, default: false },
  /**
   * 图片懒加载。只针对page与scroll-view下的image有效
   */
  lazyLoad: { type: Boolean, default: true },
  /**
   * 图片显示动画效果
   */
  fadeShow: { type: Boolean, default: true },
  /**
   * 在系统不支持webp的情况下是否单独启用webp。默认false，只支持网络资源。webp支持详见下面说明
   */
  webp: { type: Boolean, default: false },
  /**
   * 失败时提示的图标名称或图片链接
   */
  errorIcon: { type: String, default: "photo-fail" },
  /**
   * 失败图标大小
   */
  errorIconSize: { type: [String, Number], default: "" },
  /**
   * 失败图标颜色
   */
  errorIconColor: { type: String, default: "#dcdee0" },
  /**
   * 失败图标粗细
   */
  errorIconWeight: { type: [String, Number], default: "" },
  /**
   * 加载时提示的图标名称或图片链接
   */
  loadingIcon: { type: String, default: "photo" },
  /**
   * 加载图标大小
   */
  loadingIconSize: { type: [String, Number], default: "" },
  /**
   * 加载图标颜色
   */
  loadingIconColor: { type: String, default: "#dcdee0" },
  /**
   * 加载图标粗细
   */
  loadingIconWeight: { type: [String, Number], default: "" },
  /**
   * 是否展示图片加载失败提示
   */
  showError: { type: Boolean, default: true },
  /**
   * 是否展示图片加载中提示
   */
  showLoading: { type: Boolean, default: true },
  /**
   * 开启长按图片显示识别小程序码菜单
   */
  showMenuByLongpress: { type: Boolean, default: false },
  /**
   * 是否能拖动图片
   */
  draggable: { type: Boolean, default: true },
  /**
   * 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const imageEmits = {
  click: (evnet: TouchEvent) => true,
  load: (evnet: ImageOnLoadEvent) => true,
  error: (evnet: ImageOnErrorEvent) => true,
}

export type ImageEmits = typeof imageEmits
export type ImageProps = ExtractPropTypes<typeof imageProps>
export type ImageInstance = InstanceType<typeof Image>
