<template>
  <zm-view ref="view" height="300vh" background="#fff">
    <zm-navbar title="首页" gradient background="#ec0400"></zm-navbar>
    <zm-cascader v-model="cascaderValue" :options="options" title="请选择地区" @change="onCascaderChange"></zm-cascader>
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
import { useView, DialogExpose } from "@/ui"

const { view } = useView()

const list = ref([])
const tabbar = ref("1")
const actions = ref([{ title: "选项一" }, { title: "选项二" }, { title: "选项三" }, { title: "选项四" }])
const dialog = ref<DialogExpose>(null)
const showDialog = ref(false)
const showaAtions = ref(false)
const radio = ref("1")

const options = ref([
  { text: "北京省", value: "1", children: [{ text: "北京市", value: "10" }] },
  { text: "四川省", value: "2", children: [{ text: "达州市", value: "20" }] },
])
const cascaderValue = ref("0")

function handleGetData({ page, pageSize, type, success }) {
  if (type == "load") {
    setTimeout(() => {
      const l = Array.from({ length: pageSize }, (_, i) => i)
      list.value = list.value.concat(l)
      success({ list: l, total: 80 })
    }, 100)
  }
  if (type == "refresh") {
    setTimeout(() => {
      const l = Array.from({ length: pageSize }, (_, i) => i)
      list.value = l
      success({ list: l, total: 80 })
    }, 1000)
  }
}

function onCascaderChange(val) {
  console.log(val)
}

function onCheckboxChange(v) {
  console.log(v)
}

function handleClick() {
  showaAtions.value = true
  // dialog.value?.open({
  //   title: "温馨提示",
  //   content: "一个组合商品至多支持添加5个商品,同一个商品可搭配多个数量,多规格商品只能选择其中一个规格参与搭建",
  //   asyncClose: true,
  //   showCancelButton: true,
  //   showConfirmButton: true,
  //   closeOnClickOverlay: false,
  //   onConfirm: ({ close, done }) => {
  //     setTimeout(() => {
  //       done()
  //     }, 2000)
  //   },
  // })
}
</script>

<style lang="scss" scoped>
.p-24 {
  padding: 24rpx;
}

.zm-line {
  display: flex;
  flex-shrink: 0;
}
</style>
