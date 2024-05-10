<template>
  <scroll-view enable-flex class="zm-setting-system" scroll-y @touchmove.prevent.stop="() => {}">
    <view class="content-wrap">
      <view v-for="(val, key) in systemInfo" :key="key" class="info-item">
        <text>{{ key }}：</text>
        <text>{{ val }}</text>
      </view>
    </view>
    <view class="content-wrap">
      <view v-for="(val, key) in userInfo" :key="key" class="info-item">
        <text>{{ key }}：</text>
        <text>{{ val }}</text>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
import { mapGetters } from "vuex"
export default {
  name: "zm-setting-system",
  mixins: [hook, weixin],
  data() {
    return {
      systemInfo: {}
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.systemInfo = uni.getSystemInfoSync()
      this.systemInfo.hostEnv = this.systemInfo.host?.env
      this.systemInfo.safeAreaInsetsTop = this.systemInfo.safeAreaInsets.top
      this.systemInfo.safeAreaInsetsBottom = this.systemInfo.safeAreaInsets.bottom
      this.systemInfo.safeAreaInsetsLeft = this.systemInfo.safeAreaInsets.left
      this.systemInfo.safeAreaInsetsRight = this.systemInfo.safeAreaInsets.right
      this.systemInfo.safeAreaTop = this.systemInfo.safeArea.top
      this.systemInfo.safeAreaBottom = this.systemInfo.safeArea.bottom
      this.systemInfo.safeAreaLeft = this.systemInfo.safeArea.left
      this.systemInfo.safeAreaRight = this.systemInfo.safeArea.right
      this.systemInfo.safeAreaWdith = this.systemInfo.safeArea.width
      this.systemInfo.safeAreaHeight = this.systemInfo.safeArea.height
      // #ifdef MP-WEIXIN
      const accountInfo = uni.getAccountInfoSync()
      this.systemInfo.wxEnv = accountInfo?.miniProgram.envVersion
      this.systemInfo.wxVersion = accountInfo?.miniProgram.version
      // #endif

      delete this.systemInfo.host
      delete this.systemInfo.safeArea
      delete this.systemInfo.safeAreaInsets
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-setting-system {
  height: calc(70vh - 70rpx);
  .content-wrap {
    padding: 24rpx;
  }
}
</style>
