<template>
  <view class="view">
    <view style="height: 300px"></view>
    <zm-sticky :offset-top="100">
      <view class="dom"></view>
    </zm-sticky>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { onPageScroll } from "@dcloudio/uni-app"

const value = ref("card")

onPageScroll((v) => {
  console.log(v)
})
</script>

<style lang="scss" scoped>
.view {
  height: 3000px;
  flex-shrink: 0;
}

.dom {
  margin: 30rpx;
  width: 100rpx;
  height: 100rpx;
  border-radius: 12rpx;
  background-color: red;
}
</style>
