import SafeAreaBottom from "./zm-safe-area-bottom.vue"
import { isNumber } from "../utils/check"

export const safeAreaBottomEmits = {
  height: (htight: number) => isNumber(htight),
}

export type SafeAreaBottomEmits = typeof safeAreaBottomEmits
export type SafeAreaBottomExpose = {
  name: "zm-safe-area-bottom"
}
export type SafeAreaBottomInstance = InstanceType<typeof SafeAreaBottom>
