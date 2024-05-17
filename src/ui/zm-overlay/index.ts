import Overlay from "./zm-overlay.vue"
import { isBoolean } from "../utils/check"

export const overlayEmits = {
  "update:show": (show: boolean) => isBoolean(show),
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  click: (event: MouseEvent) => true,
}

export type OverlayEmits = typeof overlayEmits
export type OverlayExpose = {
  name: "zm-overlay"
  open: () => void
  close: () => void
}
export type OverlayInstance = InstanceType<typeof Overlay>
