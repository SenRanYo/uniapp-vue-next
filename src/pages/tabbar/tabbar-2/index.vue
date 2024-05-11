<template>
  <view class="view">
    <view class="test"></view>
    <zm-toast ref="toast"></zm-toast>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"

const toast = ref()
const state = ref(false)

state.value = true

nextTick(() => {
  toast.value.show({ type: "loading", content: "测试内容", duration: 3000 })
})
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
