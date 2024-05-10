<template>
  <view class="zm-list">
    <slot name="header"></slot>
    <view class="zm-list__inner">
      <scroll-view
        class="zm-list__view"
        enable-flex
        scroll-anchoring
        enable-back-to-top
        :upper-threshold="5"
        :state="state"
        :style="[viewStyle]"
        :scroll-y="scrollY"
        :change:state="wxs.onState"
        :lower-threshold="useOptions.lowerThreshold"
        :pulldownRefreshStatus="pulldownRefreshStatus"
        :change:pulldownRefreshStatus="wxs.onPulldownRefreshStatus"
        @scroll="scroll"
        @touchend="wxs.touchend"
        @touchmove="wxs.touchmove"
        @touchstart="wxs.touchstart"
        @touchcancel="wxs.touchcancel"
        @scrolltoupper="scrolltoupper"
        @scrolltolower="scrolltolower"
      >
        <view class="zm-list__touch">
          <view class="zm-list__main" :class="{ 'safe-area-inset-bottom': useOptions.safeArea }" :style="[mainStyle]">
            <view v-if="isShowRefresh" class="zm-list__refresh">
              <slot name="refresh">
                <view class="refresh-inner">
                  <view class="refresh-icon" :class="{ open: pulldownRefreshStatus === 'open' }" :style="[refreshIconStyle]"></view>
                  <text class="refresh-text" :style="[refreshTextStyle]">{{ refreshStatusText }}</text>
                </view>
              </slot>
            </view>
            <view v-if="isShowEmpty" class="zm-list__empty">
              <slot name="empty">
                <view class="empty-inner">
                  <image class="empty-image" :src="useOptions.emptyImage" mode="aspectFit"></image>
                  <text class="empty-text" :style="[emptyTextStyle]">{{ useOptions.emptyText }}</text>
                </view>
              </slot>
            </view>
            <view v-else class="zm-list__content">
              <slot></slot>
            </view>
            <view v-if="isShowLoad" class="zm-list__load">
              <slot name="load">
                <view class="load-inner">
                  <view v-if="loading" class="load-animation" :style="[loadIconStyle]"></view>
                  <text class="load-text" :style="[loadTextStyle]">{{ loadStatusText }}</text>
                </view>
              </slot>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <slot name="footer"></slot>
  </view>
</template>

<script src="./wxs/index.wxs" module="wxs" lang="wxs"></script>
<script>
import { defineEmits } from "vue"
import { pick, debounce } from "../utils/utils"
import { useStyle, useUnitToPx, useRgb, useUnit } from "../utils/style"
const { uniPlatform } = uni.getSystemInfoSync()

