<template>
  <zm-view ref="view" background="#fff">
    <zm-navbar title="首页" gradient background="#ec0400"></zm-navbar>
    <zm-sidebar v-model="sidebar" width="300rpx" @change="onSidebarChange">
      <zm-sidebar-item :name="index" v-for="(item, index) in 30" :key="index" :title="`标签${index}标签${index}标签${index}标签${index}标签${index}`"></zm-sidebar-item>
    </zm-sidebar>
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

const { view } = useView()
const tabbar = ref("1")
const sidebar = ref(0)

function onSidebarChange(val: any) {
  // console.log(val)
}

setTimeout(() => {
  sidebar.value = 15
}, 3000)
</script>

<style lang="scss" scoped></style>
