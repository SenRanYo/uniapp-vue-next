import SafeAreaBottom from "./zm-safe-area-bottom.vue"
import { isNumber } from "../utils/check"

export const safeAreaBottomProps = {
  /**
   * @description 背景色
   */
  background: { type: String, default: "" },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}
export const safeAreaBottomEmits = {
  height: (htight: number) => isNumber(htight),
}

export type SafeAreaBottomEmits = typeof safeAreaBottomEmits
export type SafeAreaBottomExpose = {
  name: "zm-safe-area-bottom"
}
export type SafeAreaBottomInstance = InstanceType<typeof SafeAreaBottom>
