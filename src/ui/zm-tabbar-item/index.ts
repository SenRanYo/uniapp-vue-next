import TabbarItem from "./zm-tabbar-item.vue"
import { isString, isNumber } from "../utils/check"

export const tabbarItemEmits = {}
export type TabbarItemEmits = typeof tabbarItemEmits
export type TabbarItemExpose = {
  name: "zm-tabbar-item"
}
export type TabbarItemInstance = InstanceType<typeof TabbarItem>
