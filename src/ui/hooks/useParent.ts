import { ref, inject, computed, onUnmounted, InjectionKey, getCurrentInstance, ComponentInternalInstance } from "vue"

type ParentProvide<T> = T & {
  link(child: ComponentInternalInstance): void
  unlink(child: ComponentInternalInstance): void
  childrens: ComponentInternalInstance[]
}

export function useParent<T>(key: InjectionKey<ParentProvide<T>>) {
  const parent = inject(key, null)
  if (parent) {
    const instance = getCurrentInstance()!
    const { link, unlink, childrens } = parent

    link(instance)
    onUnmounted(() => unlink(instance))

    const index = computed(() => childrens.indexOf(instance))

    return { index, parent }
  }

  return { index: ref(-1), parent: null }
}
