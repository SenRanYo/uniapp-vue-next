import SafeAreaTop from "./zm-safe-area-top.vue"
import { isNumber } from "../utils/check"

export const safeAreaTopProps = {
  /**
   * 背景色
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
export const safeAreaTopEmits = {
  height: (htight: number) => isNumber(htight),
}

export type SafeAreaTopEmits = typeof safeAreaTopEmits
export type SafeAreaTopExpose = {
  name: "zm-safe-area-top"
}
export type SafeAreaTopInstance = InstanceType<typeof SafeAreaTop>
