<template>
  <zm-view ref="view" height="300vh">
    <zm-navbar title="首页" gradient background="#ec0400"></zm-navbar>
    <zm-count-down :time="1000000 * 1000" ref="countdown" @change="onChange" @finish="onFinish"></zm-count-down>
    <zm-button @click="handleStart">开始</zm-button>
    <zm-button @click="handleReset">重置</zm-button>
    <zm-button @click="handlePause">暂停</zm-button>
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

const countdown = ref(null)
const tabbar = ref("1")
const checkbox = ref([])
const sidebar = ref(0)
const notice = ref([
  "那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。",
  "那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。",
])

const text = ref(
  "那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。",
)

function handleStart() {
  countdown.value.start()
}
function handleReset() {
  countdown.value.reset()
}
function handlePause() {
  countdown.value.pause()
}

function onChange(v) {
  console.log(v)
}
function onFinish() {
  console.log("onFinish")
}
</script>

<style lang="scss" scoped>
.cell {
  padding: 24rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}
</style>
