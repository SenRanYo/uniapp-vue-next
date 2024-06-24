import { VNode, provide, reactive, InjectionKey, getCurrentInstance, VNodeNormalizedChildren, ComponentPublicInstance, ComponentInternalInstance } from "vue"

export function flattenVNodes(children: VNodeNormalizedChildren) {
  const result: VNode[] = []

  const traverse = (children: VNodeNormalizedChildren) => {
    if (Array.isArray(children)) {
      children.forEach((child: any) => {
        result.push(child)

        if (child.component?.subTree) {
          result.push(child.component.subTree)
          traverse(child.component.subTree.children)
        }

        if (child.children) {
          traverse(child.children)
        }
      })
    }
  }

  traverse(children)

  return result
}

const findVNodeIndex = (vnodes: VNode[], vnode: VNode) => {
  return vnodes.indexOf(vnode)
}

export function sortChildren(parent: ComponentInternalInstance, publicChildrens: ComponentPublicInstance[], childrens: ComponentInternalInstance[]) {
  const vnodes = flattenVNodes(parent.subTree.children)

  childrens.sort((a, b) => findVNodeIndex(vnodes, a.vnode) - findVNodeIndex(vnodes, b.vnode))

  const orderedPublicChildren = childrens.map((item) => item.proxy!)

  publicChildrens.sort((a, b) => {
    const indexA = orderedPublicChildren.indexOf(a)
    const indexB = orderedPublicChildren.indexOf(b)
    return indexA - indexB
  })
}

export function useChildren<Child extends ComponentInternalInstance, ProvideValue = never>(key: InjectionKey<ProvideValue>) {
  const parent = getCurrentInstance()!
  const childrens: ComponentInternalInstance[] = reactive([])
  const publicChildrens: ComponentPublicInstance[] = reactive([])

  const linkChildren = (value?: any) => {
    const link = (child: ComponentInternalInstance) => {
      if (child.proxy) {
        childrens.push(child as Child)
        publicChildrens.push(child.proxy)
        sortChildren(parent, publicChildrens, childrens)
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
