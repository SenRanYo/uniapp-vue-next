<template>
  <view class="zm-upload" :class="[classs, customClass]" :style="[style]">
    <view class="zm-upload__preview" :style="[previewStyle(index)]" v-for="(item, index) in list" :key="index" @click="previewImage(item)">
      <view class="zm-upload__status" v-if="isShowStatus(item)">
        <zm-icon v-if="item.status === 'fail'" name="close" color="#fff"></zm-icon>
        <zm-loading v-if="item.status === 'uploading'" color="#fff"></zm-loading>
        <text class="zm-upload__status__message">{{ item.message }}</text>
      </view>
      <view class="zm-upload__delete" v-if="isShowDelete(item)" @click.stop="deleteFile(index)">
        <slot name="delete">
          <zm-icon custom-class="zm-upload__delete__icon" name="cross" color="#fff" size="20rpx"></zm-icon>
        </slot>
      </view>
      <zm-image v-if="isImage(item.name || item.url)" :src="item.url" :mode="imageMode"></zm-image>
      <zm-icon v-else-if="isDocument(item.name || item.url)" name="document" :size="previewIconSize" :color="previewIconColor" :weight="previewIconWeight"></zm-icon>
      <zm-icon v-else name="file" :size="previewIconSize" :color="previewIconColor" :weight="previewIconWeight"></zm-icon>
    </view>
    <view class="zm-upload__trigger" :hover-class="triggerHoverClass" :hover-stay-time="100" :style="[triggerStyle]" @click="triggerUpload">
      <slot name="icon">
        <zm-icon :name="icon" :size="iconSize" :color="iconColor" :weight="iconWeight"></zm-icon>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { uuid, clone } from "../utils/utils"
import { uploadEmits, uploadProps, UploadFile } from "./index"
import { useStyle, useUnit, useElRect, useElRects, useColor } from "../hooks"
import { isFunction, isArray, isString, isImage as isImageLink, isDocument as isDocumentLink } from "../utils/check"

defineOptions({ name: "zm-upload" })

const emits = defineEmits(uploadEmits)
const props = defineProps(uploadProps)

const list = ref([])
const triggerRect = ref<UniApp.NodeInfo>({})
const previewRects = ref<UniApp.NodeInfo[]>([])
const instance = getCurrentInstance()

const classs = computed(() => {
  const list = []
  if (props.disabled) list.push("zm-upload--disabled")
  return list
})

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const previewStyle = computed(() => {
  return (index: number) => {
    const style: any = {}
    const firstRect = previewRects.value[0]
    const currentRect = previewRects.value[index]
    style.width = useUnit(props.width)
    style.height = useUnit(props.width)
    style.background = useColor(props.background)
    style.marginRight = useUnit(props.previewGap)
    if (firstRect && currentRect && firstRect.top !== currentRect.top) {
      style.marginTop = useUnit(props.previewGap)
    }
    return useStyle(style)
  }
})

const triggerStyle = computed(() => {
  const style: any = {}
  const firstRect = previewRects.value[0]
  style.width = useUnit(props.width)
  style.height = useUnit(props.width)
  style.background = useColor(props.background)
  if (props.disabled) {
    style.opacity = 0.6
    style.cursor = "not-allowed"
  }
  if (firstRect && triggerRect && firstRect.top !== triggerRect.value.top) {
    style.marginTop = useUnit(props.previewGap)
  }
  return useStyle(style)
})

const triggerHoverClass = computed(() => {
  return props.disabled ? "" : "zm-upload__trigger--active"
})

const isShowStatus = computed(() => {
  return (item: UploadFile) => {
    return ["fail", "uploading"].includes(item.status)
  }
})

const isShowDelete = computed(() => {
  return (item: UploadFile) => {
    return item.status !== "uploading" && props.deletable && !props.disabled
  }
})

const isImage = computed(() => {
  return (url: string) => isImageLink(url)
})

const isDocument = computed(() => {
  return (url: string) => isDocumentLink(url)
})

watch(() => props.modelValue, formatModelValue, { deep: true, immediate: true })

// 触发上传
async function triggerUpload() {
  try {
    if (props.disabled) return
    const files = await handleChoose()
    files.forEach((file) => {
      const index = list.value.findIndex((item) => item.uuid === file.uuid)
      if (isFunction(props.maxSize)) {
        if (props.maxSize(file)) {
          emits("oversize", file)
        } else return
      } else if (file.size > +props.maxSize) {
        emits("oversize", file)
        return
      } else {
        list.value.push(file)
        beforeRead({ ...file, index })
      }
    })
    await nextTick()
    triggerRect.value = await useElRect(".zm-upload__trigger", instance)
    previewRects.value = await useElRects(".zm-upload__preview", instance)
  } catch (error) {}
}

// 读取之前
async function beforeRead(file: UploadFile) {
  const next = (file: UploadFile) => {
    list.value.forEach((item, index) => {
      if (file.uuid === item.uuid) {
        list.value.splice(index, 1, clone(file))
        afterRead(file)
      }
    })
  }
  if (isFunction(props.beforeRead)) {
    props.beforeRead(toRaw(file), next)
  } else {
    next(file)
  }
}

// 读取之后
async function afterRead(file: UploadFile) {
  if (isFunction(props.afterRead)) props.afterRead(file)
}

// 格式化绑定值列表
function formatModelValue() {
  if (isArray(props.modelValue)) {
    list.value = props.modelValue.map((url: string) => {
      return { url, status: "success", message: "" }
    })
  }
  if (isString(props.modelValue)) {
    list.value = props.modelValue.split(",").map((url: string) => {
      return { url, status: "success", message: "" }
    })
  }
}

