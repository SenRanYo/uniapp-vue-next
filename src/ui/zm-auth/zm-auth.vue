<template>
  <view class="zm-auth">
    <zm-popup :show.sync="visible" mode="bottom" border-radius="16" closeable @close="handleClose">
      <view class="content-wrap">
        <view v-if="isBindMobile" class="bind-mobile-wrap w-full pt-40 px-24">
          <view class="w-full font-36 font-bold">手机号登录</view>
          <view class="input-wrap mt-40 pr-60">
            <input v-model="form.bindingMobile" class="font-32" placeholder="请输入手机号" maxlength="11" />
          </view>
          <view class="input-wrap flex items-center justify-between mt-30 pr-28">
            <input v-model="form.code" class="code-input font-32" placeholder="请输入验证码" maxlength="6" />
            <zm-button custom-class="z-1 flex-shrink-0" type="default" size="normal" height="64rpx" width="170rpx" :disabled="isDisabledCodeBtn" @click="handleGetBindCode">
              {{ codeBtnText }}
            </zm-button>
          </view>
          <view class="mt-50">
            <zm-button type="primary" size="large" block :disabled="isDisabledCodeBindBtn" @click="handleBindMobile">登录</zm-button>
          </view>
          <!-- 协议 -->
          <view class="agreest-wrap">
            <zm-checkbox v-model="isAgreest" icon-size="28rpx" round>
              <view class="text-999">
                <text> 我已认真阅读、理解并同意 </text>
                <text class="text-theme" @click.stop="handleToUserAt">《欢银电影用户协议》</text>
                <text class="text-theme" @click.stop="handleToUserPyAt">《欢银电影隐私协议》</text>
              </view>
            </zm-checkbox>
          </view>
        </view>
        <view v-else class="flex w-full flex-col items-center pt-100 px-100">
          <image class="logo-image" src="/static/logo.png" mode="scaleToFill" />
          <text class="welcome-text">欢迎来到{{ manifest.name }}</text>
          <text class="tips-text">登录后即可获取更多权益，享受更好的服务体验</text>
          <view class="button-wrap">
            <!-- 微信平台 -->
            <!-- #ifdef MP-WEIXIN -->
            <zm-button v-if="!login" type="primary" size="large" round block :disabled="loading" @click="handleWxMpUserProfile">登录</zm-button>
            <zm-button v-else :disabled="loading" open-type="getPhoneNumber" type="primary" size="large" round block @getphonenumber="handleGetphonenumber"> 绑定手机号 </zm-button>
            <!-- #endif -->

            <!-- 排除微信平台 -->
            <!-- #ifndef MP-WEIXIN  -->
            <zm-button v-if="webEvn == 'web'" type="primary" size="large" round block @click="handleToAuth">登录</zm-button>
            <UPButton v-else-if="webEvn == 'ysf'" class="bind-button" scope="scope.mobile" @click="handleYsfBindMobile">{{ login ? "绑定手机号" : "登录" }}</UPButton>
            <zm-button v-else type="primary" size="large" round block @click="handleAuthLogin">登录</zm-button>
            <!-- #endif -->
          </view>
          <!-- 协议 -->
          <view class="mt-40 mb-50">
            <zm-checkbox v-model="isAgreest" icon-size="28rpx" round>
              <view class="text-999">
                <text> 我已认真阅读、理解并同意 </text>
                <text class="text-theme" @click.stop="handleToUserAt">《欢银电影用户协议》</text>
                <text class="text-theme" @click.stop="handleToUserPyAt">《欢银电影隐私协议》</text>
              </view>
            </zm-checkbox>
          </view>
        </view>
      </view>
    </zm-popup>
    <zm-dialog ref="dialog" title="阅读并同意以下协议" @confirm="handleOnConfirm">
      <text>为了保证您的个人信息安全，使用登录 功能需要先阅读并同意</text>
      <text class="text-theme" @click.stop="handleToUserAt">《欢银电影用户协议》</text>
      <text class="text-theme" @click.stop="handleToUserPyAt">《欢银电影隐私协议》</text>
    </zm-dialog>
    <u-code ref="code" :seconds="codeSeconds" @start="onCodeCountdownStart" @change="onCodeCountdownChange"></u-code>
  </view>
</template>

