<template>
  <zm-view ref="view" height="300vh">
    <zm-navbar title="首页" gradient background="#ec0400"></zm-navbar>
    <zm-form ref="form">
      <zm-field prop="name" label="可清除" v-model="value1" clearable label-align="top" :focus="focus" :rules="rules.name" colon></zm-field>
      <zm-field label="年级" v-model="value2" label-align="center" label-width="200rpx"></zm-field>
      <zm-field label="成绩" v-model="value3" label-align="right" label-width="200rpx"></zm-field>
      <zm-field label="默认Textarea" v-model="value4" type="textarea"></zm-field>
      <zm-field label="Top Label Textarea" v-model="value4" type="textarea" label-align="top"></zm-field>
      <zm-field label="Center Label Textarea" v-model="value4" type="textarea" label-align="center" label-width="200rpx"></zm-field>
      <zm-field label="Right Label Textarea" v-model="value4" type="textarea" label-align="right" label-width="200rpx"></zm-field>
      <zm-button @click="submit">提交表单</zm-button>
    </zm-form>
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

const value = ref("")
const textarea = ref("")
const value1 = ref("")
const value2 = ref("2")
const value3 = ref("3")
const value4 = ref("")
const focus = ref(false)
const form = ref(null)

const rules = reactive({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  age: [],
})

watch(
  () => textarea.value,
  (val) => {
    console.log(val)
  },
)

setTimeout(() => {
  focus.value = true
}, 1000)

function onChange(val) {
  console.log("change", val)
}

function submit() {
  form?.value
    .validate()
    .then((res) => {
      console.log("submit")
    })
    .catch((errors) => {
      console.log(errors)
    })
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
