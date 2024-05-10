import { Mitt, mitt } from "@/utils/mitt"
import { Ref, getCurrentInstance } from "vue"

/**
 * 获取当前路由信息
 */
export function useCurrentRouter() {
  const routes = getCurrentPages()
  return routes[routes.length - 1]
}

/**
 * 获取父组件
 * @param name 父组件的名称
 * @param r 可选的 Ref 对象
 */
export function useParent(name: string, r?: Ref) {
  // 获取当前组件实例
  const instance = getCurrentInstance()

  if (instance) {
    // 获取父组件实例
    let parent = instance.proxy?.$.parent
    if (parent) {
      // 判断父组件的名称是否与指定名称相同
      if (parent.type.name === name) {
        // 将父组件的 exposed 属性赋值给 r，并返回 exposed 属性
        r.value = parent.exposed
        return parent.exposed
      }
    }
  }
}

/**
 * 获取元素位置信息
 * @param selector 元素的选择器
 * @param all 是否查询全部
 * @param ins 调用组件实例
 */
export function useDomRect(selector: string, all: boolean = false, ins: any) {
  return new Promise((resolve) => {
    uni
      .createSelectorQuery()
      .in(ins)
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

/**
 * 注册事件监听
 * @param name 事件名称
 * @param fun 处理函数
 */
export function useOnEvent(name: string, fun: Function = () => {}) {
  return mitt.on(`_event_${name}`, fun)
}

/**
 * 取消事件监听
 * @param name 事件名称
 */
export function useOffEvent(name: string) {
  return mitt.off(`_event_${name}`)
}

/**
 * 创建事件监听器
 */
export function useEvent() {
  return new Mitt()
}
