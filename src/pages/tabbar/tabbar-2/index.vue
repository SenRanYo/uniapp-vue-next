<template>
  <zm-view ref="view">
    <view style="height: 3000px">
      <view style="height: 300px"></view>
      <zm-sticky>
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
  margin-top: 0;
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
  background-color: red;
}
</style>
