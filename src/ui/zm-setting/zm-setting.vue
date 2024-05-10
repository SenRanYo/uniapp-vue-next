<template>
  <view v-if="show" class="zm-setting">
    <movable-area class="zm-setting__area">
      <movable-view class="zm-setting__area__button" :x="settingButtonPosition.x" :y="settingButtonPosition.y" direction="all" @change="onButtonChange" @click="showPopup = !showPopup">
        设置
      </movable-view>
    </movable-area>
    <zm-popup :show.sync="showPopup" mode="bottom" border-radius="12rpx" height="70vh">
      <view class="tab-wrap">
        <view v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ 'is-active': tabIndex === index }" @click="onClickTab(index)">{{ tab }}</view>
      </view>
      <!-- 接口配置 -->
      <zm-setting-request v-if="tabIndex === 0"></zm-setting-request>
      <!-- 系统信息 -->
      <zm-setting-system v-if="tabIndex === 1"></zm-setting-system>
      <!-- 测试工具 -->
      <zm-setting-tools v-if="tabIndex === 2"></zm-setting-tools>
      <!-- webview入口 -->
      <zm-setting-webview v-if="tabIndex === 3"></zm-setting-webview>
    </zm-popup>
  </view>
</template>

<script>
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
import { mapGetters, mapMutations } from "vuex"
export default {
  name: "zm-setting",
  mixins: [hook, weixin],
  props: {
    developMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      env: null,
      visible: false,
      showPopup: false,
      tabs: ["请求设置", "系统信息", "测试工具", "webview"],
      tabIndex: 0
    }
  },
  computed: {
    show() {
      let hideEnvs = ["release", "production"]
      // #ifdef TEST-SERVER
      hideEnvs = []
      // #endif
      // const hideEnvs = ["release", "production", "trial"]
      return (this.visible && !hideEnvs.includes(this.env)) || this.developMode
    },
    ...mapGetters(["settingButtonPosition"])
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const { uniPlatform } = uni.getSystemInfoSync()
      this.env = uniPlatform === "mp-weixin" ? uni.getAccountInfoSync().miniProgram.envVersion : process.env.NODE_ENV
      this.visible = true
    },
    close() {
      this.showPopup = false
    },
    onClickTab(index) {
      this.tabIndex = index
    },
    onButtonChange({ detail }) {
      const { x, y } = detail
      uni.$debounce(() => {
        this.SET_SETTING_BUTTON_POSITION({ x, y })
      })
    },
    ...mapMutations(["SET_SETTING_BUTTON_POSITION"])
  }
}
</script>

<style lang="scss" scoped>
.zm-setting {
  width: 100%;
  display: flex;
  &__area {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    position: fixed;
    pointer-events: none;
    &__button {
      width: 150rpx;
      height: 60rpx;
      color: #fff;
      display: flex;
      font-size: 28rpx;
      align-items: center;
      border-radius: 12rpx;
      pointer-events: auto;
      justify-content: center;
      background-color: #04be02;
      box-shadow: 0 0 0.61538462em rgba(0, 0, 0, 0.4);
    }
  }
  .tab-wrap {
    width: 100%;
    height: 70rpx;
    display: flex;
    font-size: 28rpx;
    background-color: #ededed;
    border-bottom: 2rpx solid #d1d1d1;
    .tab-item {
      height: 100%;
      padding: 0 24rpx;
      display: flex;
      align-items: center;
      border-right: 2rpx solid #d1d1d1;
      &.is-active {
        background-color: #ffffff;
      }
    }
  }
}
</style>
