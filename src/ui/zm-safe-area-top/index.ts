import SafeAreaTop from "./zm-safe-area-top.vue"
import { isNumber } from "../utils/check"

export const safeAreaTopEmits = {
  height: (htight: number) => isNumber(htight),
}

export type SafeAreaTopEmits = typeof safeAreaTopEmits
export type SafeAreaTopExpose = {
  name: "zm-safe-area-top"
}
export type SafeAreaTopInstance = InstanceType<typeof SafeAreaTop>
