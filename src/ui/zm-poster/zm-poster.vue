<template>
  <canvas :id="canvasId" :style="{ width: cv_width + 'px', height: cv_height + 'px' }" :canvas-id="canvasId" class="zm-poster"></canvas>
</template>

<script>
import { uuid } from "../utils/utils"
import { useUnitToPx } from "../utils/style"
import { isArray, isNumber, isString } from "../utils/check"
const canvasId = "zm-poster-" + uuid()
export default {
  name: "zm-poster",
  props: {
    //海报宽度，单位rpx
    width: { type: [Number, String], default: 700 },
    //海报高度，单位rpx
    height: { type: [Number, String], default: 1100 },
    //像素比
    pixel: { type: [Number, String], default: 3 }
  },
  emits: ["ready"],
  data() {
    return {
      canvasId,
      cv_width: 400,
      cv_height: 600
    }
  },
  watch: {
    width() {
      this.cv_width = this.usePixel(this.width)
    },
    height() {
      this.cv_height = this.usePixel(this.height)
    }
  },
  created() {
    this.cv_width = this.usePixel(this.width)
    this.cv_height = this.usePixel(this.height)
    this.ctx = null
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.ctx = uni.createCanvasContext(this.canvasId, this)
        this.$emit("ready", {})
      }, 50)
    })
  },
  methods: {
    toast(msg) {
      uni.showToast({
        title: msg,
        icon: "none"
      })
    },
    // 使用像素
    usePixel(val) {
      return useUnitToPx(val) * Number(this.pixel)
    },
    // 是否相等圆角
    isEqualBorderRadius(r) {
      return (isNumber(r) && r > 0) || (isString(r) && r > 0) || (isArray(r) && r.every((v, i, a) => v === a[0] && v !== 0))
    },
    getTextWidth(context, text, fontSize) {
      let width = 0
      // #ifndef MP-ALIPAY || MP-BAIDU
      width = context.measureText(text).width
      // #endif
      // #ifdef MP-ALIPAY || MP-BAIDU
      let sum = 0
      for (let i = 0, len = text.length; i < len; i++) {
        if (text.charCodeAt(i) >= 0 && text.charCodeAt(i) <= 255) sum = sum + 1
        else sum = sum + 2
      }
      width = (sum / 2) * this.usePixel(fontSize)
      // #endif
      return width
    },
    getWrapText(text, fontSize, textWidth, width, ctx, rows = 2) {
      let textArr = []
      if (textWidth > width) {
        let fillText = ""
        let lines = 1
        let arr = text.split("")
        for (let i = 0, len = arr.length; i < len; i++) {
          fillText = fillText + arr[i]
          if (this.getTextWidth(ctx, fillText, fontSize) >= width) {
            if (lines === rows && rows !== -1) {
              if (i !== arr.length - 1) {
                fillText = fillText.substring(0, fillText.length - 1) + "..."
              }
              textArr.push(fillText)
              break
            }
            textArr.push(fillText)
            fillText = ""
            lines++
          } else if (i === arr.length - 1) {
            textArr.push(fillText)
          }
        }
      } else {
        textArr.push(text)
      }
      return textArr
    },
    startDrawText(ctx, param) {
      let styles = param.style || {}
      let {
        left,
        top,
        fontSize,
        color,
        baseLine = "normal",
        textAlign = "left",
        frontSize,
        spacing,
        opacity = 1,
        lineThrough = false,
        width = 600,
        rows = 1,
        lineHeight = 0,
        fontWeight = "normal",
        fontStyle = "normal",
        fontFamily = "sans-serif"
      } = styles
      ctx.save()
      ctx.beginPath()
      ctx.font = fontStyle + " " + fontWeight + " " + this.usePixel(fontSize) + "px " + fontFamily
      ctx.setGlobalAlpha(opacity)
      // ctx.setFontSize(this.usePixel(fontSize));
      ctx.setFillStyle(color)
      ctx.setTextBaseline(baseLine)
      ctx.setTextAlign(textAlign)
      let textWidth = this.getTextWidth(ctx, param.text, fontSize)
      width = this.usePixel(width)
      let textArr = this.getWrapText(param.text, fontSize, textWidth, width, ctx, rows)
      if (param.frontText) {
        ctx.setFontSize(this.usePixel(frontSize))
        left = this.getTextWidth(ctx, param.frontText, frontSize) + this.usePixel(left + spacing)
        ctx.setFontSize(this.usePixel(fontSize))
      } else {
        left = this.usePixel(left)
      }
      textArr.forEach((item, index) => {
        ctx.fillText(item, left, this.usePixel(top + (lineHeight || fontSize) * index))
      })
      ctx.restore()
      if (lineThrough) {
        let lineY = top
        switch (baseLine) {
          case "top":
            lineY += fontSize / 2 + 4
            break
          case "middle":
            break
          case "bottom":
            lineY -= fontSize / 2 + 4
            break
          default:
            // #ifdef MP-WEIXIN
            lineY -= fontSize / 2 - 3
            // #endif
            // #ifndef MP-WEIXIN
            lineY -= fontSize / 2 - 4
            // #endif
            break
        }
        ctx.save()
        ctx.moveTo(left, this.usePixel(lineY))
        ctx.lineTo(left + textWidth + 2, this.usePixel(lineY))
        ctx.setStrokeStyle(color)
        ctx.stroke()
        ctx.restore()
      }
    },

    startDrawImage(ctx, param) {
      let styles = param.style || {}
      let { left, top, width, height, borderRadius = 0, borderWidth = 0, borderColor } = styles
      ctx.save()
      if (borderRadius > 0 || isArray(borderRadius)) {
        this.drawRadiusRect(ctx, styles)
        ctx.strokeStyle = "rgba(0,0,0,0)"
        // #ifndef MP-BAIDU || MP-TOUTIAO
        ctx.stroke()
        // #endif
        ctx.clip()
      }
      ctx.drawImage(param.src, this.usePixel(left), this.usePixel(top), this.usePixel(width), this.usePixel(height))
      if (borderWidth && borderWidth > 0) {
        ctx.setStrokeStyle(borderColor)
        ctx.setLineWidth(this.usePixel(borderWidth))
        ctx.stroke()
      }
      ctx.restore()
    },
    // 绘制相等圆角矩形
    drawEqualRadiusRect(ctx, styles) {
      let { top, left, width, height, borderRadius } = styles
      let [tl] = isArray(borderRadius) ? borderRadius.map((r) => this.usePixel(r)) : Array(1).fill(this.usePixel(borderRadius))
      let r = tl / 2
      top = this.usePixel(top)
      left = this.usePixel(left)
      width = this.usePixel(width)
      height = this.usePixel(height)
      ctx.beginPath()
      ctx.arc(left + r, top + r, r, Math.PI, Math.PI * 1.5)
      ctx.moveTo(left + r, top)
      ctx.lineTo(left + width - r, top)
      ctx.lineTo(left + width, top + r)

      ctx.arc(left + width - r, top + r, r, Math.PI * 1.5, Math.PI * 2)
      ctx.lineTo(left + width, top + height - r)
      ctx.lineTo(left + width - r, top + height)

      ctx.arc(left + width - r, top + height - r, r, 0, Math.PI * 0.5)
      ctx.lineTo(left + r, top + height)
      ctx.lineTo(left, top + height - r)

      ctx.arc(left + r, top + height - r, r, Math.PI * 0.5, Math.PI)
      ctx.lineTo(left, top + r)
      ctx.lineTo(left + r, top)
    },
    // 绘制圆角矩形
    drawRadiusRect(ctx, styles) {
      // 获取样式中的top, left, width, height, borderRadius
      let { top, left, width, height, borderRadius } = styles

      // 参数转换
      let [tl, tr, br, bl] = isArray(borderRadius) ? borderRadius.map((r) => this.usePixel(r)) : Array(4).fill(this.usePixel(borderRadius))
      // 将top, left, width, height转换为px单位
      top = this.usePixel(top)
      left = this.usePixel(left)
      width = this.usePixel(width)
      height = this.usePixel(height)

      // 开始绘制
      ctx.beginPath()
      // 移动到左上角
      ctx.moveTo(left + tl, top)
      // 画一条线到右上角
      ctx.lineTo(left + width - tr, top)
      // 画一条曲线到右上角
      ctx.quadraticCurveTo(left + width, top, left + width, top + tr)
      // 画一条线到右下角
      ctx.lineTo(left + width, top + height - br)
      // 画一条曲线到右下角
      ctx.quadraticCurveTo(left + width, top + height, left + width - br, top + height)
      // 画一条线到左下角
      ctx.lineTo(left + bl, top + height)
      // 画一条曲线到左下角
      ctx.quadraticCurveTo(left, top + height, left, top + height - bl)
      // 画一条线到左上角
      ctx.lineTo(left, top + tl)
      // 画一条曲线到左上角
      ctx.quadraticCurveTo(left, top, left + tl, top)
      // 闭合路径
      ctx.closePath()
      // 描边
      ctx.stroke()
    },
    // 绘制矩形
    startDrawRect(ctx, param) {
      // 获取样式
      let styles = param.style || {}
      // 获取样式中的参数
      let {
        width,
        height,
        left,
        top,
        borderWidth,
        backgroundColor,
        gradientColor,
        gradientType = 1,
        borderColor,
        borderRadius = 0,
        opacity = 1,
        globalCompositeOperation = "source-over",
        shadow
      } = styles

      // 如果存在背景色，则绘制背景
      ctx.save()
      // 设置透明度
      ctx.setGlobalAlpha(opacity)
      // 设置合成方式
      ctx.globalCompositeOperation = globalCompositeOperation

      // 如果存在渐变，则绘制渐变
      if (gradientColor) {
        // 创建线性渐变
        let linearGradientParams = gradientType == 1 ? [0, 0, this.usePixel(width), this.usePixel(height)] : [0, this.usePixel(width), this.usePixel(height), 0]
        let linearGradient = ctx.createLinearGradient(...linearGradientParams)
        // 设置渐变的颜色和位置
        linearGradient.addColorStop(0, backgroundColor)
        linearGradient.addColorStop(1, gradientColor)
        // 设置填充样式
        ctx.setFillStyle(linearGradient)
      } else {
        // 设置填充样式
        ctx.setFillStyle(backgroundColor)
      }

      if (shadow) {
        // 获取阴影参数
        const { offsetX, offsetY, blur, color } = shadow
        // 设置阴影偏移量
        ctx.shadowOffsetX = this.usePixel(offsetX)
        ctx.shadowOffsetY = this.usePixel(offsetY)
        // 设置阴影模糊程度
        ctx.shadowBlur = blur
        // 设置阴影颜色
        ctx.shadowColor = color
      }

      // 如果存在圆角，则绘制圆角矩形
      if (this.isEqualBorderRadius(borderRadius)) {
        this.drawEqualRadiusRect(ctx, styles)
        ctx.fill()
      } else if (isArray(borderRadius)) {
        this.drawRadiusRect(ctx, styles)
        ctx.fill()
      } else {
        // 绘制矩形
        ctx.fillRect(this.usePixel(left), this.usePixel(top), this.usePixel(width), this.usePixel(height))
      }
      ctx.restore()

      // 如果存在边框，则绘制边框
      if (borderWidth) {
        ctx.save()
        // 设置透明度
        ctx.setGlobalAlpha(opacity)
        // 设置边框样式
        ctx.setStrokeStyle(borderColor)
        // 设置边框宽度
        ctx.setLineWidth(this.usePixel(borderWidth))
        // 设置圆角
        if (borderRadius > 0 || isArray(borderRadius)) {
          this.drawRadiusRect(ctx, styles)
          ctx.stroke()
        } else {
          // 绘制矩形
          ctx.strokeRect(this.usePixel(left), this.usePixel(top), this.usePixel(width), this.usePixel(height))
        }
        ctx.restore()
      }
    },
    // 绘制线条
    startDrawLine(ctx, param) {
      // 获取样式
      let styles = param.style
      // 解构赋值
      let { left, top, endLeft, endTop, color, width = 1, lineDash } = styles
      // 保存当前画布状态
      ctx.save()
      // 开始新的路径
      ctx.beginPath()
      // 设置画笔颜色
      ctx.setStrokeStyle(color)
      // 设置画笔线宽
      ctx.setLineWidth(this.usePixel(width))
      // 如果lineDash是数组，则将数组中的值都转换成px单位
      if (Array.isArray(lineDash)) {
        ctx.setLineDash(lineDash.map((d) => this.usePixel(d)))
      }
      // 移动至起点
      ctx.moveTo(this.usePixel(left), this.usePixel(top))
      // 绘制线条
      ctx.lineTo(this.usePixel(endLeft), this.usePixel(endTop))
      ctx.stroke()
      // 关闭路径
      ctx.closePath()
      // 恢复画布状态
      ctx.restore()
    },
    judgeIosPermissionPhotoLibrary() {
      // #ifdef APP-PLUS
      var result = 0
      var PHPhotoLibrary = plus.ios.import("PHPhotoLibrary")
      var authStatus = PHPhotoLibrary.authorizationStatus()
      if (authStatus === 0) {
        result = -1
      } else if (authStatus == 3) {
        result = 1
        console.log("相册权限已经开启")
      } else {
        result = 0
        console.log("相册权限没有开启")
      }
      plus.ios.deleteObject(PHPhotoLibrary)
      return result
      // #endif
    },
    requestAndroidPermission(permissionID) {
      // #ifdef APP-PLUS
      return new Promise((resolve, reject) => {
        plus.android.requestPermissions(
          [permissionID],
          function (resultObj) {
            var result = 0
            for (var i = 0; i < resultObj.granted.length; i++) {
              var grantedPermission = resultObj.granted[i]
              result = 1
            }
            for (var i = 0; i < resultObj.deniedPresent.length; i++) {
              var deniedPresentPermission = resultObj.deniedPresent[i]
              result = 0
            }
            for (var i = 0; i < resultObj.deniedAlways.length; i++) {
              var deniedAlwaysPermission = resultObj.deniedAlways[i]
              result = -1
            }
            resolve(result)
          },
          function (error) {
            resolve({
              code: error.code,
              message: error.message
            })
          }
        )
      })
      // #endif
    },
    gotoAppPermissionSetting(isAndroid) {
      // #ifdef APP-PLUS
      if (!isAndroid) {
        var UIApplication = plus.ios.import("UIApplication")
        var application2 = UIApplication.sharedApplication()
        var NSURL2 = plus.ios.import("NSURL")
        var setting2 = NSURL2.URLWithString("app-settings:")
        application2.openURL(setting2)

        plus.ios.deleteObject(setting2)
        plus.ios.deleteObject(NSURL2)
        plus.ios.deleteObject(application2)
      } else {
        var Intent = plus.android.importClass("android.content.Intent")
        var Settings = plus.android.importClass("android.provider.Settings")
        var Uri = plus.android.importClass("android.net.Uri")
        var mainActivity = plus.android.runtimeMainActivity()
        var intent = new Intent()
        intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
        var uri = Uri.fromParts("package", mainActivity.getPackageName(), null)
        intent.setData(uri)
        mainActivity.startActivity(intent)
      }
      // #endif
    },
    judgePermissionPhotoLibrary: async function (callback) {
      // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
      callback && callback(true)
      // #endif

      // #ifdef APP-PLUS
      const res = uni.getSystemInfoSync()
      let result
      let isAndroid = res.platform.toLocaleLowerCase() == "android"
      if (isAndroid) {
        result = await this.requestAndroidPermission("android.permission.WRITE_EXTERNAL_STORAGE")
      } else {
        result = this.judgeIosPermissionPhotoLibrary()
      }
      if (result == 1) {
        callback && callback(true)
      } else {
        if (!(!isAndroid && result == -1)) {
          uni.showModal({
            title: "提示",
            content: "您还没有开启相册权限，是否立即开启？",
            showCancel: true,
            success: (res) => {
              if (res.confirm) {
                this.gotoAppPermissionSetting(isAndroid)
              }
            }
          })
        } else {
          callback && callback(true)
        }
      }
      // #endif

      // #ifdef MP-WEIXIN || MP-QQ
      uni.authorize({
        scope: "scope.writePhotosAlbum",
        success() {
          callback && callback(true)
        },
        fail() {
          uni.showModal({
            title: "提示",
            content: "您还没有开启相册权限，是否立即开启？",
            showCancel: true,
            success: (res) => {
              if (res.confirm) {
                wx.openSetting({
                  success(res) {}
                })
              }
            }
          })
        }
      })
      // #endif
    },
    imgDownload(url) {
      return new Promise((resolve, reject) => {
        uni.downloadFile({
          url: url,
          success: (res) => {
            resolve(res.tempFilePath)
          },
          fail: (err) => {
            reject(false)
          }
        })
      })
    },
    base64ToImg(base64) {
      const uniqueId = `poster_${Math.ceil(Math.random() * 10e5).toString(36)}`
      return new Promise((resolve, reject) => {
        // #ifdef MP-WEIXIN
        const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64) || []
        let arrayBuffer = wx.base64ToArrayBuffer(bodyData)
        const filePath = `${wx.env.USER_DATA_PATH}/${uniqueId}.${format}`
        wx.getFileSystemManager().writeFile({
          filePath,
          data: arrayBuffer,
          encoding: "binary",
          success() {
            resolve(filePath)
          },
          fail() {
            reject(false)
          }
        })
        // #endif
        // #ifdef APP-PLUS
        let bitmap = new plus.nativeObj.Bitmap(uniqueId)
        bitmap.loadBase64Data(
          base64,
          function () {
            bitmap.save(
              `_doc/${uniqueId}.png`,
              {},
              function (e) {
                let target = e.target
                resolve(target)
              },
              function (e) {
                reject(false)
              }
            )
          },
          function () {
            reject(false)
          }
        )
        // #endif

        // #ifdef H5
        resolve(base64)
        // #endif

        // #ifndef MP-WEIXIN || APP-PLUS || H5
        reject(false)
        // #endif
      })
    },
    startDraw(data, callback) {
      let ctx = this.ctx
      if (ctx) {
        ctx.clearRect(0, 0, this.cv_width, this.cv_height)
        data.forEach((item) => {
          if (item.type === "image") {
            this.startDrawImage(ctx, item)
          } else if (item.type === "text") {
            this.startDrawText(ctx, item)
          } else if (item.type === "rect") {
            this.startDrawRect(ctx, item)
          } else if (item.type === "line") {
            this.startDrawLine(ctx, item)
          }
        })
        const platform = uni.getSystemInfoSync().platform
        let time = 80
        if (platform === "android") {
          time = 300
        }
        setTimeout(() => {
          ctx.draw(false, () => {
            setTimeout(() => {
              // #ifdef MP-ALIPAY
              ctx.toTempFilePath({
                success: (res) => {
                  callback && callback(res.apFilePath)
                },
                fail: (err) => {
                  callback && callback(false)
                }
              })
              // #endif
              // #ifndef MP-ALIPAY
              uni.canvasToTempFilePath(
                {
                  x: 0,
                  y: 0,
                  canvasId: this.canvasId,
                  fileType: "png",
                  quality: 1,
                  success: function (res) {
                    console.log(res)
                    callback && callback(res.tempFilePath)
                  },
                  fail() {
                    callback && callback(false)
                  }
                },
                this
              )
              // #endif
            }, time)
          })
        }, 50)
      } else {
        callback && callback(false)
      }
    },
    draw(data, callback) {
      // text（文本）、image（图片）、rect（矩形），line（线条）
      // {
      // 	type:'image',
      //  src:'',
      // 	style:{

      // 	}
      // }
      if (!data || data.length === 0) return
      let func = [],
        idxes = []
      data.forEach((item, index) => {
        if (item.type === "image") {
          //图片类型：1-本地图片（需要平台支持）；2-网络图片； 3- base64 图片（仅App，微信小程序，H5支持）
          if (item.imgType == 2) {
            func.push(this.imgDownload(item.src))
            idxes.push(index)
          }
          // #ifdef APP-PLUS || H5 || MP-WEIXIN
          if (item.imgType == 3) {
            func.push(this.base64ToImg(item.src))
            idxes.push(index)
          }
          // #endif
        }
      })
      if (func.length > 0) {
        Promise.all(func)
          .then((res) => {
            res.forEach((imgRes, idx) => {
              let item = data[idxes[idx]]
              item.src = imgRes
            })
            this.startDraw(data, callback)
          })
          .catch((err) => {
            console.log(err)
            this.toast("图片处理失败!")
          })
      } else {
        this.startDraw(data, callback)
      }
    },
    save(file) {
      // #ifdef H5
      //H5无法直接保存到相册，预览后长按保存
      uni.previewImage({
        urls: [file]
      })
      // #endif
      // #ifndef H5
      this.judgePermissionPhotoLibrary((res) => {
        if (res) {
          uni.saveImageToPhotosAlbum({
            filePath: file,
            success: (res) => {
              this.toast("图片已保存到相册")
            },
            fail: (res) => {
              this.toast("图片保存失败")
            }
          })
        }
      })
      // #endif
    }
  }
}
</script>

<style scoped>
.zm-poster {
  top: -9999px;
  left: -9999px;
  position: fixed;
}
</style>
