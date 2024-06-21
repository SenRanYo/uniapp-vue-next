import SwiperItem from "./zm-swiper-item.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const swiperItemProps = {
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const swiperItemEmits = {
  "update:show": (value: boolean) => true,
}

export type SwiperItemProps = ExtractPropTypes<typeof swiperItemProps>
export type SwiperItemInstance = InstanceType<typeof SwiperItem>
