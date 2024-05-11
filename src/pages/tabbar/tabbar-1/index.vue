<template>
  <view class="test">
    <view class="item" v-for="(item, index) in 50" :key="index"></view>
  </view>
  <!-- <zm-list ref="listRef" :options="options" @query="handleGetData">
    <view v-for="(item, index) in list" :key="index" class="list-item">{{ index }}</view>
  </zm-list> -->
</template>

<script setup lang="ts">
import { ref } from "vue"
import { onPageScroll, onReachBottom } from "@dcloudio/uni-app"
// 监听滚动触底
onReachBottom(() => {
  // console.log("zm-view.onReachBottom")
})

onPageScroll(() => {})

const list = ref([])
const options = reactive({ size: 15 })
function handleGetData({ page, pageSize, type, success }) {
  if (type == "load") {
    setTimeout(() => {
      const l = Array.from({ length: pageSize }, (_, i) => i)
      list.value = list.value.concat(l)
      success({ list: l, total: 80 })
    }, 100)
  }
  if (type == "refresh") {
    setTimeout(() => {
      const l = Array.from({ length: pageSize }, (_, i) => i)
      list.value = l
      success({ list: l, total: 80 })
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
}

.test {
  height: 200vh;
}

.item {
  height: 80rpx;
  margin: 30rpx;
  border: 1px solid red;
}
</style>
