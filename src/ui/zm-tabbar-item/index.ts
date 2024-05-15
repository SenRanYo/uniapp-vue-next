import TabbarItem from "./zm-tabbar-item.vue"
import { isString, isNumber } from "../utils/check"

export const tabbarItemEmits = {
  "update:modelValue": (value: string | number) => isString(value) || isNumber(value),
  change: (name: string | number) => isString(name) || isNumber(name),
}

export type TabbarItemEmits = typeof tabbarItemEmits
export type TabbarItemExpose = {}
export type TabbarItemInstance = InstanceType<typeof TabbarItem>
