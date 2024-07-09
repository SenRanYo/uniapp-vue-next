<template>
  <zm-view ref="view" height="300vh">
    <zm-navbar title="首页" gradient background="#ec0400"></zm-navbar>
    <view style="margin-top: 600rpx">
      <zm-dropdown-menu direction="up">
        <zm-dropdown-item
          borderRadius="32rpx"
          title="全部商品"
          v-model="value1"
          :options="options1"
          mode="multiple"
          direction="down"
          background="success"
          option-size="32rpx"
          option-color="red"
          option-weight="bold"
          activeOptionColor="pink"
          @change="onChange"
        ></zm-dropdown-item>
        <zm-dropdown-item :duration="200" title="默认排序" v-model="value2" :options="options2" mode="single" @change="onChange"></zm-dropdown-item>
      </zm-dropdown-menu>
    </view>
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

const value1 = ref("1")
const value2 = ref(1)
const value3 = ref(1)

const options1 = ref([
  { label: "全部商品", value: "1" },
  { label: "新款商品", value: "2" },
  { label: "活动商品", value: "3" },
  { label: "爆款商品", value: "4" },
  { label: "热卖商品", value: "5" },
])

const options2 = ref([
  { label: "默认排序", value: 1 },
  { label: "好评排序", value: 2 },
  { label: "销量排序", value: 3 },
])

const options3 = ref([
  { label: "价格", icon: "arrow-sort", value: 1 },
  { label: "价格", icon: "arrow-up", value: 2 },
  { label: "价格", icon: "arrow-down", value: 3 },
])

function onChange(val) {
  console.log("change", val)
}
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
