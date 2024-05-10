<template>
  <view class="zm-view" :class="[customClass]" :style="[wrapStyle]" @touchstart="onTouchstart" @touchend="onTouchend" @touchmove="onTouchmove" @mouseup="onMouseup" @mousedown="onMousedown">
    <slot></slot>
    <!-- 业务组件 -->
    <deco-tabbar></deco-tabbar>
    <zm-toast ref="toast"></zm-toast>
    <zm-dialog ref="error"></zm-dialog>
    <zm-dialog ref="dialog"></zm-dialog>
    <zm-setting :develop-mode="developMode"></zm-setting>
    <zm-auth ref="auth" @success="onAuthSuccess"></zm-auth>
  </view>
</template>

<script>
/**
 * @name zm-view 视图容器
 * @description 页面视图内容放在此容器内
 * @prop {Boolean} scroll - 是否可以滚动，默认值为 true
 * @prop {Boolean} autoLoad - 是否自动加载，默认值为 true
 * @prop {String} background - 背景颜色，默认值为 ""
 * @prop {String} customClass - 自定义类名，默认值为 ""
 * @prop {Object|String} customStyle - 自定义样式，默认值为 {}
 */
import Mitt from "../utils/mitt"
import mixin from "../mixins"
import { mapGetters } from "vuex"
import { useStyle } from "../utils/style"
import { isMobile } from "../utils/check"
export default {
  name: "zm-view",
  mixins: [mixin],
  props: {
    scroll: { type: Boolean, default: true },
    autoLoad: { type: Boolean, default: true },
    background: { type: String, default: "" },
    customClass: { type: String, default: "" },
    customStyle: { type: [Object, String], default: () => ({}) }
  },
  data() {
    return {
      mitt: new Mitt(),
      route: "", // 当前页面路由
      paging: { loading: false, list: [], total: Infinity, page: 1, pageSize: 15 } // 分页数据
    }
  },
  computed: {
    wrapStyle() {
      const style = {}
      style.background = this.background
      style["--page-color"] = this.pageColor
      style["--theme-color"] = this.themeColor

      if (!this.scroll) {
        style.height = "100vh"
        style.overflow = "hidden"
      }
      return useStyle({ ...style, ...useStyle(this.customStyle) })
    },
    ...mapGetters(["pageColor", "themeColor", "developMode"])
  },
  created() {
    this.onEvents()
    this.onScroll()
    this.onScrolltolower()
  },
  mounted() {
    this.init()
  },
  destroyed() {
    this.offEvents()
  },
  methods: {
    async init() {
      await this.$nextTick()
      if (this.autoLoad) this.refreshPaging()
    },
    // 重置分页
    resetPaging(paging = {}) {
      this.paging = Object.assign({ loading: false, list: [], total: Infinity, page: 1, pageSize: 15 }, paging)
      this.$emit("resetPaging", { page: this.paging.page, pageSize: this.paging.pageSize })
      this.$emit("reset-paging", { page: this.paging.page, pageSize: this.paging.pageSize })
    },
    // 加载分页回调
    handleLoadPaging(data = {}) {
      const { list, total } = data
      this.paging.loading = false
      this.paging.list = list || this.paging.list
      this.paging.total = total || this.paging.total
      if (this.paging.list.length < this.paging.total) this.paging.page++
    },
    // 刷新分页回调
    handleRefreshPaging(data = {}) {
      const { list, total } = data
      this.paging.loading = false
      this.paging.list = list || []
      this.paging.total = total || Infinity
      if (this.paging.list.length < this.paging.total) this.paging.page++
    },
    // 分页加载逻辑
    loadPaging() {
      if (this.paging.list.length < this.paging.total && !this.paging.loading) {
        this.paging.loading = true
        this.$emit("load-paging", { page: this.paging.page, pageSize: this.paging.pageSize }, this.handleLoadPaging)
      }
    },
    // 分页刷新逻辑
    refreshPaging() {
      this.paging = { loading: true, list: [], total: Infinity, page: 1, pageSize: 15 }
      this.$emit("refresh-paging", { page: this.paging.page, pageSize: this.paging.pageSize }, this.handleRefreshPaging)
    },
    // 监听事件
    onEvents() {
      this.route = this.useCurrentRoute()
      if (this.route) {
        // 登录成功
        uni.$on(`${this.route}-auth`, () => this.onAuthSuccess())
        // 登录
        uni.$on(`${this.route}-login`, () => this.auth())
        // 提示
        uni.$on(`${this.route}-toast`, (...args) => this.toast(...args))
        // 弹窗
        uni.$on(`${this.route}-dialog`, (...args) => this.dialog(...args))
        // 错误弹窗
        uni.$on(`${this.route}-error`, (...args) => this.error(...args))
        // 加载中提示
        uni.$on(`${this.route}-loading`, (...args) => this.loading(...args))
      }
      // 下拉刷新
      uni.$on("onPullDownRefresh", () => {
        this.$emit("pull-down-refresh")
        this.mitt.emit("pull-down-refresh")

        this.refreshPaging()
      })
    },

    // 屏幕按下
    onTouchstart(e) {
      this.mitt.emit("touchstart", e)
    },
    // 屏幕松开
    onTouchend(e) {
      this.mitt.emit("touchend", e)
    },
    // 屏幕按住滑动
    onTouchmove(e) {
      this.mitt.emit("touchmove", e)
    },
    // 鼠标按下
    onMousedown(e) {
      if (isMobile()) return
      this.mitt.emit("mousedown", e)
    },
    // 鼠标松开
    onMouseup(e) {
      if (isMobile()) return
      this.mitt.emit("mouseup", e)
    },
    // 监听滚动
    onScroll() {
      uni.$on("onPageScroll", (e) => {
        if (this.route === this.useRoute()) {
          this.$emit("scroll", e.scrollTop, { route: this.route })
          this.mitt.emit("scroll", e.scrollTop, { route: this.route })

          // 滚动到顶部
          if (e.scrollTop === 0) {
            this.$emit("scrolltoupper", { route: this.route })
            this.mitt.emit("scrolltoupper", { route: this.route })
          }
        }
      })
    },
    // 监听滚动到底部
    onScrolltolower() {
      if (this.$currentRoute === this.route) {
        uni.$on("onReachBottom", () => {
          this.$emit("scrolltolower")
          this.mitt.emit("scrolltolower")
          this.loadPaging()
        })
      }
    },
    // 移除事件
    offEvents() {
      uni.$off(`${this.route}-login`)
      uni.$off(`${this.route}-toast`)
      uni.$off(`${this.route}-dialog`)
      uni.$off(`${this.route}-error`)
      uni.$off(`${this.route}-loading`)
      this.mitt.clear()
    },
    // 显示授权弹窗
    auth() {
      this.$refs.auth?.show()
    },
    // 授权成功
    onAuthSuccess() {
      this.$emit("auth-success")
    },
    // 显示toast
    toast(...args) {
      if (args?.[0] === false) {
        return this.$refs.toast?.hide()
      } else if (uni.$check.isString(args?.[0])) {
        return this.$refs.toast?.show({ content: args?.[0] })
      } else {
        return this.$refs.toast?.show(...args)
      }
    },
    // 错误弹窗
    error(...args) {
      this.$refs.error?.open(...args)
    },
    // 消息弹窗
    dialog(...args) {
      this.$refs.dialog?.open(...args)
    },
    // 显示loading
    loading(...args) {
      if (uni.$check.isBoolean(args?.[0])) {
        if (args?.[0]) {
          this.$refs.toast?.show({
            mask: true,
            type: "loading",
            content: "正在加载",
            duration: 10000
          })
        } else {
          this.$refs.toast?.hide()
        }
      } else if (uni.$check.isObject(args?.[0])) {
        this.$refs.toast?.show(...args)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-view {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
  transition: backgroundColor 0.3s ease;
}
</style>
