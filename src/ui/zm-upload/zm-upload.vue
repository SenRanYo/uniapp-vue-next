<template>
  <view class="zm-upload" :class="[customClass]" :style="[style]">
    <view class="zm-upload__previews">
      <view class="zm-upload__preview" :style="[previewStyle]" v-for="(item, index) in list" :key="index">
        <view class="zm-upload__status" v-if="isShowStatus(item)">
          <zm-icon v-if="item.status === 'fail'" name="close" color="#fff"></zm-icon>
          <zm-loading v-if="item.status === 'uploading'" color="#fff"></zm-loading>
          <text class="zm-upload__status__message">{{ item.message }}</text>
        </view>
        <view class="zm-upload__delete" v-if="isShowDelete(item)" @click="onClickDelete(index)">
          <slot name="delete">
            <zm-icon custom-class="zm-upload__delete__icon" name="cross" color="#fff" size="20rpx"></zm-icon>
          </slot>
        </view>
        <zm-image v-if="isImage(item.name || item.url)" :src="item.url"></zm-image>
        <zm-icon v-else-if="isDocument(item.name || item.url)" name="document" :size="previewIconSize" :color="previewIconColor" :weight="previewIconWeight"></zm-icon>
        <zm-icon v-else name="file" :size="previewIconSize" :color="previewIconColor" :weight="previewIconWeight"></zm-icon>
      </view>
      <view class="zm-upload__trigger" :style="[uploadStyle]" @click="upload">
        <slot name="icon">
          <zm-icon :name="icon" :size="iconSize" :color="iconColor" :weight="iconWeight"></zm-icon>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { uuid, clone } from "../utils/utils"
import { useStyle, useUnit } from "../hooks"
import { uploadEmits, uploadProps, UploadFile } from "./index"
import { isFunction, isArray, isString, isImage as isImageLink, isDocument as isDocumentLink } from "../utils/check"

defineOptions({ name: "zm-upload" })

const emits = defineEmits(uploadEmits)
const props = defineProps(uploadProps)

const list = ref([])

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const previewStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.width)
  style.marginRight = useUnit(props.previewGap)
  return useStyle(style)
})

const uploadStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.width)
  return useStyle(style)
})

const isShowStatus = computed(() => {
  return (item: UploadFile) => {
    return ["fail", "uploading"].includes(item.status)
  }
})

const isShowDelete = computed(() => {
  return (item: UploadFile) => {
    return item.status !== "uploading"
  }
})

const isImage = computed(() => {
  return (url: string) => {
    return isImageLink(url)
  }
})

const isDocument = computed(() => {
  return (url: string) => {
    return isDocumentLink(url)
  }
})

watch(() => props.modelValue, formatModelValue, { deep: true, immediate: true })

async function upload() {
  try {
    if (props.disabled) return
    const files = await handleChooseFile()
    list.value = [...list.value, ...files]
    beforeRead(files)
  } catch (error) {}
}

// 读取之前
async function beforeRead(files: UploadFile[]) {
  const next = (files: UploadFile | UploadFile[]) => {
    if (isArray(files)) {
      files.forEach((file) => {
        list.value.forEach((item, index) => {
          if (item.uuid === file.uuid) {
            list.value.splice(index, 1, clone(file))
          }
        })
      })
    } else {
      list.value.forEach((item, index) => {
        if (files.uuid === item.uuid) {
          list.value.splice(index, 1, clone(files))
        }
      })
    }
  }
  if (isFunction(props.beforeRead)) {
    props.beforeRead(props.multiple ? toRaw(files) : toRaw(files[0]), next)
  } else {
    next(files)
  }
}

// 读取之后
async function afterRead() {}

// 格式化绑定值列表
function formatModelValue(value: string | string[]) {
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
function handleChooseFile(): Promise<UploadFile[]> {
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
function chooseMessageFile(params?: any): Promise<UploadFile[]> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    wx.chooseMessageFile({
      count: props.multiple ? props.maxCount : 1,
      type: props.accept,
      success: (res: any) => {
        resolve(
          res.tempFiles.map((item: any) => {
            return { ...item, uuid: uuid(), status: "", message: "" }
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
function onClickDelete(index: number) {
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

  &__previews {
    display: flex;
    flex-wrap: wrap;
  }

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
    align-items: center;
    justify-content: center;
    background-color: #f7f8fa;
  }
}
</style>
