<template>
  <zm-view ref="view" height="300vh">
    <zm-navbar title="首页" gradient background="#ec0400"></zm-navbar>
    <zm-back-top background="red" border-radius="999px"></zm-back-top>
    <zm-tabbar v-model="tabbar" route>
      <zm-tabbar-item name="1" icon="wap-home-o" route="/pages/tabbar/tabbar-1/index">Tabbar-1</zm-tabbar-item>
      <zm-tabbar-item name="2" icon="new-o" route="/pages/tabbar/tabbar-2/index">Tabbar-2</zm-tabbar-item>
      <zm-tabbar-item name="3" icon="bag-o" route="/pages/tabbar/tabbar-3/index">Tabbar-3</zm-tabbar-item>
      <zm-tabbar-item name="4" icon="thumb-circle-o" route="/pages/tabbar/tabbar-4/index">Tabbar-4</zm-tabbar-item>
      <zm-tabbar-item name="5" icon="user-o" route="/pages/tabbar/tabbar-5/index">Tabbar-5</zm-tabbar-item>
    </zm-tabbar>
    <zm-dialog ref="dialog"></zm-dialog>
  </zm-view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useView } from "@/ui"

const { view, onPageScroll } = useView()

const tabbar = ref("1")
const checkbox = ref([])
const sidebar = ref(0)
</script>

<style lang="scss" scoped>
.cell {
  padding: 24rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}
</style>
