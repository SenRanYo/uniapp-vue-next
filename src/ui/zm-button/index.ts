import Button from "./zm-button.vue"
import type { PropType, ExtractPropTypes } from "vue"
import {
  ButtonLang,
  ButtonFormType,
  ButtonOpenType,
  ButtonOnErrorEvent,
  ButtonOnLaunchappEvent,
  ButtonOnOpensettingEvent,
  ButtonOnGetphonenumberEvent,
} from "@uni-helper/uni-app-types"

export const buttonProps = {
  /**
   * 按钮类型
   */
  type: { type: String, default: "primary", validator: (v: string) => ["primary", "success", "warning", "error", "default"].includes(v) },
  /**
   * 按钮大小
   */
  size: { type: String, default: "medium", validator: (v: string) => ["mini", "small", "normal", "medium", "large"].includes(v) },
  /**
   * 是否圆形的
   */
  round: { type: Boolean, default: false },
  /**
   * 是否文本按钮
   */
  text: { type: Boolean, default: false },
  /**
   * 是否镂空的
   */
  plain: { type: Boolean, default: false },
  /**
   * 是否块级的
   */
  block: { type: Boolean, default: false },
  /**
   * 按钮颜色
   */
  color: { type: String, default: "" },
  /**
   * 按钮宽度
   */
  width: { type: [Number, String], default: "" },
  /**
   * 按钮高度
   */
  height: { type: [Number, String], default: "" },
  /**
   * 是否禁用
   */
  disabled: { type: Boolean, default: false },
  /**
   * 是否加载中
   */
  loading: { type: Boolean, default: false },
  /**
   * 加载中文本
   */
  loadingText: { type: [Number, String, Boolean], default: "" },
  /**
   * 加载中图标大小
   */
  loadingIconSize: { type: [Number, String], default: "" },
  /**
   * 按钮文本大小
   */
  textSize: { type: [String, Number], default: "" },
  /**
   * 按钮文本颜色
   */
  textColor: { type: String, default: "" },
  /**
   * 按钮文本粗细
   */
  textWeight: { type: [String, Number], default: "" },
  /**
   * 按钮图标
   */
  icon: { type: String, default: "" },
  /**
   * 按钮图标大小
   */
  iconSize: { type: [String, Number], default: "" },
  /**
   * 按钮图标颜色
   */
  iconColor: { type: String, default: "" },
  /**
   * 按钮图标前缀
   */
  iconPrefix: { type: String, default: "uicon" },
  /**
   * 按钮图标粗细
   */
  iconWeight: { type: [String, Number], default: "" },
  /**
   * 按钮圆角大小
   */
  borderRadius: { type: [String, Number], default: "" },
  /**
   * 按钮边框宽度
   */
  borderWidth: { type: [String, Number], default: "" },
  /**
   * 按钮边框颜色
   */
  borderColor: { type: String, default: "" },
  /**
   * 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
   */
  formType: { type: String as PropType<ButtonFormType>, default: "submit" },
  /**
   * 开放能力
   */
  openType: { type: String as PropType<ButtonOpenType>, default: "" },
  /**
   * 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
   */
  appParameter: { type: String, default: "" },
  /**
   * 指定是否阻止本节点的祖先节点出现点击态
   */
  hoverStopPropagation: { type: Boolean, default: true },
  /**
   * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。
   */
  lang: { type: String as PropType<ButtonLang>, default: "zh_CN", validator: (v: string) => ["zh_CN", "zh_TW", "en"].includes(v) },
  /**
   * 会话来源，open-type="contact"时有效
   */
  sessionFrom: { type: String, default: "" },
  /**
   * 会话内消息卡片标题，open-type="contact"时有效
   */
  sendMessageTitle: { type: String, default: "" },
  /**
   * 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
   */
  sendMessagePath: { type: String, default: "" },
  /**
   * 会话内消息卡片图片，open-type="contact"时有效
   */
  sendMessageImg: { type: String, default: "" },
  /**
   * 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效
   */
  showMessageCard: { type: Boolean, default: false },
  /**
   * 节流，一定时间内只能触发一次，默认为 200
   */
  throttle: { type: [String, Number], default: 200 },
  /**
   * 按住后多久出现点击态，单位毫秒
   */
  hoverStartTime: { type: Number, default: 50 },
  /**
   * 手指松开后点击态保留时间，单位毫秒
   */
  hoverStayTime: { type: Number, default: 50 },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const buttonEmits = {
  click: (event: TouchEvent, next: { loading: (state: boolean, text: string) => void; disable: (state: boolean) => void }) => true,
  error: (event: ButtonOnErrorEvent) => true,
  launchapp: (event: ButtonOnLaunchappEvent) => true,
  getuserinfo: (event: any) => true,
  opensetting: (event: ButtonOnOpensettingEvent) => true,
  getphonenumber: (event: ButtonOnGetphonenumberEvent) => true,
}

export type ButtonEmits = typeof buttonEmits
export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonExpose = { name: "zm-button" }
export type ButtonInstance = InstanceType<typeof Button>
