<template>
  <view class="zm-calendar-footer">
    <zm-button round>确认</zm-button>
  </view>
</template>
<script setup lang="ts">
import dayjs from "dayjs"
import { useParent } from "../hooks"
import { getDateByOffset } from "../utils/date"
import { calendarKey, calendarHeaderEmits, calendarHeaderProps } from "./index"

defineOptions({ name: "zm-calendar-footer" })

defineExpose({ name: "zm-calendar-footer" })
</script>
<script lang="ts">
export default {
  name: "zm-calendar-footer",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-calendar-footer {
  padding: 12rpx 24rpx;
}
</style>
