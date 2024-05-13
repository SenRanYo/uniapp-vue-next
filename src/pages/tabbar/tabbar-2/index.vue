<template>
  <view class="view">
    <view class="test"></view>
    <zm-tabs :list="list" :value="value"></zm-tabs>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"

const list = ref([
  { text: "优惠券", value: "coupon" },
  { text: "电影卡", value: "card" },
])

const value = ref("coupon")
</script>

<style lang="scss" scoped>
.test {
  width: 750rpx;
}

.dom {
  margin: 30rpx;
  width: 100rpx;
  height: 100rpx;
  border-radius: 12rpx;
  background-color: red;
}
</style>
