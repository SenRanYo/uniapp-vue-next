import { ref, nextTick, getCurrentInstance, ComponentInternalInstance } from "vue"
import { onPageScroll, onReachBottom } from "@dcloudio/uni-app"

interface View {
  [key: string]: any
}

export async function useView() {
  const view: any = ref({})
  const instance: any = getCurrentInstance()

  onPageScroll(({ scrollTop }) => {
    view.value.scroll(scrollTop)

    if (scrollTop === 0) view.value.reachTop()
  })

  onReachBottom(() => {
    view.value.reachBottom()
  })

  await nextTick()
  Object.keys(instance.refs).forEach((key) => {
    if (instance.refs[key].name === "zm-view") {
      view.value = instance.refs[key]
    }
  })

  const _onPageScroll = (hook: (options: Page.PageScrollOption) => void, target?: ComponentInternalInstance | null) => {}
}
