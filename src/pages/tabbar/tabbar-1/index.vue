<template>
  <zm-view>
    <zm-tabbar v-model="tabbar" route>
      <zm-tabbar-item name="1" icon="wap-home-o" route="/pages/tabbar/tabbar-1/index">Tabbar-1</zm-tabbar-item>
      <zm-tabbar-item name="2" icon="new-o" route="/pages/tabbar/tabbar-2/index">Tabbar-2</zm-tabbar-item>
      <zm-tabbar-item name="3" icon="bag-o" route="/pages/tabbar/tabbar-3/index">Tabbar-3</zm-tabbar-item>
      <zm-tabbar-item name="4" icon="thumb-circle-o" route="/pages/tabbar/tabbar-4/index">Tabbar-4</zm-tabbar-item>
      <zm-tabbar-item name="5" icon="user-circle-o" route="/pages/tabbar/tabbar-5/index">Tabbar-5</zm-tabbar-item>
    </zm-tabbar>
  </zm-view>
</template>

<script setup lang="ts">
import { ref } from "vue"

const list = ref([])
const tabbar = ref("1")
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
