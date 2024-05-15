import View from "./zm-view.vue"
import { Mitt } from "../utils/mitt"

export const viewEmits = {
  scroll: (options: Page.PageScrollOption) => true,
  reachTop: () => true,
  reachBottom: () => true,
  touchstart: (event: TouchEvent) => true,
  touchend: (event: TouchEvent) => true,
  touchmove: (event: TouchEvent) => true,
}

export type ViewEmits = typeof viewEmits
export type ViewExpose = {
  name: "zm-view"
  mitt: Mitt
  scroll: (options: { scrollTop: number }) => void
  reachTop: () => void
  reachBottom: () => void
}
export type ViewInstance = InstanceType<typeof View>
