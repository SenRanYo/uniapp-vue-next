<template>
  <zm-view ref="view">
    <view style="height: 3000px">
      <view style="height: 300px"></view>
      <zm-sticky :offset-top="100">
        <view class="dom"></view>
      </zm-sticky>
    </view>
  </zm-view>
</template>

<script setup lang="ts">
import { useView } from "@/ui"
const { view, mitt, onReachTop, onPageScroll } = useView()
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
