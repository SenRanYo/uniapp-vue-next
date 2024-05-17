import Popup from "./zm-popup.vue"
import { isBoolean } from "../utils/check"

export const popupEmits = {
  "update:show": (show: boolean) => isBoolean(show),
  open: () => true,
  opened: () => true,
  close: (action: string) => true,
  closed: (action: string) => true,
  click: (evnet: MouseEvent) => true,
  "click-close": (evnet: MouseEvent) => true,
  "click-overlay": (evnet: MouseEvent) => true,
}

export type PopupEmits = typeof popupEmits
export type PopupExpose = {
  name: "zm-popup"
  open: () => void
  close: () => void
}
export type PopupInstance = InstanceType<typeof Popup>
