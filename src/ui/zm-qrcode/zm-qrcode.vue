<template>
  <view class="zm-qrcode" :class="[props.customClass]" :style="[style]">
    <!-- #ifndef MP-ALIPAY -->
    <canvas class="zm-qrcode-canvas" :canvas-id="id" :style="{ width: size + 'px', height: size + 'px' }" />
    <!-- #endif -->
    <!-- #ifdef MP-ALIPAY -->
    <canvas :id="id" class="zm-qrcode-canvas" :width="size" :height="size" />
    <!-- #endif -->
    <text v-if="show && isError" class="zm-qrcode__fail" @click="makeCode">二维码生成失败,点击重试</text>
    <text v-else-if="show && isLoading" class="zm-qrcode__loading">{{ loadingText }}</text>
    <image v-else-if="show && isSuccess" :src="result" :style="{ width: size + 'px', height: size + 'px' }" />
  </view>
</template>

<script setup lang="ts">
import QRCode from "./qrcode"
import { uuid } from "../utils/utils"
import { qrcodeEmits } from "./index"
import { useStyle, useUnit, useUnitToPx } from "../utils/style"

defineOptions({ name: "zm-qrcode" })

const emits = defineEmits(qrcodeEmits)
const props = defineProps({
  show: { type: Boolean, default: true },
  size: { type: Number, default: 200 },
  value: { type: [String, null], default: "" },
  background: { type: String, default: "#ffffff" },
  foreground: { type: String, default: "#000000" },
  pdground: { type: String, default: "#000000" },
  icon: { type: String, default: "" },
  iconSize: { type: Number, default: 40 },
  lv: { type: Number, default: 3 },
  auto: { type: Boolean, default: true },
  loadingText: { type: String, default: "二维码生成中..." },
  customClass: { type: String, default: "" },
  customStyle: { type: [String, Object], default: "" },
})

const id = ref(uuid())
const result = ref()
const isError = ref(false)
const isSuccess = ref(false)
const isLoading = ref(false)
const instance = getCurrentInstance()

const size = computed(() => {
  return useUnitToPx(props.size)
})
const style = computed(() => {
  const style: any = {}
  style.width = useUnit(props.size)
  style.height = useUnit(props.size)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

watch(
  () => props,
  () => {
    if (props.auto && props.value) makeCode()
  },
  { deep: true, immediate: true },
)

async function makeCode() {
  isError.value = false
  isLoading.value = true
  await nextTick()
  setTimeout(() => {
    // @ts-ignore
    new QRCode({
      context: instance, // 上下文环境
      canvasId: id.value, // canvas-id
      usingComponents: true, // 是否是自定义组件
      showLoading: false, // 是否显示loading
      text: props.value, // 生成内容
      size: useUnitToPx(props.size), // 二维码大小
      background: props.background, // 背景色
      foreground: props.foreground, // 前景色
      pdground: props.pdground, // 定位角点颜色
      correctLevel: props.lv, // 容错级别
      image: props.icon, // 二维码图标
      imageSize: props.iconSize, // 二维码图标大小
      success: (res: any) => {
        result.value = res
        isSuccess.value = true
        emits("success", res)
      },
      fail: (err: any) => {
        isError.value = true
        emits("error", err)
      },
      complete: () => {
        isLoading.value = false
      },
    })
  }, 200)
}

function saveCode() {
  if (result.value) {
    uni.saveImageToPhotosAlbum({
      filePath: result.value,
      success: () => {
        uni.showToast({ title: "二维码保存成功", icon: "success", duration: 2000 })
      },
    })
  }
}

defineExpose({ name: "zm-qrcode", makeCode, saveCode })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-qrcode {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  .zm-qrcode-canvas {
    top: -99999rpx;
    left: -99999rpx;
    z-index: -99999;
    position: fixed !important;
  }

  &__fail {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
}
</style>
