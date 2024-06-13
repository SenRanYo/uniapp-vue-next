<template>
  <zm-view ref="view" height="300vh" background="#fff">
    <view class="border">
      <zm-navbar title="首页" gradient background="#ec0400"></zm-navbar>
      <zm-popup v-model:show="popup" height="auto">
        <zm-picker v-model="picker" :columns="columns" @change="onChange"></zm-picker>
      </zm-popup>
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

const popup = ref(true)
const picker = ref([])
const columns = useCascaderAreaData()

watch(
  () => picker.value,
  (val) => {
    console.log(val)
  },
)

function onChange(val) {
  console.log(val)
}
</script>

<style lang="scss" scoped></style>
