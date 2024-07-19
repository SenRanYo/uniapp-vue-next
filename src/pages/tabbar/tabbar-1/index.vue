<template>
  <zm-view ref="view" background="#ffffff">
    <zm-navbar title="首页" gradient background="#ec0400"></zm-navbar>
    <zm-calendar></zm-calendar>
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
import { FormValidateRule } from "@/ui/zm-form"

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
const form = ref({ aaa: "12", use: false, name: "", age: "", birthday: "", sec: "", address: "", explain: "" })
const formRef = ref(null)

const content = ref(`
					<p>露从今夜白，月是故乡明</p>
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
				`)

const rules = reactive<Record<string, FormValidateRule[]>>({
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    {
      required: true,
      message: "请输入姓名",
      trigger: "change",
      validator: (value, rule) => {
        console.log(value, rule)
        return true
      },
    },
    {
      required: true,
      message: "请输入姓名",
      trigger: "submit",
      validator: (value, rule) => {
        console.log(value, rule)
        return "失败321"
      },
    },
  ],
  age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
  birthday: [{ required: true, message: "请输入生日", trigger: "blur" }],
  sec: [{ required: true, message: "请选择性别", trigger: "blur" }],
  address: [{ required: true, message: "请输入家乡地址", trigger: "blur" }],
  explain: [{ required: true, message: "请选择职业", trigger: "blur" }],
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

defineExpose({ name: "aa" })
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
