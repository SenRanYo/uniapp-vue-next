/*
 * @Description  : 发布订阅监听器
 */

class Mitt {
  private events: Map<string, Function[]>

  constructor() {
    this.events = new Map()
  }

  init(events: { [key: string]: Function }) {
    if (events) {
      for (const key in events) {
        this.on(key, events[key])
      }
    }
  }

  on(name: string, handler: Function) {
    const handlers = this.events.get(name)
    if (handlers) {
      handlers.push(handler)
    } else {
      this.events.set(name, [handler])
    }
  }

  once(name: string, handler: Function) {
    const wrappedHandler = (...args: any[]) => {
      handler(...args)
      const handlers = this.events.get(name)
      handlers?.splice(handlers.indexOf(wrappedHandler) >>> 0, 1)
    }
    const handlers = this.events.get(name)
    if (handlers) {
      handlers.push(wrappedHandler)
    } else {
      this.events.set(name, [wrappedHandler])
    }
  }

  off(name: string, handler?: Function) {
    const handlers = this.events.get(name)
    if (handlers) {
      if (handler) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1)
      } else {
        this.events.set(name, [])
      }
    }
  }

  emit(name: string, ...args: any[]) {
    let handlers = this.events.get(name)
    if (handlers) {
      handlers.slice().map((handler) => {
        if (typeof handler === "function") handler(...args)
      })
    }

    handlers = this.events.get("*")
    if (handlers) {
      handlers.slice().map((handler) => {
        if (typeof handler === "function") handler(name, ...args)
      })
    }
  }

  clear() {
    this.events.clear()
  }
}

const mitt = new Mitt()

export { Mitt, mitt }
export default Mitt