export default defineComponent({
  props: { options: { type: Object, default: () => ({}) } },
  emits: ["load", "query", "refresh", "scroll", "scrolltoupper", "scrolltolower"],
  setup(props, context) {
    const instance = getCurrentInstance()
    const isTop = ref(true)
    const isBottom = ref(false)
    const isTouch = ref(false)
    const loaded = ref(false)
    const loading = ref(false)
    const scrollY = ref(true)
    const refreshing = ref(false)
    const scrollTop = ref(0)
    const pulldownHeight = ref(0)
    const pullupLoadStatus = ref("")
    const pulldownRefreshStatus = ref("")
    const maxReloadCount = ref(0)

    const viewRect = ref({})
    const touchRect = ref({})
    const state = ref({
      isTop: true,
      isBottom: false,
      toTopTimestamp: null,
      pulldownSpeed: 0.5,
      pulldownThreshold: 80,
      pulldownRefreshFinishDelay: 800,
      disablePulldownRefresh: false,
      platform: uniPlatform,
    })
    const paging = reactive({
      page: 1,
      size: 15,
      list: [],
      total: Infinity,
    })
    const useOptions = ref({
      page: 1, // 当前分页
      size: 15, // 分页大小
      auto: true, // 是否自动加载
      height: "100%", // 列表高度
      pageKey: "page", // 分页参数名
      sizeKey: "pageSize", // 分页大小参数名
      safeArea: false, // 是否开启安全区域适配
      pulldownSpeed: 0.5, // 下拉速度
      pulldownThreshold: 60, // 下拉阈值
      pulldownRefreshDelay: 300, // 下拉刷新延迟
      pulldownRefreshFinishDelay: 800, // 下拉刷新完成后的延迟
      pullupThreshold: 40, // 距离底部上拉加载距离
      disablePullupLoad: false, // 是否禁用上拉加载
      disablePulldownRefresh: false, // 是否禁用下拉刷新
      emptyTextColor: "#82848a", // 空提示文字颜色
      loadTextColor: "#82848a", // 上拉加载文字颜色
      loadIconColor: "#82848a", // 上拉加载图标颜色
      refresherTextColor: "#82848a", // 下拉刷新文字颜色
      refresherIconColor: "#82848a", // 下拉刷新图标颜色
      emptyImage: "https://public-oss-file.zmaxfilm.com/zuimei-film-oss/1.0.0/empty/zwsj-empty.png", // 空数据图片
      emptyText: "暂无内容~", // 空数据提示文字
      pulldownText: "下拉刷新~", // 下拉中的文字
      pulldownFinishText: "松开刷新~", // 下拉完成的文字
      loadText: "正在加载中~", // 加载中文字
      loadFailText: "加载失败啦~", // 加载失败文字
      loadFinishText: "没有更多啦~", // 加载全部完成
      refreshingText: "正在刷新~", // 正在刷新文字
      refreshFailText: "刷新失败~", // 刷新失败文字
      refreshSuccessText: "刷新成功~", // 刷新成功文字
    })

    // 是否显示下拉刷新
    const isShowEmpty = computed(() => paging.total == 0)
    // 是否显示空数据
    const isShowRefresh = computed(() => useOptions.value.disablePulldownRefresh == false)
    // 是否显示下拉加载
    const isShowLoad = computed(() => {
      if (refreshing.value) return false
      if (isShowEmpty.value) return false
      return useOptions.value.disablePullupLoad == false
    })
    // scroll-view样式
    const viewStyle = computed(() => {
      const style = {}
      if (useOptions.value.height === "auto") style.position = "static"
      else style.height = useUnit(useOptions.value.height)
      return useStyle(style)
    })
    // 内容样式
    const mainStyle = computed(() => {
      const style = {}
      if (isShowEmpty.value) style.height = "100%"
      return useStyle(style)
    })
    // 加载状态文字
    const loadStatusText = computed(() => {
      switch (pullupLoadStatus.value) {
        case "load":
          return useOptions.value.loadText
        case "fail":
          return useOptions.value.loadFailText
        case "finish":
          return useOptions.value.loadFinishText
        default:
          return ""
      }
    })
    // 加载状态图标样式
    const loadIconStyle = computed(() => {
      const style = {}
      const { r, g, b } = useRgb(useOptions.value.loadIconColor)
      style.borderColor = `rgba(${r},${g},${b},0.2)`
      style.borderTopColor = useOptions.value.loadIconColor
      return useStyle(style)
    })
    // 加载状态文字样式
    const loadTextStyle = computed(() => useStyle({ color: useOptions.value.loadTextColor }))
    // 刷新状态文字
    const refreshStatusText = computed(() => {
      switch (pulldownRefreshStatus.value) {
        case "open":
          return useOptions.value.refreshingText
        case "fail":
          return useOptions.value.refreshFailText
        case "wait":
          return useOptions.value.pulldownFinishText
        case "success":
          return useOptions.value.refreshSuccessText
        default:
          return useOptions.value.pulldownText
      }
    })
    // 刷新状态图标样式
    const refreshIconStyle = computed(() => {
      const style = {}
      const { r, g, b } = useRgb(useOptions.value.refresherIconColor)
      const rate = pulldownHeight.value / useOptions.value.pulldownThreshold
      style.borderColor = `rgba(${r},${g},${b},0.2)`
      style.borderTopColor = useOptions.value.refresherIconColor
      if (pulldownRefreshStatus.value !== "open") {
        style.transform = `rotate(${360 * rate}deg)`
      }
      return useStyle(style)
    })
    // 刷新状态文字样式
    const refreshTextStyle = computed(() => {
      const style = {}
      style.color = useOptions.value.refresherTextColor
      return useStyle(style)
    })
    // 空数据提示文字样式
    const emptyTextStyle = computed(() => useStyle({ color: useOptions.value.emptyTextColor }))

    // 监听props变化
    watch(
      () => props.options,
      (options) => {
        useOptions.value = Object.assign(useOptions.value, options)
        paging.page = useOptions.value.page
        paging.size = useOptions.value.size
        state.value = Object.assign(state.value, pick(useOptions.value, ["pulldownSpeed", "pulldownThreshold", "pulldownRefreshFinishDelay", "disablePulldownRefresh"]))
      },
      { deep: true, immediate: true },
    )

    // 重新获取大小
    async function resize(d = false) {
      const handle = async () => {
        viewRect.value = await useRect(".zm-list__view")
        touchRect.value = await useRect(".zm-list__touch")
      }
      if (d) debounce(handle, 150, true)
      else await handle()
    }
    // 查询数据
    function query(options = { type: "" }) {
      const { type = "refresh" } = options
      if (type === "load") load(options)
      if (type === "refresh") refresh(options)
    }
    // 自动加载
    async function auto() {
      await resize()
      const height = viewRect.value.height * 2
      if (maxReloadCount.value >= 5) throw new Error("自动重新加载次数超过5次，请检查网络或数据源是否正确")
      if (touchRect.value.height < height) load()
    }
    // 加载数据
    function load(options = {}) {
      if (loading.value) return
      if (useOptions.value.disablePullupLoad) return
      if (paging.list.length >= paging.total) return
      loading.value = true
      pullupLoadStatus.value = "load"
      context.emit("load", { [useOptions.value.sizeKey]: paging.size, [useOptions.value.pageKey]: paging.page, type: "load", fail: loadFail, success: loadSuccess })
      context.emit("query", { [useOptions.value.sizeKey]: paging.size, [useOptions.value.pageKey]: paging.page, type: "load", fail: loadFail, success: loadSuccess })
    }
    // 加载失败
    function loadFail() {
      loaded.value = true
      loading.value = false
      pullupLoadStatus.value = "fail"
    }
    // 加载成功
    function loadSuccess({ list, total }) {
      maxReloadCount.value = paging.list.length == list.length ? maxReloadCount.value + 1 : 0
      paging.page++
      paging.list = [...paging.list, ...list]
      paging.total = total
      loaded.value = true
      loading.value = false
      pullupLoadStatus.value = paging.list.length >= total ? "finish" : ""
      auto()
    }
    // 刷新数据
    function refresh(options = {}) {
      if (refreshing.value) return
      if (useOptions.value.disablePulldownRefresh) return
      paging.page = useOptions.value.page
      loading.value = true
      refreshing.value = true
      maxReloadCount.value = 0
      pullupLoadStatus.value = "load"
      context.emit("refresh", { [useOptions.value.sizeKey]: paging.size, [useOptions.value.pageKey]: paging.page, type: "refresh", fail: refreshFail, success: refreshSuccess })
      context.emit("query", { [useOptions.value.sizeKey]: paging.size, [useOptions.value.pageKey]: paging.page, type: "refresh", fail: refreshFail, success: refreshSuccess })
    }
    // 刷新失败
    function refreshFail() {
      loaded.value = true
      refreshing.value = false
      pulldownRefreshStatus.value = "fail"
    }
    // 刷新成功
    function refreshSuccess({ list, total }) {
      paging.list = list
      paging.total = total
      loaded.value = true
      loading.value = false
      refreshing.value = false
      pullupLoadStatus.value = ""
      pulldownRefreshStatus.value = "success"
      if (paging.list.length >= total) pullupLoadStatus.value = "finish"
      auto()
    }
    function dragPulldownRefresh(state) {
      scrollY.value = false
      pulldownHeight.value = state.pulldownHeight
      pulldownRefreshStatus.value = state.pulldownRefreshStatus
    }
    // 开启下拉刷新
    function openPulldownRefresh(state) {
      setTimeout(() => {
        refresh()
      }, useOptions.value.pulldownRefreshDelay)
      pulldownRefreshStatus.value = state.pulldownRefreshStatus
    }
    // 取消下拉刷新
    function cancelPulldownRefresh(state) {
      scrollY.value = true
    }
    // 失败下拉刷新
    function failPulldownRefresh(state) {
      scrollY.value = true
    }
    // 成功下拉刷新
    function successPulldownRefresh(state) {
      scrollY.value = true
    }
    // 视图滚动
    function scroll({ detail }) {
      resize(true)
      context.emit("scroll", scrollTop.value)
      isTop.value = detail.scrollTop <= 5
      isBottom.value = detail.scrollTop + viewRect.value.height + useUnitToPx(useOptions.value.pullupThreshold) >= touchRect.value.height
      scrollTop.value = detail.scrollTop
    }
    // 滚动到顶部
    function scrolltoupper() {
      isTop.value = true
      state.value.isTop = true
      state.value.toTopTimestamp = Date.now()
      context.emit("scrolltoupper", scrollTop.value)
    }
    // 滚动到底部
    function scrolltolower() {
      isBottom.value = true
      state.value.isBottom = true
      load()
      context.emit("scrolltolower", scrollTop.value)
    }

    function touchstart() {
      resize(true)
      isTouch.value = true
    }

    function touchmove(event) {}

    function touchend() {
      scrollY.value = true
      isTouch.value = false
    }

    function touchcancel() {
      isTouch.value = false
    }
    function useRect(selector, all) {
      return new Promise((resolve) => {
        uni
          .createSelectorQuery()
          .in(instance)
          [all ? "selectAll" : "select"](selector)
          .boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect)
            }
            if (!all && rect) {
              resolve(rect)
            }
          })
          .exec()
      })
    }

    onMounted(() => {
      resize()
      if (useOptions.value.auto) load()
    })
    return {
      state,
      scroll,
      scrollY,
      loading,
      paging,
      useRect,
      useOptions,
      isShowEmpty,
      isShowLoad,
      isShowRefresh,
      viewStyle,
      mainStyle,
      loadStatusText,
      loadIconStyle,
      loadTextStyle,
      refreshStatusText,
      refreshIconStyle,
      refreshTextStyle,
      emptyTextStyle,
      pulldownRefreshStatus,
      scrolltoupper,
      scrolltolower,
      openPulldownRefresh,
      dragPulldownRefresh,
      cancelPulldownRefresh,
      failPulldownRefresh,
      successPulldownRefresh,
      touchstart,
      touchmove,
      touchend,
      touchcancel,
      resize,
      query,
      auto,
      load,
      loadFail,
      loadSuccess,
      refresh,
      refreshFail,
      refreshSuccess,
    }
  },
})
</script>

<style lang="scss">
.zm-list {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &__inner {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: row;
    overflow: hidden;
  }

  &__view {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    height: 100%;
    overflow-anchor: none;
  }

  &__touch {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  &__main {
    position: relative;
    width: 100%;
  }

  &__refresh {
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    transform: translateY(-100%);

    .refresh-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px 0;

      .refresh-icon {
        width: 32rpx;
        height: 32rpx;
        border-style: solid;
        border-width: 4rpx;
        border-radius: 50%;

        &.open {
          animation: spin 0.5s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      }

      .refresh-text {
        margin-left: 10rpx;
      }
    }
  }

  &__empty {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;

    .empty-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 30%;
      margin: auto;

      .empty-image {
        width: 580rpx;
        height: 310rpx;
      }

      .empty-text {
        margin-top: 20rpx;
        font-size: 28rpx;
        color: #606266;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__load {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .load-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px 0;

      .load-animation {
        width: 32rpx;
        height: 32rpx;
        border-style: solid;
        border-width: 4rpx;
        border-radius: 50%;
        animation: spin 0.5s linear infinite;
      }

      .load-text {
        margin-left: 10rpx;
      }
    }
  }
}
</style>
