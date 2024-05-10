<template>
  <view class="zm-setting-request">
    <view class="option-wrap">
      <u-radio-group v-model="currentEnv" placement="column" icon-placement="right" @change="onEnvChange">
        <!-- #ifdef MP-WEIXIN -->
        <view class="option-item">
          <u-radio label="微信开发环境" name="develop" label-size="28rpx" :active-color="useColor('theme')"> </u-radio>
        </view>
        <view class="option-item">
          <u-radio label="微信体验环境" name="trial" label-size="28rpx" :active-color="useColor('theme')"> </u-radio>
        </view>
        <view class="option-item">
          <u-radio label="微信正式环境" name="release" label-size="28rpx" :active-color="useColor('theme')"> </u-radio>
        </view>
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <view class="option-item">
          <u-radio label="开发环境" name="development" label-size="28rpx" :active-color="useColor('theme')"> </u-radio>
        </view>
        <view class="option-item">
          <u-radio label="测试环境" name="test" label-size="28rpx" :active-color="useColor('theme')"> </u-radio>
        </view>
        <view class="option-item">
          <u-radio label="正式环境" name="production" label-size="28rpx" :active-color="useColor('theme')"> </u-radio>
        </view>
        <!-- #endif -->
      </u-radio-group>
    </view>
    <view class="detail-wrap">
      <view class="detail-item">
        <text>环境：</text>
        <text>{{ envs[currentEnv].env }}</text>
      </view>
      <view class="detail-item">
        <text>接口地址：</text>
        <text>{{ envs[currentEnv].api }}</text>
      </view>
      <view class="detail-item">
        <text>渠道账号：</text>
        <text>{{ envs[currentEnv].account }}</text>
      </view>
      <view class="detail-item">
        <text>渠道密码：</text>
        <text>{{ envs[currentEnv].password }}</text>
      </view>
    </view>
    <view class="confirm-wrap">
      <zm-button type="primary" @click="onConfirmSetting">确认设置</zm-button>
    </view>
  </view>
</template>

<script>
import hook from "@/mixins/hook"
import weixin from "@/mixins/weixin"
import { envs } from "@/config/env"
import { mapGetters, mapMutations, mapActions } from "vuex"
export default {
  name: "zm-setting-request",
  mixins: [hook, weixin],
  data() {
    return {
      envs,
      setting: null,
      currentEnv: ""
    }
  },
  computed: {
    ...mapGetters(["env"])
  },
  watch: {
    env: {
      handler(v) {
        this.currentEnv = v
      },
      immediate: true
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.setting = this.useParent("zm-setting")
    },
    onEnvChange(v) {
      this.currentEnv = v
    },
    onConfirmSetting() {
      this.logout()
      this.SET_ENV(this.currentEnv)
      uni.$request.setConfig({ baseUrl: this.envs[this.currentEnv].api })
      this.getToken()
      this.setting.close()
      uni.$toast("设置成功")
    },
    ...mapActions(["logout", "getToken"]),
    ...mapMutations(["SET_SETTING_BUTTON_POSITION", "SET_ENV", "CLEAR_APP"])
  }
}
</script>

<style lang="scss" scoped>
.zm-setting-request {
  flex: 1;
  display: flex;
  flex-direction: column;
  .option-wrap {
    display: flex;
    padding: 0 24rpx;
    flex-direction: column;
    .option-item {
      width: 100%;
      padding: 24rpx 0;
      border-bottom: 2rpx solid #e9e9e9;
    }
  }
  .detail-wrap {
    padding: 24rpx;
    font-size: 28rpx;
    margin-top: auto;
    padding-bottom: 0;
  }
  .confirm-wrap {
    padding: 24rpx;
  }
}
</style>
