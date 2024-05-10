export default {
  // #ifdef MP-WEIXIN
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
  options: {
    virtualHost: true,
    multipleSlots: true,
    styleIsolation: "shared"
  },
  // #endif
  props: {
    customClass: { type: String, default: "" },
    customStyle: { type: [String, Object], default: "" }
  },
  data() {
    return {
      parent: null,
      rafLastTime: 0
    }
  },
  methods: {
    // 获取指定名称父级实例
    useParent(name) {
      // 获取当前实例的父级
      let parent = this.$parent
      // 获取父级名称
      let parentName = parent.$options.name
      // 循环检查父级名称是否与传入的name参数相等
      while (parentName !== name) {
        // 获取父级父级
        parent = parent.$parent
        // 检查父级是否存在
        if (!parent) return null
        // 获取父级名称
        parentName = parent.$options.name
      }
      // 返回父级
      return parent
    },
    // 动画帧，用于requestAnimationFrame
    requestAnimationFrame(callback = () => {}) {
      // 获取当前时间
      const currTime = new Date().getTime()
      // 计算需要延迟的时间
      const timeToCall = Math.max(0, 16 - (currTime - this.rafLastTime))
      // 设置延迟
      const id = setTimeout(() => {
        // 调用回调函数，传入当前时间加上延迟时间
        callback(currTime + timeToCall)
      }, timeToCall)
      // 记录上一次请求的时间
      this.rafLastTime = currTime + timeToCall
      // 返回id
      return id
    },
    // 取消动画帧
    cancelRequestAnimationFrame(id) {
      clearTimeout(id)
    },
    // 获取元素尺寸
    useRect(selector, all) {
      return new Promise((resolve) => {
        uni
          .createSelectorQuery()
          .in(this)
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
    },
    // zm-view mitt实例
    useViewMitt() {
      let parent = this.$parent
      let parentName = parent.$options.name
      while (parentName !== "zm-view") {
        parent = parent.$parent
        if (parent) {
          parentName = parent.$options.name
        } else {
          throw new Error("zm-view组件未找到")
        }
      }
      // 返回父级
      return parent.mitt
    },
    // 获取当前路由
    useRoute() {
      const routes = getCurrentPages()
      const router = routes[routes.length - 1]
      return router.route
    }
  }
}
