import Transition from "./zm-transition.vue"
import { isBoolean } from "../utils/check"

export const transitionEmits = {
  "update:show": (show: boolean) => isBoolean(show),
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  click: () => true,
}

export type TransitionEmits = typeof transitionEmits
export type TransitionExpose = {
  name: "zm-transition"
  open: () => void
  close: () => void
  step: () => void
}
export type TransitionInstance = InstanceType<typeof Transition>
