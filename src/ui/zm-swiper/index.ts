import Swiper from "./zm-swiper.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const swiperProps = {
  /**
   * 当前所在滑块的 index
   */
  current: { type: Number, default: 0 },
  /**
   * 是否采用衔接滑动，即播放到末尾后重新回到开头
   */
  circular: { type: Boolean, default: false },
  /**
   * 自动切换时间间隔
   */
  interval: { type: Number, default: 3000 },
  /**
   * 滑动动画时长
   */
  duration: { type: Number, default: 500 },
  /**
   * 滑动方向是否为纵向
   */
  vertical: { type: Boolean, default: false },
  /**
   * 是否自动切换
   */
  autoplay: { type: Boolean, default: true },
  /**
   * 是否显示面板指示点
   */
  indicatorDots: { type: Boolean, default: false },
  /**
   * 指示点颜色
   */
  indicatorColor: { type: String, default: "rgba(0, 0, 0, .3)" },
  /**
   * 当前选中的指示点颜色
   */
  indicatorActiveColor: { type: String, default: "#000000" },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const swiperEmits = {
  click: (value: boolean) => true,
  change: (value: boolean) => true,
}

export type swiperProps = ExtractPropTypes<typeof swiperProps>
export type swiperInstance = InstanceType<typeof Swiper>