<script>
import weixin from "@/mixins/weixin"
import manifest from "@/manifest.json"
import { mapState, mapGetters, mapActions } from "vuex"
export default {
  name: "zm-auth",
  mixins: [weixin],
  data() {
    return {
      form: { bindingMobile: "", code: "" },
      code: "",
      loading: false,
      visible: false,
      manifest,
      isAgreest: false,
      codeSeconds: 120,
      codeBtnText: "获取验证码"
    }
  },
  computed: {
    ...mapState(["pageId"]),
    ...mapGetters(["login", "userInfo", "webEvn", "webEnv"]),
    isBindMobile() {
      const contain = ["wxWeb", "wxMp", "boc", "efz", "cmbc"]
      return this.login && (contain.includes(this.webEnv) || contain.includes(this.webEvn))
    },
    isDisabledCodeBtn() {
      return !uni.$check.isPhoneNo(this.form.bindingMobile)
    },
    isDisabledCodeBindBtn() {
      return this.isDisabledCodeBtn || !this.form.code
    }
  },
  watch: {
    isAgreest: {
      handler(val) {
        uni.$setCache("isAgreest", val)
      }
    }
  },
  mounted() {
    this.isAgreest = uni.$getCache("isAgreest") || false
    this.handleOnEvent()
  },
  methods: {
    // 统一处理登录
    handleAuthLogin(type) {
      if (this.isAgreest) {
        uni.$auth
          .login()
          .then((res) => {
            this.visible = false
          })
          .catch((err) => {
            uni.$toast(err?.errMsg || err || "登录失败")
          })
      } else {
        this.$refs.dialog.open({
          showCancelButton: true,
          cancelButtonText: "不同意",
          confirmButtonText: "已阅读并同意"
        })
      }
    },
    // 获取验证码
    handleGetBindCode() {
      uni.$api.public.sendSms({ mobile: this.form.bindingMobile, codeType: "bindMobile" }).then((res) => {
        this.codeSeconds = res.expire
        this.$refs.code.start()
      })
    },
    // 微信小程序用户信息授权
    handleWxMpUserProfile() {
      if (this.isAgreest) {
        uni.getUserInfo({
          provider: "weixin",
          success: (res) => {
            this.loading = true
            uni.$loading({
              type: "loading",
              content: "正在登录..."
            })
            const data = JSON.stringify({ code: this.code, payload: { iv: res.iv, encryptedData: res.encryptedData } })
            uni.$api.public
              .loginByOAuth2({ data, type: "weixin" })
              .then(async () => {
                this.getUserInfo()
                  .then(async () => {
                    uni.$emit("login-success")
                    uni.$toast("登录成功")
                    this.visible = false
                    this.$emit("success")
                    this.loading = false
                    uni.$loading(false)
                  })
                  .catch((err) => {
                    this.loading = false
                    uni.$loading(false)
                    if (err.status == "10006") {
                      this.handleGetWxCode()
                      uni.$toView({ url: "pages/auth/wxmp-login/wxmp-login" })
                    }
                  })
              })
              .catch(() => {
                this.loading = false
                uni.$loading(false)
                this.handleGetWxCode()
              })
          },
          fail: (err) => {
            this.loading = false
            uni.$loading(false)
            this.$emit("fail")
            uni.showModal({
              content: "获取用户信息失败,请重新授权,谢谢",
              showCancel: false
            })
            console.log("微信小程序授权拒绝信息：", err)
          }
        })
      } else {
        this.$refs.dialog.open({
          showCancelButton: true,
          cancelButtonText: "不同意",
          confirmButtonText: "已阅读并同意"
        })
      }
    },
    // 绑定手机号
    handleBindMobile() {
      if (this.isAgreest) {
        uni.$api.user
          .bindMobile(this.form)
          .then(() => {
            this.getUserInfo()
              .then(() => {
                uni.$emit("login-success")
                uni.$toast("登录成功")
                this.visible = false
                this.$emit("success")
                this.loading = false
                uni.$loading(false)
              })
              .catch(() => {
                this.loading = false
                uni.$loading(false)
              })
          })
          .catch(() => {
            this.loading = false
            uni.$loading(false)
          })
      } else {
        this.$refs.dialog.open({
          showCancelButton: true,
          cancelButtonText: "不同意",
          confirmButtonText: "已阅读并同意"
        })
      }
    },
    // 微信小程序绑定手机号
    handleGetphonenumber({ detail }) {
      if (this.isAgreest) {
        if (detail.iv) {
          const data = JSON.stringify({
            code: this.code,
            payload: { iv: detail.iv, encryptedData: detail.encryptedData }
          })
          this.loading = true
          uni.$api.public
            .bindMobileByWeiXin({ data })
            .then(() => {
              this.getUserInfo()
              uni.showToast({
                icon: "success",
                title: "恭喜您，绑定成功",
                mask: true
              })
              setTimeout(() => {
                uni.$emit("login-success")
                uni.$toast("绑定成功")
                this.visible = false
                this.loading = false
                this.$emit("success")
                uni.$loading(false)
              }, 1000)
            })
            .catch(() => {
              this.loading = false
              uni.$loading(false)
              this.handleGetWxCode()
            })
        }
      } else {
        this.$refs.dialog.open({
          showCancelButton: true,
          cancelButtonText: "不同意",
          confirmButtonText: "已阅读并同意"
        })
      }
    },
    // 云闪付绑定手机号
    handleYsfBindMobile(data) {
      if (this.isAgreest) {
        if (data?.code) {
          uni.$loading({ type: "loading", content: "正在绑定...", duration: 10000, mask: true })
          uni.$auth.sdk
            .bindMobile({ code: data.code })
            .then(() => {
              this.visible = false
              uni.$loading(false)
            })
            .catch(() => {
              uni.$loading(false)
            })
        } else {
          uni.$loading(false)
          this.$toast(data?.errmsg)
        }
      } else {
        this.$refs.dialog.open({
          showCancelButton: true,
          cancelButtonText: "不同意",
          confirmButtonText: "已阅读并同意"
        })
      }
    },
    // 跳转其他登录
    handleToAuth() {
      if (this.isAgreest) {
        this.toView({ url: "pages/auth/account-login/account-login" })
        this.visible = false
      } else {
        this.$refs.dialog.open({
          showCancelButton: true,
          cancelButtonText: "不同意",
          confirmButtonText: "已阅读并同意"
        })
      }
    },
    // 跳转用户协议
    handleToUserAt() {
      this.toView({
        url: "pages/person/user-agreement/user-agreement",
        params: {
          type: "userAt",
          title: "欢银电影用户协议"
        }
      })
    },
    // 跳转用户隐私协议
    handleToUserPyAt() {
      this.toView({
        url: "pages/person/user-agreement/user-agreement",
        params: {
          type: "userPyAt",
          title: "欢银电影隐私协议"
        }
      })
    },
    // 同意协议
    handleOnConfirm() {
      this.isAgreest = true
    },
    // 监听事件
    handleOnEvent() {
      uni.$on(`auth-login-${this.pageId}`, () => {
        this.show()
      })
    },
    // 弹层关闭事件
    handleClose() {
      this.visible = false
      this.$emit("close")
    },
    // 获取微信Code
    handleGetWxCode() {
      // #ifdef MP-WEIXIN
      return new Promise((resole, reject) => {
        uni.login({
          provider: "weixin",
          success: (res) => {
            this.code = res.code
            this.visible = true
            resole()
          },
          fail: (err) => {
            reject("微信Code获取失败:", err.toString())
          }
        })
      })
      // #endif
    },
    // 验证码倒计时
    onCodeCountdownChange(text) {
      this.codeBtnText = text
    },
    // 验证码倒计时开始
    onCodeCountdownStart() {
      this.codeBtn = true
    },
    show() {
      // #ifdef MP-WEIXIN
      this.handleGetWxCode()
      // #endif
      // #ifndef MP-WEIXIN
      this.visible = true
      // #endif
    },
    hide() {
      this.visible = false
    },
    ...mapActions(["getUserInfo"])
  }
}
</script>

