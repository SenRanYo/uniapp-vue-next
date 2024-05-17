import Toast from "./zm-toast.vue"

export const toastProps = {}
export const toastEmits = {}

export type ToastEmits = typeof toastEmits
export type ToastExpose = {
  name: "zm-toast"
  show: () => void
  hide: () => void
}
export type ToastInstance = InstanceType<typeof Toast>
