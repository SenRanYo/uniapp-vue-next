<template>
  <zm-view ref="view">
    <zm-safe-area-top></zm-safe-area-top>
    <zm-row justify="end">
      <zm-col :span="12">
        <zm-text-highlight text="这是一段文本内容" match="文本"></zm-text-highlight>
      </zm-col>
      <zm-col :span="12">
        <zm-icon name="close"></zm-icon>
      </zm-col>
      <zm-col :span="24">
        <zm-number-roll :value="count" font-size="32rpx" color="success"></zm-number-roll>
      </zm-col>
      <zm-col :span="24">
        <button @click="show = true">测试</button>
      </zm-col>
    </zm-row>
    <zm-safe-area-bottom @height="onEvent"></zm-safe-area-bottom>

    <zm-popup v-model:show="show" ref="popup">
      <view style="height: 200px; background: green"></view>
    </zm-popup>
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
import { useView } from "@/ui"
const { view, mitt, onReachTop, onPageScroll } = useView()

const show = ref(false)
const count = ref(0)
const tabbar = ref("2")

function onChange(val) {
  console.log(val)
}

function onEvent(val) {}

function onClickOverlay() {
  show.value = !show.value
}

setTimeout(() => {
  count.value = 100
}, 2000)
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
