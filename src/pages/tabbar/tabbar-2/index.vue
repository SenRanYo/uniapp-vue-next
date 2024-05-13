<template>
  <view class="view">
    <view class="test"></view>
    <zm-tabs :list="list" v-model="value" @change="onChange"></zm-tabs>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"

const list = ref([
  { text: "优惠券", value: "coupon" },
  { text: "电影卡", value: "card" },
])

const value = ref("card")

watch(
  () => value.value,
  (v) => {
    console.log(v)
  },
)

setTimeout(() => {
  value.value = "coupon"
}, 5000)

function onChange(v) {
  console.log(v)
}
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
