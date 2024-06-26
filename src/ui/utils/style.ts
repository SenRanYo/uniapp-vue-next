import { cssVars } from "../config"
import { isNumber, isObject, isString, isEmpty } from "./check"

export function useRect(selector: string, all?: boolean) {
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
}

// 使用css变量
export function useVar(name: string): string {
  return `var(--${name})`
}

// 使用颜色值，如果是内置变量，使用css变量，否则直接使用颜色值
export function useColor(color: string): string {
  return cssVars.includes(color) ? `var(--${color}-color)` : color
}

// 根据单位转换样式值
export function useUnit(value: any, unit: string = "rpx"): string {
  if (/\s+/.test(value)) {
    return value
      .trim()
      .split(/\s+/)
      .map((item) => (isNumber(String(item)) ? `${item}${unit}` : item))
      .join(" ")
  }
  return isNumber(value) ? `${value}${unit}` : value
}

// 根据单位转换装修样式值
export function useDecoUnit(value: any, unit: string = "rpx"): string {
  if (/\s+/.test(value)) {
    return value
      .trim()
      .split(/\s+/)
      .map((item: any) => (isNumber(String(item)) ? `${item * 2}${unit}` : item))
      .join(" ")
  }
  return isNumber(value) ? `${value * 2}${unit}` : value
}

/**
 * @description: 单位值转PX单位值
 * @param {string} value 单位值
 * @return {string}
 */
export function useUnitToPx(value: any): string | number {
  value = useUnit(value || "0")
  if (~value.indexOf("rpx")) {
    return isNumber(value.split("rpx")[0]) ? uni.upx2px(+value.split("rpx")[0]) : value
  }
  if (~value.indexOf("px")) {
    return isNumber(value.split("px")[0]) ? Number(value.split("px")[0]) + "" : value
  }
  return value
}

// 根据指定的类型将样式转换为对象或字符串
export function useStyle(style: any, type: string = "object"): any {
  if (isEmpty(style) || (isObject(style) && type === "object") || (isString(style) && type === "string")) {
    if (isObject(style)) {
      for (let key in style) {
        if (isEmpty(style[key]) && style[key] !== 0) delete style[key]
      }
    }
    return style
  }

  if (type === "object") {
    style = style.trim()
    let styleArray = style.split(";")
    let styleObject: any = {}
    for (let i = 0; i < styleArray.length; i++) {
      if (styleArray[i]) {
        const item = styleArray[i].split(":")
        styleObject[item[0].trim()] = item[1].trim()
      }
    }
    return styleObject
  }

  let string = ""
  for (const key in style) {
    const newKey = key.replace(/([A-Z])/g, "-$1").toLowerCase()
    string += `${newKey}:${style[key]};`
  }
  return string.trim()
}

// 根据指定的类型将样式转换为对象或字符串
export function useProps(list: string[] = []): any {
  const props: any = {}
  list.forEach((name) => (props[name] = { type: [String, Number] }))
  return props
}

// 根据方向转换JustifyContent样式
export function useJustifyContent(direction: string): any {
  const directions = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  }
  return direction ? { justifyContent: directions[direction] } : {}
}

// 根据方向转换AlignItems样式
export function useAlignItems(direction: string): any {
  const directions = {
    top: "flex-start",
    center: "center",
    bottom: "flex-end",
  }
  return direction ? { alignItems: directions[direction] } : {}
}

/**
 * 将十六进制颜色转换为RGB值
 * @param {string} hex - 十六进制颜色值，可以包含可选的 "#" 前缀
 * @returns {object|null} - 包含RGB值的对象，如果输入无效则返回null
 * @throws {Error} - 如果输入的颜色格式或值无效，则抛出错误
 */
export function useRgb(hex: string): { r: number; g: number; b: number } | null {
  const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
  const result = regex.exec(hex)

  if (!result) {
    throw new Error("无效的十六进制颜色格式")
  }

  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    throw new Error("无效的十六进制颜色值")
  }

  return { r, g, b }
}
