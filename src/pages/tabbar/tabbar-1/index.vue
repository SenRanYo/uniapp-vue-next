<template>
  <zm-view ref="view" height="300vh" background="#fff">
    <view class="border">
      <zm-navbar title="首页" gradient background="#ec0400"></zm-navbar>

      <zm-picker v-model="picker" :columns="columns" @change="onChange"></zm-picker>
      <zm-tabbar v-model="tabbar" route>
        <zm-tabbar-item name="1" icon="wap-home-o" route="/pages/tabbar/tabbar-1/index">Tabbar-1</zm-tabbar-item>
        <zm-tabbar-item name="2" icon="new-o" route="/pages/tabbar/tabbar-2/index">Tabbar-2</zm-tabbar-item>
        <zm-tabbar-item name="3" icon="bag-o" route="/pages/tabbar/tabbar-3/index">Tabbar-3</zm-tabbar-item>
        <zm-tabbar-item name="4" icon="thumb-circle-o" route="/pages/tabbar/tabbar-4/index">Tabbar-4</zm-tabbar-item>
        <zm-tabbar-item name="5" icon="user-o" route="/pages/tabbar/tabbar-5/index">Tabbar-5</zm-tabbar-item>
      </zm-tabbar>
      <zm-dialog ref="dialog"></zm-dialog>
    </view>
  </zm-view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useView } from "@/ui"
import { useCascaderAreaData } from "@vant/area-data"

const { view } = useView()
const tabbar = ref("1")
const options = useCascaderAreaData()
const cascaderValue = ref("")

const visible = ref(true)

const date = ref<any>(new Date())
const minDate = ref("2024-06-01 08:30:30")
const maxDate = ref("2024-06-09 20:30:30")

const picker = ref(["Fujian", "Xiamen", "Haicang"])
const columns = ref([
  {
    text: "浙江",
    value: "Zhejiang",
    children: [
      {
        text: "杭州",
        value: "Hangzhou",
        children: [
          { text: "西湖区", value: "Xihu" },
          { text: "余杭区", value: "Yuhang" },
        ],
      },
      {
        text: "温州",
        value: "Wenzhou",
        children: [
          { text: "鹿城区", value: "Lucheng" },
          { text: "瓯海区", value: "Ouhai" },
        ],
      },
    ],
  },
  {
    text: "福建",
    value: "Fujian",
    children: [
      {
        text: "福州",
        value: "Fuzhou",
        children: [
          { text: "鼓楼区", value: "Gulou" },
          { text: "台江区", value: "Taijiang" },
        ],
      },
      {
        text: "厦门",
        value: "Xiamen",
        children: [
          { text: "思明区", value: "Siming" },
          { text: "海沧区", value: "Haicang" },
        ],
      },
    ],
  },
])

watch(() => picker.value, (val) => {
  console.log(val);
})

function onChange(val) {
  console.log(val);
}
</script>

<style lang="scss" scoped></style>
