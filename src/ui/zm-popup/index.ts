import Popup from "./zm-popup.vue"

export const popupEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  click: (evnet: MouseEvent) => true,
  "click-close": (evnet: MouseEvent) => true,
  "click-overlay": (evnet: MouseEvent) => true,
}

export type PopupEmits = typeof popupEmits
export type PopupExpose = {
  name: "zm-popup"
}
export type PopupInstance = InstanceType<typeof Popup>