<style scoped lang="scss">
.zm-auth {
  z-index: 1001;
  position: relative;
  border-radius: 16rpx;
  .content-wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    .bind-mobile-wrap {
      .input-wrap {
        display: flex;
        height: 96rpx;
        padding-left: 60rpx;
        align-items: center;
        border-radius: 48rpx;
        background-color: #f4f6f7;
        .code-input {
          width: 300rpx;
        }
      }
      .agreest-wrap {
        padding: 0 80rpx;
        margin-top: 232rpx;
        margin-bottom: 45rpx;
      }
    }
    .logo-image {
      width: 160rpx;
      height: 160rpx;
      border-radius: 24rpx;
      box-shadow: 0 0rpx 20rpx 0 rgba(0, 0, 0, 0.1);
    }
    .welcome-text {
      color: #000000;
      font-size: 32rpx;
      margin-top: 28rpx;
      font-weight: bold;
    }
    .tips-text {
      color: #999999;
      font-size: 24rpx;
      margin-top: 14rpx;
    }
    .button-wrap {
      flex: 1;
      width: 100%;
      margin-top: 40rpx;
    }
    .bind-button {
      width: 100%;
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      border-radius: 200px;
      color: #fff;
      height: 100rpx;
      font-size: 32rpx;
      font-weight: bold;
      background: var(--theme-color, #fd7441);
    }
  }
}
</style>
