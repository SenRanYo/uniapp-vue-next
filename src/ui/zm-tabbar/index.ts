import Tabbar from "./zm-tabbar.vue"
import { isString, isNumber } from "../utils/check"

export const tabbarEmits = {
  "update:modelValue": (value: string | number) => isString(value) || isNumber(value),
  change: (name: string | number) => isString(name) || isNumber(name),
}

export type TabbarEmits = typeof tabbarEmits
export type TabbarExpose = {}
export type TabbarInstance = InstanceType<typeof Tabbar>
