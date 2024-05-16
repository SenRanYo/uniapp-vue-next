import Qrcode from "./zm-qrcode.vue"

export const qrcodeEmits = {
  success: (res: string) => true,
  error: (err: any) => true,
}

export type QrcodeEmits = typeof qrcodeEmits
export type QrcodeExpose = {
  name: "zm-qrcode"
  makeCode: () => true
  saveCode: () => true
}
export type QrcodeInstance = InstanceType<typeof Qrcode>
