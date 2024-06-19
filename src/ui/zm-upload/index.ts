import Upload from "./zm-upload.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const uploadProps = {
  /**
   * @description 绑定值
   */
  modelValue: { type: [String, Array], default: "" },
  /**
   * @description 是否显示组件
   */
  show: { type: Boolean, default: true },
  /**
   * @description 宽度
   */
  width: { type: [String, Number], default: "160rpx" },
  /**
   * @description 高度
   */
  height: { type: [String, Number], default: "160rpx" },
  /**
   * @description 允许上传的文件类型, https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file
   */
  accept: { type: String, default: "" },
  /**
   * @description 图片或视频拾取模式，当accept为image类型时，设置capture为camera可以直接调起摄像头，默认值["album", "camera"]
   */
  capture: { type: Array as PropType<string[]>, default: () => ["album", "camera"] },
  /**
   * @description 当accept为video时生效，可选值为back或front
   */
  camera: { type: String as PropType<"back" | "front">, default: "" },
  /**
   * @description 是否点击预览
   */
  preview: { type: Boolean, default: false },
  /**
   * @description 是否多选
   */
  multiple: { type: Boolean, default: false },
  /**
   * @description 是否展示删除按钮
   */
  deletable: { type: Boolean, default: true },
  /**
   * @description 是否禁用
   */
  disabled: { type: Boolean, default: false },
  /**
   * @description 当accept为video时生效，是否压缩视频，默认为true
   */
  compressed: { type: Boolean, default: true },
  /**
   * @description 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * @description 选择单个文件的最大大小
   */
  maxSize: { type: Number, default: Infinity },
  /**
   * @description 文件上传数量限制
   */
  maxCount: { type: Number, default: Infinity },
  /**
   * @description 当accept为video时生效，拍摄视频最长拍摄时间，单位秒
   */
  maxDuration: { type: Number, default: 60 },
  /**
   * @description original 原图，compressed 压缩图，默认二者都有，H5无效
   */
  sizeType: { type: Array as PropType<string[]>, default: () => ["original", "compressed"] },
  /**
   * @description 预览上传图之间的间隔
   */
  previewGap: { type: [String, Number], default: "20rpx" },
  /**
   * @description 预览上传的图片时的裁剪模式，和image组件mode属性一致
   */
  previewMode: { type: String, default: "aspectFill" },
  /**
   * @description 预览区图标大小
   */
  previewIconSize: { type: [String, Number], default: "60rpx" },
  /**
   * @description 预览区图标颜色
   */
  previewIconColor: { type: [String, Number], default: "#cccccc" },
  /**
   * @description 预览区图标粗细
   */
  previewIconWeight: { type: [String, Number], default: "" },
  /**
   * @description 上传区域图标
   */
  icon: { type: String, default: "photograph" },
  /**
   * @description 上传区域图标大小
   */
  iconSize: { type: [String, Number], default: "56rpx" },
  /**
   * @description 上传区域图标颜色
   */
  iconColor: { type: String, default: "#cccccc" },
  /**
   * @description 上传区域图标粗细
   */
  iconWeight: { type: [String, Number], default: "" },
  /**
   * @description 文件删除前的回调函数
   */
  beforeRemove: { type: Function },
  /**
   * @description 文件读取完成后的回调函数
   */
  afterRead: { type: Function },
  /**
   * @description 文件读取前的回调函数
   */
  beforeRead: { type: Function },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const uploadEmits = {
  upload: (event: { files: any }) => true,
  delete: (event: { inex: number; file: any }) => true,
  "update:modelValue": (value: string) => true,
}

export type UploadFile = {
  file: File
  url: string
  name: string
  size: number
  type: string
  message?: string
  status?: "success" | "fail" | "uploading"
  [key: string]: any
}
export type UploadEmits = typeof uploadEmits
export type UploadProps = ExtractPropTypes<typeof uploadProps>
export type UploadInstance = InstanceType<typeof Upload>
