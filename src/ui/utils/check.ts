/**
 * 校验是否是十六进制颜色
 * @param {String} value 校验内容
 * @return {Boolean}
 * @example isHexColor(value)
 */
export function isHexColor(value: any): boolean {
  return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(value)
}

/**
 * 校验是否是邮箱
 * @param {String} value 校验内容
 * @return {Boolean}
 * @example isEmail(value)
 */
export function isEmail(value: any): boolean {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value)
}

/**
 * 校验两个值是否相同
 * @param {*} value1 校验内容
 * @param {*} value2 校验内容
 * @return {Boolean}
 * @example isEqual(value1, value2)
 */
export function isEqual(value1: any, value2: any): boolean {
  return String(value1) === String(value2)
}

/**
 * 校验是否是电话号码
 * @param {String} value 校验内容
 * @return {Boolean}
 * @example isPhoneNo(value)
 */
export function isPhoneNo(value: any): boolean {
  return /^1[3-9]\d{9}$/.test(value)
}

/**
 * 校验是否是URL格式
 * @param {String} value 校验内容
 * @return {Boolean}
 * @example isUrl(value)
 */
export function isUrl(value: any): boolean {
  // eslint-disable-next-line no-useless-escape
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value)
}

/**
 * 校验链接是否为图片
 * @param {string} link - 要校验的链接
 * @return {boolean} - 如果链接是图片链接，则返回 true；否则返回 false
 */
export function isImage(link: any): boolean {
  const reg = /\.(jpeg|jpg|gif|png|bmp|webp)$/i
  return reg.test(link)
}

/**
 * 校验链接是否为文档
 * @param {string} link - 要校验的链接
 * @return {boolean} - 如果链接是文档链接，则返回 true；否则返回 false
 */
export function isDocument(link: any): boolean {
  const reg = /\.(docx|xlsx|pptx|pdf|txt|html|csv|json|xml)$/i
  return reg.test(link)
}

/**
 * 校验是否是日期格式
 * @param {String|Date} value 校验内容
 * @return {Boolean}
 * @example isDate(value)
 */
export function isDate(value: any): boolean {
  return !/Invalid|NaN/.test(new Date(value).toString())
}

/**
 * 校验是否是整数
 * @param {*} value 校验内容
 * @return {Boolean}
 * @example isDigits(value)
 */
export function isDigits(value: any): boolean {
  return /^\d+$/.test(value)
}

/**
 * 校验是否是数字
 * @param {String|Number} value 校验内容
 * @return {Boolean}
 * @example isNumber(value)
 */
export function isNumber(value: any): boolean {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value)
}

/**
 * 检查给定的值是否为字符串类型
 * @param {*} value - 要检查的值
 * @returns {boolean} - 如果值是字符串类型，则返回true；否则返回false
 */
export function isString(value: any): value is string {
  return typeof value === "string"
}

/**
 * 判断给定的参数是否为函数
 * @param {*} fn - 需要检查的参数
 * @returns {boolean} 如果给定的参数是函数则返回true，否则返回false
 */
export function isFunction(fn: any): fn is Function {
  return typeof fn === "function"
}

/**
 * 是否布尔值
 * @param {*} value 校验内容
 * @return {Boolean}
 * @example isBoolean(value)
 */
export function isBoolean(value: any): boolean {
  return typeof value === "boolean"
}

/**
 * 检查给定值是否为 Promise 对象。
 * @param {unknown} value 要检查的值
 * @returns {value is Promise<any>} 如果是 Promise 对象则返回 true，否则返回 false
 */
export function isPromise(value: unknown): value is Promise<any> {
  if (isObject(value) && isDef(value)) {
    return isFunction((value as Promise<any>).then) && isFunction((value as Promise<any>).catch)
  }
  return false
}

/**
 * 校验是否是数组
 * @param {*} value 校验内容
 * @return {Boolean}
 * @example isArray(value)
 */
export function isArray<T>(value: any): value is Array<T> {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value)
  } else {
    return Object.prototype.toString.call(value) === "[object Array]"
  }
}

/**
 * 检查值是否不为空
 * @param value 值
 * @return {Boolean} 是否不为空
 */
export const isDef = <T>(value: T): value is NonNullable<T> => value !== undefined && value !== null && value !== ""

/**
 * 校验是否是对象
 * @param {*} value 校验内容
 * @return {Boolean}
 * @example isObject(value)
 */
export function isObject(value: any): boolean {
  return Object.prototype.toString.call(value) === "[object Object]"
}

/**
 * 校验是否为空
 * @param {*} value 校验内容
 * @return {Boolean}
 * @example isEmpty(value)
 */
export function isEmpty(value: any): boolean {
  switch (typeof value) {
    case "undefined":
      return true
    case "string":
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0) return true
      break
    case "boolean":
      if (!value) return true
      break
    case "number":
      if (0 === value || isNaN(value)) return true
      break
    case "object":
      if (null === value || value.length === 0) return true
      for (var i in value) {
        return false
      }
      return true
  }
  return false
}

/**
 * 校验是否为空数据
 * @param {*} value 校验内容
 * @return {Boolean}
 * @example isNoEmpty(value)
 */
export function isNoEmpty(value: any): boolean {
  return !isEmpty(value)
}

/**
 * 校验是否包含某个值
 * @param {String} value 校验内容
 * @param {String|Number} param 包含内容
 * @return {Boolean}
 * @example isContains(value, param)
 */
export function isContains(value: any, param: any): boolean {
  return value.indexOf(param) >= 0
}

/**
 * 校验是否移动端，用在WEB平台
 * @return {Boolean}
 * @example isMobile()
 */
export function isMobile(): boolean {
  // #ifndef WEB
  return true
}
