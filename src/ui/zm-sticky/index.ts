import Sticky from "./zm-sticky.vue"
import { isBoolean } from "../utils/check"

export const stickyEmits = {
  change: (sticky: boolean) => isBoolean(sticky),
}

export type StickyEmits = typeof stickyEmits
export type StickyExpose = {
  name: "zm-sticky"
  resize: () => void
}
export type StickyInstance = InstanceType<typeof Sticky>
