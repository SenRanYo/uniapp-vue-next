import { isNumber } from "./check"

/**
 * @description uuid
 * @return {String}
 */
export function uuid(): string {
  let d = new Date().getTime()
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

/**
 * @description 对象深度克隆
 * @param {Object} obj 克隆对象
 * @return {Object}
 */
export function clone(obj: any): any {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj
  if (typeof obj !== "object" && typeof obj !== "function") {
    //原始类型直接返回
    return obj
  }
  var o = Array.isArray(obj) ? [] : {}
  for (let i in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? clone(obj[i]) : obj[i]
    }
  }
  return o
}

/**
 * @description 对象深度合并
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @return {Object}
 */
export function merge(target: any = {}, source: any = {}): any {
  target = clone(target)
  if (typeof target !== "object" || typeof source !== "object") return false
  for (var prop in source) {
    // eslint-disable-next-line no-prototype-builtins
    if (!source.hasOwnProperty(prop)) continue
    if (prop in target) {
      if (typeof target[prop] !== "object") {
        target[prop] = source[prop]
      } else {
        if (typeof source[prop] !== "object") {
          target[prop] = source[prop]
        } else {
          if (target[prop]?.concat && source[prop]?.concat) {
            target[prop] = target[prop].concat(source[prop])
          } else {
            target[prop] = merge(target[prop], source[prop])
          }
        }
      }
    } else {
      target[prop] = source[prop]
    }
  }
  return target
}

/**
 * @description 转换对象为url参数
 * @return url参数字符串
 */
export function encodeParams(params: any, isPrefix: boolean = true): string {
  let prefix = isPrefix ? "?" : ""
  let _result: string[] = []
  for (let key in params) {
    let value = params[key]
    // 去掉为空的参数
    if (["", undefined, null].includes(value)) {
      continue
    }
    if (value.constructor === Array) {
      value.forEach((_value) => {
        _result.push(encodeURIComponent(key) + "[]=" + encodeURIComponent(_value))
      })
    } else {
      _result.push(encodeURIComponent(key) + "=" + encodeURIComponent(value))
    }
  }
  return _result.length ? prefix + _result.join("&") : ""
}

/**
 * 格式化数字函数
 * @param {number} amount - 输入的数字
 * @param {Object} options - 选项对象
 * @param {number} [options.decimalPlaces] - 小数位数，默认为2
 * @param {string} [options.thousandsSep] - 千位分隔符，默认为空
 * @param {boolean} [options.trimZero] - 是否去除后面多余的零，默认为true
 * @returns {string} 返回格式化后的金额字符串
 */
export function formatDigit(digit: number = 0, options: { decimalPlaces?: number; thousandsSep?: string; trimZero?: boolean } = {}): string | number {
  if (!isNumber(digit)) return digit
  const { decimalPlaces = 2, thousandsSep = "", trimZero = true } = options
  const amountStr = String(digit)
  const [integerPart, decimalPart = ""] = amountStr.split(".")

  let formattedInteger = integerPart
  if (thousandsSep) {
    formattedInteger = formattedInteger.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep)
  }

  let decimalPortion = ""
  if (decimalPlaces > 0) {
    let formattedDecimal = decimalPart.padEnd(decimalPlaces, "0").slice(0, decimalPlaces)
    decimalPortion = trimZero && parseInt(formattedDecimal) === 0 ? "" : `.${formattedDecimal}`
  }

  return decimalPortion ? formattedInteger + decimalPortion : formattedInteger
}

/**
 * 延时指定的时间后执行回调函数
 * @param {number} delay - 延时时间（毫秒）
 * @returns {Promise} - 返回一个Promise对象
 */
export function delay(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

/**
 * @description 函数防抖 短时间内多次触发同一事件，只执行最后一次，或者只执行最开始的一次，中间的不执行
 * @param Function func 目标函数
 * @param Number wait 延迟执行毫秒数
 * @param Booleans immediate true - 立即执行， false - 延迟执行
 */
let timeout = null
export function debounce(func: Function, wait: number = 500, immediate: boolean = false): void {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout)
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout
    timeout = setTimeout(function () {
      timeout = null
    }, wait)
    if (callNow) typeof func === "function" && func()
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      if (typeof func === "function") {
        func()
        timeout = null
      }
    }, wait)
  }
}

/**
 * @description 函数节流 连续触发事件但是在 n 秒中只执行一次函数。即 2n 秒内执行 2 次
 * @param Function func 函数
 * @param Number wait 延迟执行毫秒数
 * @param Number type 1 表时间戳版，2 表定时器版
 */
// eslint-disable-next-line no-unused-vars
let timer, flag
export function throttling(func: Function, wait: number = 500, immediate: boolean = true): void {
  if (immediate) {
    if (!flag) {
      flag = true
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === "function" && func()
      timer = setTimeout(() => {
        flag = false
      }, wait)
    }
  } else {
    if (!flag) {
      flag = true
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(() => {
        flag = false
        typeof func === "function" && func()
      }, wait)
    }
  }
}

/**
 * 将一个数字限制在指定的范围内
 * @param {number} num - 要限制的数字
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} - 限制后的数字
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

/**
 * 从对象中选择指定的键，返回一个新对象
 * @param {Object} obj - 要选择键的对象
 * @param {Array} keys - 要选择的键的数组
 * @returns {Object} - 包含选定键值对的新对象
 */
export function pick(obj: any, keys: string[]): any {
  return keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      acc[key] = obj[key]
    }
    return acc
  }, {})
}

/**
 * 在数字或字符串前面补零，使其达到指定的长度
 * @param num 要补零的数字或字符串
 * @param size 最终要达到的长度，默认为2
 * @returns 补零后的字符串
 */
export function padZero(num: string | number, size = 2): string {
  let str = num + ""
  while (str.length < size) {
    str = "0" + str
  }
  return str
}

/**
 * 在数组中查找与目标数值最接近的数字
 * @param {number[]} arr 数字数组
 * @param {number} target 目标数值
 * @returns {number} 最接近目标数值的数字
 */
export function findClosestNumber(arr: number[], target: number): number {
  let closestNumber = arr[0]
  let minDiff = Math.abs(target - arr[0])
  for (let i = 1; i < arr.length; i++) {
    let diff = Math.abs(target - arr[i])
    if (diff < minDiff) {
      minDiff = diff
      closestNumber = arr[i]
    }
  }
  return closestNumber
}

/**
 * 将数组乱序
 * @param array 要乱序的数组
 * @returns 乱序后的数组
 */
export function shuffleArray<T>(array: T[]): T[] {
  let len = array.length
  for (var i = len - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1))
    var temp = array[randomIndex]
    array[randomIndex] = array[i]
    array[i] = temp
  }
  return array
}

/**
 * 将两个数字相加并返回结果，保留小数点后十位
 * @param num1 第一个数字
 * @param num2 第二个数字
 * @returns 两个数字相加后的结果，保留小数点后十位
 */
export function addNumber(num1: number, num2: number) {
  const cardinal = 10 ** 10
  return Math.round((num1 + num2) * cardinal) / cardinal
}
