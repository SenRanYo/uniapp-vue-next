import { Mitt } from "./utils/mitt"
import { getCurrentInstance } from "vue"
import { onPageScroll, onReachBottom } from "@dcloudio/uni-app"
export * from "./zm-dialog"

export function useView() {
  let mitt = ref<Mitt>()
  let view = ref<any>()
  const instance: any = getCurrentInstance()

  let onReachTopHook: Function = () => {}
  const onReachTop = (hook: Function = () => {}) => (onReachTopHook = hook)

  onPageScroll((options) => {
    if (view.value) {
      view.value.scroll(options)
      if (options.scrollTop === 0) {
        onReachTopHook()
        view.value.reachTop()
      }
    }
  })

  onReachBottom(() => {
    if (view.value) {
      view.value.reachBottom()
    }
  })

  nextTick(() => {
    Object.keys(instance.refs).forEach((key) => {
      if (instance.refs[key].name === "zm-view") {
        view.value = instance.refs[key]
        mitt.value = instance.refs[key].mitt
      }
    })
  })

  const state = computed(() => {
    return { view: view, mitt: mitt, onReachTop, onPageScroll, onReachBottom }
  })

  return state.value
}
