import { VNode, provide, reactive, InjectionKey, ComponentPublicInstance, ComponentInternalInstance } from "vue"

export function useChildren<Child extends ComponentInternalInstance, ProvideValue = never>(key: InjectionKey<ProvideValue>) {
  const childrens: ComponentInternalInstance[] = reactive([])
  const publicChildrens: ComponentPublicInstance[] = reactive([])

  const linkChildren = (value?: any) => {
    const link = (child: ComponentInternalInstance) => {
      if (child.proxy) {
        childrens.push(child as Child)
        publicChildrens.push(child.proxy)
      }
    }

    const unlink = (child: ComponentInternalInstance) => {
      const index = childrens.indexOf(child)
      publicChildrens.splice(index, 1)
      childrens.splice(index, 1)
    }

    provide(key, Object.assign({ link, unlink, childrens }, value))
  }

  return { childrens, linkChildren }
}
