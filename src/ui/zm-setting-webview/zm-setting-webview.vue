<template>
  <view class="zm-setting-webview">
    <view class="mb-40">
      <u-input v-model="jumpUrl" clearable placeholder="请输入h5地址"></u-input>
    </view>
    <zm-button type="primary" height="70rpx" @click="handleJump">确定</zm-button>
    <view class="mb-10 mt-40">
      <u-input v-model="appid" clearable placeholder="appid"></u-input>
    </view>
    <view class="mb-10"> <u-input v-model="path" clearable placeholder="路径"></u-input></view>
    <view class="mb-40"> <u-input v-model="extraData" clearable placeholder="extradata"></u-input></view>

    <zm-button type="primary" height="70rpx" @click="handleWxJump">确定</zm-button>
  </view>
</template>

<script>
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
export default {
  name: "zm-setting-webview",
  mixins: [hook, weixin],
  data() {
    return {
      jumpUrl: "",
      extraData: "",
      appid: "",
      path: ""
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleJump() {
      uni.$setCache("webviewSrc", this.jumpUrl)
      this.toView({ url: "pages/utils/webview/webview" })
    },
    // 跳转其他小程序
    handleWxJump() {
      uni.navigateToMiniProgram({
        appId: this.appid,
        path: this.path,
        extraData: {
          data: this.extraData //encodeURI(wxData.action)包含接口参数的全链接
        },
        envVersion: "trial" //develop开发版、trial体验版、release正式版
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-setting-webview {
  padding: 24rpx;
}
</style>
