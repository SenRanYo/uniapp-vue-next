<template>
  <view class="zm-tabbar-item" :class="{ 'zm-tabbar-item--active': tabbarValue === name }" @click="onClickTabbar">
    <view class="zm-tabbar-item__icon" :style="[iconStyle]">
      <view class="zm-tabbar-item__icon__absolute">
        <slot name="icon">
          <zm-icon :name="icon" :size="iconSize" :weight="iconWeight" :custom-prefix="iconPrefix"></zm-icon>
        </slot>
      </view>
    </view>
    <view class="zm-tabbar-item__text"><slot></slot></view>
  </view>
</template>

<script>
import mixins from "../mixins"
import { encodeParams, debounce } from "../utils/utils"
import { useStyle, useUnit, useColor } from "../utils/style"
export default {
  name: "zm-tabbar-item",
  mixins: [mixins],
  props: {
    name: { type: [String, Number], default: "" },
    icon: { type: String, default: "" },
    iconSize: { type: [String, Number], default: "44rpx" },
    iconWeight: { type: [String, Number], default: "" },
    iconPrefix: { type: String, default: "" },
    dot: { type: Boolean, default: false },
    badge: { type: String, default: "" },
    route: { type: String, default: "" },
    routeParams: { type: Object, default: () => ({}) },
    routeType: { type: String, default: "switchTab" }
  },
  data() {
    return {
      tabbar: {}
    }
  },
  computed: {
    tabbarValue() {
      return this.tabbar.value
    },
    iconStyle() {
      const style = {}
      style.height = useUnit(this.iconSize)
      style.fontSize = useUnit(this.iconSize)
      if (this.tabbar.value === this.name) style.color = useColor(this.tabbar.activeColor)
      else style.color = useColor(this.tabbar.inactiveColor)
      return useStyle(style)
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.tabbar = this.useParent("zm-tabbar")
      if (this.tabbar) {
        this.tabbar.updateChildrens(this)
        this.tabbar = this.useParent("zm-tabbar")
        this.index = this.tabbar.childrens.indexOf(this)
      }
    },
    onClickTabbar() {
      const routes = getCurrentPages()
      const router = routes[routes.length - 1]
      if (this.tabbar?.route) {
        if (!this.route) {
          console.error("zm-tabbar-item: route is required")
          return
        } else if (this.route == router.route) {
          return
        }
        debounce(() => {
          uni[this.routeType]({
            url: `/${this.route}${encodeParams(this.routeParams)}`,
            fail: (err) => {
              throw err
            }
          })
        }, 100)
      } else {
        this.tabbar.updateValue(this.name || this.index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.zm-tabbar-item {
  flex: 1;
  display: flex;
  color: #999999;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &--active {
    color: var(--theme-color);
  }
  &__icon {
    height: 44rpx;
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 4rpx;
    justify-content: center;
    &__absolute {
      left: 50%;
      bottom: 0;
      z-index: 1;
      display: flex;
      position: absolute;
      transform: translateX(-50%);
    }
  }
  &__text {
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    align-items: center;
    justify-content: center;
  }
}
</style>
