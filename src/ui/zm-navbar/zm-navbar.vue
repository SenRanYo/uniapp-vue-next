<template>
  <view class="zm-navbar">
    <view class="zm-navbar__inner" :class="{ 'is-fixed': fixed, 'is-border': borderBottom }" :style="[innerStyle]">
      <view class="zm-navbar__content" :style="[contentStyle]">
        <view v-if="$slots.left" class="zm-navbar__left">
          <slot name="left"></slot>
        </view>
        <view v-else-if="isBack" class="zm-navbar__back" @tap="back">
          <zm-icon :name="backIcon" :color="backIconColor" :size="backIconSize"></zm-icon>
          <view v-if="backText" class="zm-navbar__back__text" :style="[backTextStyle]">{{ backText }}</view>
        </view>
        <view v-if="$slots.default" class="zm-navbar__default">
          <slot></slot>
        </view>
        <view v-else-if="title || $slots.title" class="zm-navbar__title" :style="[titleStyle]">
          <slot name="title">{{ title }}</slot>
        </view>
        <view v-if="$slots.right" class="zm-navbar__right">
          <slot name="right"></slot>
        </view>
      </view>
    </view>
    <view class="zm-navbar__placeholder" :style="[placeholderStyle]"></view>
  </view>
</template>
<script setup lang="ts">
import { viewKey } from "../zm-view"
import { useRgb } from "../utils/style"
import { navbarEmits, navbarProps } from "./index"
import { useStyle, useUnit, useUnitToPx, useElRect, useParent } from "../hooks"

defineOptions({ name: "zm-navbar" })
const emits = defineEmits(navbarEmits)
const props = defineProps(navbarProps)

const systemInfo = uni.getSystemInfoSync()
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
// #endif
const rect = ref<UniApp.NodeInfo>({})
const bRgb = ref<any>({})
const route = ref("")
const routes = ref([])
const scrollTop = ref(0)
const statusBarHeight = systemInfo.statusBarHeight
const instance = getCurrentInstance()
const { parent } = useParent(viewKey)

const backIcon = computed(() => {
  return routes.value.length == 1 ? "wap-home-o" : props.backIconName
})

const innerStyle = computed(() => {
  const { r, g, b } = bRgb.value
  return useStyle({
    zIndex: props.zIndex,
    background: props.gradient ? `rgba(${r},${g},${b},${scrollTop.value / useUnitToPx(props.gradientHeight)})` : props.background,
    ...useStyle(props.customStyle),
  })
})

const contentStyle = computed(() => {
  const style: any = {}
  style.height = navbarHeight.value + "px"
  style.marginTop = statusBarHeight + "px"
  style.paddingLeft = useUnit(props.padding)
  style.paddingRight = useUnit(props.padding)
  // #ifdef MP
  if (systemInfo.deviceType !== "pc") {
    style.marginRight = systemInfo.windowWidth - menuButtonInfo.left + "px"
  }
  // #endif
  if (props.height) style.alignItems = "flex-start"
  return useStyle(style)
})
const backTextStyle = computed(() => {
  const style: any = {}
  style.color = props.backTextColor
  style.fontSize = props.backTextSize
  return useStyle(style)
})

// 导航中间的标题的样式
const titleStyle = computed(() => {
  let style: any = {}
  if (props.titleCenter) {
    // #ifndef MP
    style.left = (systemInfo.windowWidth - useUnitToPx(props.titleWidth)) / 2 + "px"
    style.right = (systemInfo.windowWidth - useUnitToPx(props.titleWidth)) / 2 + "px"
    // #endif
    // #ifdef MP
    // 此处是为了让标题显示区域即使在小程序有右侧胶囊的情况下也能处于屏幕的中间，是通过绝对定位实现的
    let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left
    style.left = (systemInfo.windowWidth - useUnitToPx(props.titleWidth)) / 2 + "px"
    style.right = rightButtonWidth - (systemInfo.windowWidth - useUnitToPx(props.titleWidth)) / 2 + rightButtonWidth + "px"
    // #endif
    style.width = useUnitToPx(props.titleWidth) + "px"
    style.position = "absolute"
    style.justifyContent = "center"
  }

  style.color = props.titleColor
  style.fontSize = props.titleSize
  style.fontWeight = props.titleWeight
  return useStyle(style)
})

const navbarHeight = computed(() => {
  let height = systemInfo.osName == "ios" ? 44 : 48
  // #ifdef MP
  height = Math.min(menuButtonInfo.height + Math.max(menuButtonInfo.top - statusBarHeight, 0) * 2, 44)
  // #endif
  return props.height ? +useUnitToPx(props.height) : +height
})

const placeholderStyle = computed(() => {
  const style: any = {}
  style.height = 0
  if (props.fixed && !props.immersive) style.height = navbarHeight.value + statusBarHeight + "px"
  return useStyle(style)
})

watch(
  () => navbarHeight.value,
  () => {
    emits("height", useUnitToPx(navbarHeight.value) + statusBarHeight)
  },
  { immediate: true },
)

watch(
  () => props.background,
  (val) => {
    if (val && props.gradient) bRgb.value = useRgb(val)
  },
  { immediate: true },
)

function onEvent() {
  parent?.mitt.on("navbar.rect.emit", async () => {
    parent.mitt.emit("navbar.rect", await useElRect(".zm-navbar__inner", instance))
  })

  parent?.mitt.on("scroll", (options: Page.PageScrollOption) => {
    if (props.gradient) {
      scrollTop.value = options.scrollTop
      emits("gradient", scrollTop.value)
    }
  })
}

async function resize() {
  await nextTick()
  routes.value = getCurrentPages()
  route.value = routes.value[routes.value.length - 1]?.route
  rect.value = await useElRect(".zm-navbar__inner", instance)
  emits("rect", rect.value)
  emits("height", rect.value.height)
  parent?.mitt.emit("navbar.rect", rect.value)
}

function back() {
  if (typeof props.customBack === "function") {
    props.customBack()
  } else {
    if (routes.value.length == 1) {
      // #ifdef WEB
      uni.reLaunch({ url: "/pages/tabbar/tabbar-1/tabbar-1" })
      // #endif

      // #ifndef WEB
      uni.switchTab({ url: "/pages/tabbar/tabbar-1/tabbar-1" })
      // #endif
    } else {
      uni.navigateBack()
    }
  }
}

onEvent()
onMounted(() => resize())
defineExpose({ name: "zm-navbar" })
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
<style lang="scss" scoped>
.zm-navbar {
  width: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  &__inner {
    flex: 1;
    display: flex;
    position: relative;
    flex-direction: column;

    &.is-fixed {
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      position: fixed;
    }

    &.is-border::before {
      left: 0;
      right: 0;
      bottom: 0;
      content: "";
      position: absolute;
      border-bottom: 1rpx solid #e4e7ed;
    }
  }

  &__left {
    height: 100%;
    display: flex;
    flex-shrink: 0;
    align-items: center;
  }

  &__content {
    height: 100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
  }

  &__default {
    flex: 1;
  }

  &__back {
    height: 100%;
    display: flex;
    flex-shrink: 0;
    align-items: center;

    &__text {
      padding-left: 4rpx;
    }
  }

  &__title {
    flex: 1;
    flex-shrink: 0;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__right {
    height: 100%;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: flex-end;
  }

  &__placeholder {
    width: 100%;
    flex-shrink: 0;
  }
}
</style>
