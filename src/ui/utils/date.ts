import dayjs, { Dayjs, UnitType, ManipulateType } from "dayjs"

/**
 * 格式化时间
 * @param value 日期值
 * @param format 格式化字符串，支持 YYYY(年)、MM(月)、DD(日)、HH(时)、mm(分)、ss(秒)、SSS(毫秒)
 * @returns 格式化后的时间字符串
 */
export function formatTime(value: string | number, format: string = "YYYY-MM-DD"): string {
  const date = new Date(value)
  const year = date.getFullYear()
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const day = ("0" + date.getDate()).slice(-2)
  const hours = ("0" + date.getHours()).slice(-2)
  const minutes = ("0" + date.getMinutes()).slice(-2)
  const seconds = ("0" + date.getSeconds()).slice(-2)
  const milliseconds = ("00" + date.getMilliseconds()).slice(-3)

  const formattedTime = format
    .replace("YYYY", year.toString())
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds)
    .replace("SSS", milliseconds)

  return formattedTime
}

/**
 * 克隆日期
 * @param date 日期
 * @returns 日期
 */
export function cloneDate(date: Date) {
  return new Date(date)
}

/**
 * 根据偏移量获取指定日期的月份
 * @param date 待处理的日期
 * @param offset 月份偏移量
 */
export function getMonthByOffset(date: Date, offset: number) {
  const cloned = cloneDate(date)
  cloned.setMonth(cloned.getMonth() + offset)
  if (cloned.getDate() !== date.getDate()) cloned.setDate(0)
  return cloned
}

/**
 * 计算两个日期之间的时间差
 * @param date1 第一个日期，可以是字符串、Date对象或Dayjs对象
 * @param date2 第二个日期，可以是字符串、Date对象或Dayjs对象
 * @param type 时间差的单位类型，例如'day', 'month', 'year'等
 * @returns 两个日期之间的时间差
 */
export function diffDate(date1: string | Date | Dayjs, date2: string | Date | Dayjs, type: UnitType = "day") {
  return dayjs(date1).diff(dayjs(date2), type)
}

/**
 * 通过偏移量获取日期
 * @param date 日期字符串或Date对象或Dayjs对象
 * @param offset 偏移量，默认为0
 * @param type 操作类型，默认为"day"
 * @param format 返回日期格式，默认为"YYYY-MM-DD"
 * @return 返回经过偏移处理后的日期字符串
 */
export function getDateByOffset(date: string | Date | Dayjs, offset: number = 0, type: ManipulateType = "day", format: string = "YYYY-MM-DD") {
  if (offset > 0) {
    return dayjs(date).add(offset, type).format(format)
  }
  if (offset < 0) {
    return dayjs(date).subtract(Math.abs(offset), type).format(format)
  }
  return dayjs(date).format(format)
}
