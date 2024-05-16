<template>
  <zm-view ref="view">
    <zm-safe-area-top></zm-safe-area-top>
    <zm-tabbar v-model="tabbar" @change="onChange">
      <zm-tabbar-item name="tabbar1">Tabbar-1</zm-tabbar-item>
      <zm-tabbar-item name="tabbar2">Tabbar-2</zm-tabbar-item>
      <zm-tabbar-item name="tabbar3">Tabbar-3</zm-tabbar-item>
      <zm-tabbar-item name="tabbar4">Tabbar-4</zm-tabbar-item>
      <zm-tabbar-item name="tabbar5">Tabbar-5</zm-tabbar-item>
    </zm-tabbar>
    <zm-safe-area-bottom @height="onEvent"></zm-safe-area-bottom>
  </zm-view>
</template>

<script setup lang="ts">
import { useView } from "@/ui"
const { view, mitt, onReachTop, onPageScroll } = useView()

const tabbar = ref("tabbar1")

function onChange(val) {
  console.log(val)
}

function onEvent(val) {
  console.log(val)
}
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
