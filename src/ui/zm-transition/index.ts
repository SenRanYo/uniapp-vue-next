import Transition from "./zm-transition.vue"

export const transitionEmits = {
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
