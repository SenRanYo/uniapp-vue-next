<template>
  <view class="zm-back-top" hover-class="zm-back-top--hover" :hover-stay-time="100" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <slot>
      <view class="zm-back-top__content">
        <zm-icon name="back-top" size="40rpx" color="#fff" weight="bold"></zm-icon>
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { viewKey } from "../zm-view"
import { backTopEmits, backTopProps } from "./index"
import { useStyle, useColor, useUnit, useParent, useElRect, useUnitToPx } from "../hooks"

defineOptions({ name: "zm-back-top" })

const emits = defineEmits(backTopEmits)
const props = defineProps(backTopProps)
const { parent } = useParent(viewKey)

const visible = ref(false)

const classs = computed(() => {
  const list: any = []
  if (visible.value) list.push("zm-back-top--active")
  return list
})

const style = computed(() => {
  const style: any = {}
  style.right = useUnit(props.right)
  style.bottom = useUnit(props.bottom)
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.borderRadius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

watch(
  () => parent.scrollTop.value,
  (top) => {
    console.log(top)
    visible.value = top >= useUnitToPx(props.offset)
  },
)

function onClick(event: TouchEvent) {
  uni.pageScrollTo({ scrollTop: 0, duration: +props.duration })
  emits("click", event)
}

defineExpose({ name: "zm-back-top" })
</script>
<script lang="ts">
export default {
  name: "zm-back-top",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss">
.zm-back-top {
  right: 24rpx;
  bottom: 200rpx;
  display: flex;
  position: fixed;
  transform: scale(0);
  background-color: var(--primary-color);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

  &--hover {
    opacity: 0.6;
  }

  &--active {
    transform: scale(1);
  }

  &__content {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    /* #ifndef MP-WEIXIN */
    cursor: pointer;
    /* #endif */
    align-items: center;
    border-radius: 999px;
    justify-content: center;
    box-shadow: 0 2px 8px 0 rgb(0 0 0 / 12%);
  }
}
</style>
