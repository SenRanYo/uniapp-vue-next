<template>
  <view class="zm-setting-tools">
    <zm-button type="primary" height="70rpx" @click="handleOpenDebug">开启调试面板</zm-button>
    <zm-button type="primary" height="70rpx" @click="handleVip">重置会员信息</zm-button>
    <zm-button type="primary" height="70rpx" @click="handleOut">退出登录</zm-button>
    <zm-button type="primary" height="70rpx" @click="handleDelAccount">重置成新用户</zm-button>
    <zm-button type="primary" height="70rpx" color="#409EFF" @click="handleCopyRoute">复制路径</zm-button>
    <zm-button type="primary" height="70rpx" color="#409EFF" @click="handleClearCache">清除缓存</zm-button>
  </view>
</template>

<script>
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
import { mapGetters, mapActions } from "vuex"
export default {
  name: "zm-setting-tools",
  mixins: [hook, weixin],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(["userInfo", "pwy", "webEvn"])
  },
  created() {},
  mounted() {},
  methods: {
    ...mapActions(["enableDebug"]),
    handleVip() {
      uni.$api.vipCardV2.testToolClearMembershipCard({ memberId: this.userInfo.memberId }).then(() => {
        this.handleOut()
      })
    },
    async handleOut() {
      await this.$store.dispatch("logout")
    },
    handleDelAccount() {
      uni.$api.vipCardV2.testCancelAccount({ memberId: this.userInfo.memberId }).then(() => {
        this.handleOut()
      })
    },
    handleOpenDebug() {
      // #ifdef MP-WEIXIN
      uni.setEnableDebug({
        enableDebug: true
      })
      // #endif

      this.enableDebug()
    },
    handleCopyRoute() {
      const routes = getCurrentPages()
      const options = routes[routes.length - 1].options
      const query = []
      for (let key in options) {
        query.push(`${key}=${options[key]}`)
      }
      const _options = query.length ? query.join("&") : []
      let route = `${this.useCurrentRoute()}${_options.length ? "?" + _options : ""}`
      // #ifdef WEB
      const { origin, pathname, search, hash, href } = window.location
      route = href.includes("?") ? `${origin}${pathname}${search}${hash}&pwy=${this.pwy}&evn=${this.webEvn}` : `${origin}${pathname}${search}${hash}?pwy=${this.pwy}&evn=${this.webEvn}`
      // #endif
      uni.setClipboardData({
        data: route,
        success: () => {
          uni.showToast({
            title: "已复制到剪贴板",
            icon: "none"
          })
        }
      })
    },
    handleClearCache() {
      uni.clearStorage()
      // #ifdef WEB
      window.localStorage.clear()
      window.sessionStorage.clear()
      // #endif
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-setting-tools {
  padding: 24rpx;
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 12rpx));
  gap: 24rpx;
}
</style>
