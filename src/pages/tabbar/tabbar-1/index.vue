<template>
  <zm-view ref="view" height="300vh">
    <zm-navbar title="首页" gradient background="#ec0400"></zm-navbar>
    <zm-form ref="formRef" :model="form" :rules="rules">
      <zm-form-item label="默认" label-width="200rpx" prop="name">
        <zm-field v-model="form.name" clearable :rules="rules.name" colon></zm-field>
      </zm-form-item>
      <zm-form-item label="顶部label" label-align="top" label-width="200rpx">
        <zm-field v-model="value1" clearable label-align="top" :focus="focus" :rules="rules.name" colon></zm-field>
      </zm-form-item>
      <zm-form-item label="居中label" label-align="center" label-width="200rpx">
        <zm-field v-model="value1" clearable label-align="top" :focus="focus" :rules="rules.name" colon></zm-field>
      </zm-form-item>
      <zm-form-item label="居右label" label-align="right" label-width="200rpx">
        <zm-field v-model="value1" clearable label-align="top" :focus="focus" :rules="rules.name" colon></zm-field>
      </zm-form-item>
      <zm-form-item label="默认" label-width="200rpx">
        <zm-field v-model="value1" clearable :focus="focus" :rules="rules.name" colon type="textarea"></zm-field>
      </zm-form-item>
      <zm-form-item label="顶部label" label-align="top" label-width="200rpx">
        <zm-field v-model="value1" clearable label-align="top" :focus="focus" :rules="rules.name" colon type="textarea"></zm-field>
      </zm-form-item>
      <zm-form-item label="居中label" label-align="center" label-width="200rpx">
        <zm-field v-model="value1" clearable label-align="center" :focus="focus" :rules="rules.name" colon type="textarea"></zm-field>
      </zm-form-item>
      <!-- <zm-form-item label="居右label" label-align="right" label-width="200rpx">
        <zm-field v-model="value1" clearable label-align="right" :focus="focus" :rules="rules.name" colon type="textarea"></zm-field>
      </zm-form-item> -->
      <zm-button @click="submit">提交表单</zm-button>
      <zm-button @click="resetForm">重置表单</zm-button>
      <zm-button @click="resetFormValidate">重置表单验证</zm-button>
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
const form = ref({
  name: "1",
})
const formRef = ref(null)

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

function onChange(val) {
  console.log("change", val)
}

function submit() {
  formRef?.value
    .validate()
    .then((res) => {
      console.log("submit")
    })
    .catch((errors) => {
      console.log(errors)
    })
}

function resetForm() {
  formRef?.value.resetFields()
}
function resetFormValidate() {
  formRef?.value.clearValidate()
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
