<template>
  <zm-view ref="view" height="300vh" background="#fff" custom-style="padding: 0 24rpx">
    <view class="border">
      <zm-navbar title="首页" gradient background="#ec0400"></zm-navbar>
      <zm-upload v-model="urls" accept="file" multiple :before-read="onBeforeRead"></zm-upload>
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

const urls = ref("https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg,https://fastly.jsdelivr.net/npm/@vant/assets/tree.jpeg")
const search = ref("")
const popup = ref(true)
const picker = ref(["130000", "130300", "130303"])
const columns = useCascaderAreaData()

watch(
  () => search.value,
  (val) => {
    console.log(val)
  },
)

function onChange(val) {
  console.log(val)
}

function onBeforeRead(files, next) {
  console.log(files)
}
</script>

<style lang="scss" scoped></style>
