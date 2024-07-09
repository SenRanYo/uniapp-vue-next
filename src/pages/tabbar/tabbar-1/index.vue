<template>
  <zm-view ref="view" height="300vh">
    <zm-navbar title="首页" gradient background="#ec0400"></zm-navbar>
    <zm-dropdown-menu>
      <zm-dropdown-item title="衣服" v-model="value" :options="options1"></zm-dropdown-item>
    </zm-dropdown-menu>
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

const popup = ref(false)
const loading = ref(false)
const switchValue = ref("1")

const value = ref(1)
const options1 = ref([
  { label: "选项一", value: 1 },
  { label: "选项二", value: 2 },
  { label: "选项三", value: 3 },
  { label: "选项四", value: 4 },
  { label: "选项五", value: 5 },
])

const options2 = ref([
  { label: "选项一", value: 1 },
  { label: "选项二", value: 2 },
  { label: "选项三", value: 3 },
  { label: "选项四", value: 4 },
  { label: "选项五", value: 5 },
])

const options3 = ref([
  { label: "选项一", value: 1 },
  { label: "选项二", value: 2 },
  { label: "选项三", value: 3 },
  { label: "选项四", value: 4 },
  { label: "选项五", value: 5 },
])

watch(
  () => value.value,
  (newValue, oldValue) => {
    console.log(newValue)
  },
)

setTimeout(() => {
  value.value = 2
}, 5000)
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

.box {
  width: 200rpx;
  height: 200rpx;
  background-color: green;
}
</style>