// 处理选择文件
function handleChoose(): Promise<UploadFile[]> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: UploadFile[] = []
      switch (props.accept) {
        case "image":
          // #ifdef MP-WEIXIN
          result = await chooseMediaFile({ mediaType: ["image"] })
          // #endif
          // #ifndef MP-WEIXIN
          result = await chooseImageFile()
          // #endif
          resolve(result)
          break
        // #ifdef MP-WEIXIN
        case "media":
          resolve(await chooseMediaFile())
          break
        // #endif
        case "video":
          // #ifdef MP-WEIXIN
          result = await chooseMediaFile({ mediaType: ["video"] })
          // #endif
          // #ifndef MP-WEIXIN
          result = await chooseVideoFile()
          // #endif
          resolve(result)
          break
        // #ifdef MP-WEIXIN || H5
        case "file":
          // #ifdef MP-WEIXIN
          result = await chooseMessageFile()
          // #endif
          // #ifdef WEB
          result = await chooseFile()
          // #endif
          resolve(result)
          break
        // #endif
        default:
          // #ifdef MP-WEIXIN
          result = await chooseMessageFile()
          // #endif
          // #ifdef WEB
          result = await chooseFile()
          // #endif
          resolve(result)
          break
      }
    } catch (error) {
      reject(error)
    }
  })
}

// 预览图片
function previewImage(item: UploadFile) {
  if (isImageLink(item.name || item.url)) {
    uni.previewImage({ urls: [item.url] })
  }
}

// 选择文件
function chooseFile(): Promise<UploadFile[]> {
  return new Promise((resolve, reject) => {
    uni.chooseFile({
      count: props.multiple ? props.maxCount : 1,
      type: props.accept as any,
      success: (res: any) => {
        resolve(
          res.tempFiles.map((file: any) => {
            return { file: file, url: file.path, name: file.name, size: file.size, type: file.type, uuid: uuid(), status: "", message: "" }
          }),
        )
      },
      fail: reject,
    })
  })
}

// 选择图片文件
function chooseImageFile(): Promise<UploadFile[]> {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: props.multiple ? Math.min(props.maxCount, 9) : 1,
      sizeType: props.sizeType,
      sourceType: props.capture,
      success: (res: any) => {
        resolve(
          res.tempFiles.map((file: any) => {
            return { file: file, url: file.path, name: file.name, size: file.size, type: file.type, fileType: "image", thumb: file.path, uuid: uuid(), status: "", message: "" }
          }),
        )
      },
      fail: reject,
    })
  })
}

// 选择媒体文件(微信小程序)
function chooseMediaFile(params?: any): Promise<UploadFile[]> {
  return new Promise((resolve, reject) => {
    uni.chooseMedia({
      count: props.multiple ? Math.min(props.maxCount, 9) : 1,
      mediaType: params.mediaType || ["image", "video"],
      sourceType: props.capture as any,
      maxDuration: props.maxDuration,
      sizeType: props.sizeType,
      camera: props.camera,
      success: (res) => {
        resolve(
          res.tempFiles.map((item: any) => {
            return { ...item, url: item.tempFilePath, thumb: res.type === "video" ? item.thumbTempFilePath : item.tempFilePath, uuid: uuid(), status: "", message: "" }
          }),
        )
      },
      fail: reject,
    })
  })
}

// 选择微信聊天文件(微信小程序)
function chooseMessageFile(): Promise<UploadFile[]> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    wx.chooseMessageFile({
      count: props.multiple ? Math.min(props.maxCount, 100) : 1,
      type: props.accept,
      success: (res: any) => {
        resolve(
          res.tempFiles.map((item: any) => {
            return { ...item, url: item.path, uuid: uuid(), status: "", message: "" }
          }),
        )
      },
      fail: reject,
    })
  })
}

// 选择视频文件
function chooseVideoFile(): Promise<UploadFile[]> {
  return new Promise((resolve, reject) => {
    uni.chooseVideo({
      camera: props.camera,
      sourceType: props.capture as any,
      compressed: props.compressed,
      maxDuration: props.maxDuration,
      success: (res: any) => {
        resolve([
          {
            ...res,
            type: "video",
            url: res.tempFilePath,
            path: res.tempFilePath,
            thumb: res.thumbTempFilePath,
            uuid: uuid(),
            status: "",
            message: "",
            // #ifdef WEB
            file: res.tempFile,
            // #endif
          },
        ])
      },
      fail: reject,
    })
  })
}

// 删除文件
function deleteFile(index: number) {
  list.value.splice(index, 1)
}

defineExpose({ name: "zm-upload" })
</script>
<script lang="ts">
export default {
  name: "zm-upload",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-upload {
  display: flex;
  flex-wrap: wrap;

  &__preview {
    /* #ifdef WEB */
    cursor: pointer;
    /* #endif */
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: #f7f8fa;
  }

  &__status {
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: rgb(50 50 51 / 88%);

    &__message {
      color: #fff;
      margin-top: 12rpx;
    }
  }

  &__delete {
    top: 0;
    right: 0;
    z-index: 2;
    position: absolute;

    &__icon {
      width: 28rpx;
      height: 28rpx;
      display: flex;
      padding-left: 4rpx;
      padding-bottom: 4rpx;
      align-items: center;
      justify-content: center;
      border-radius: 0 0 0 24rpx;
      background-color: rgb(0 0 0 / 70%);
    }
  }

  &__trigger {
    /* #ifdef WEB */
    cursor: pointer;
    /* #endif */
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: #f7f8fa;

    &::before {
      top: 50%;
      left: 50%;
      opacity: 0;
      width: 100%;
      z-index: 3;
      height: 100%;
      content: "";
      border: inherit;
      position: absolute;
      background: #000;
      border-radius: inherit;
      transform: translate(-50%, -50%);
    }

    &--active::before {
      opacity: 0.1;
    }
  }
}
</style>
