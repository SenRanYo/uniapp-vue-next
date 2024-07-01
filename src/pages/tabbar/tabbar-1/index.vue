<template>
  <zm-view ref="view" height="300vh">
    <zm-navbar title="首页" gradient background="#ec0400"></zm-navbar>
    <zm-progress :percentage="percentage"></zm-progress>
    <zm-row>
      <zm-col :span="4"><zm-tag text="标签一" type="primary"></zm-tag></zm-col>
      <zm-col :span="4"><zm-tag icon="close" text="标签二" type="success"></zm-tag></zm-col>
      <zm-col :span="4"><zm-tag icon="close" text="标签三" type="warning"></zm-tag></zm-col>
      <zm-col :span="4"><zm-tag icon="close" text="标签四" type="error"></zm-tag></zm-col>
      <zm-col :span="4"><zm-tag icon="close" text="标签五" type="info" closeable></zm-tag></zm-col>
    </zm-row>
    <zm-row>
      <zm-col :span="4"><zm-tag type="primary" text="标签一" plain></zm-tag></zm-col>
      <zm-col :span="4"><zm-tag icon="close" type="success" text="标签二" plain></zm-tag></zm-col>
      <zm-col :span="4"><zm-tag icon="close" type="warning" text="标签三" plain></zm-tag></zm-col>
      <zm-col :span="4"><zm-tag icon="close" type="error" text="标签四" plain></zm-tag></zm-col>
      <zm-col :span="4"><zm-tag icon="close" type="info" text="标签五" plain closeable></zm-tag></zm-col>
    </zm-row>
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
const percentage = ref(100)

setInterval(() => {
  percentage.value = Number((Math.random() * 100).toFixed(2))
}, 2000)
</script>

<style lang="scss" scoped>
.text {
  color: #fff;
  display: flex;
  font-size: 20rpx;
  padding: 2rpx 12rpx;
  align-items: center;
  border-radius: 999px;
  background-color: red;
}
</style>
