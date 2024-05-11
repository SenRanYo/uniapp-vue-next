<template>
  <view class="item" v-for="(item, index) in 50" :key="index"></view>
  <!-- <zm-list ref="listRef" :options="options" @query="handleGetData">
    <view v-for="(item, index) in list" :key="index" class="list-item">{{ index }}</view>
  </zm-list> -->
</template>

<script setup lang="ts">
import { ref } from "vue"

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
.item {
  height: 80rpx;
  margin: 30rpx;
  flex-shrink: 0;
  border: 1px solid red;
}
</style>
