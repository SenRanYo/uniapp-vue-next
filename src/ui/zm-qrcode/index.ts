import Qrcode from "./zm-qrcode.vue"

export const qrcodeProps = {
  /**
   * 是否显示
   */
  show: { type: Boolean, default: true },
  /**
   * 二维码大小
   */
  size: { type: [Number, String], default: "200rpx" },
  /**
   * 二维码内容
   */
  value: { type: [String, Number], default: "" },
  /**
   * 背景色
   */
  background: { type: String, default: "#ffffff" },
  /**
   * 前景色
   */
  foreground: { type: String, default: "#000000" },
  /**
   * 定位角点颜色
   */
  pdground: { type: String, default: "#000000" },
  /**
   * 二维码图标
   */
  icon: { type: String, default: "" },
  /**
   * 二维码图标大小
   */
  iconSize: { type: [Number, String], default: "60rpx" },
  /**
   * 容错级别
   */
  lv: { type: Number, default: 3 },
  /**
   * 自动生成
   */
  auto: { type: Boolean, default: true },
  /**
   * 生成中文本
   */
  loadingText: { type: String, default: "二维码生成中..." },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const qrcodeEmits = {
  success: (res: string) => true,
  error: (err: any) => true,
}

export type QrcodeEmits = typeof qrcodeEmits
export type QrcodeExpose = {
  name: "zm-qrcode"
  makeCode: () => void
  saveCode: () => void
}

export type QrcodeInstance = InstanceType<typeof Qrcode>
