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
 * 计算两个日期之间的月份差异
 * @param date1 第一个日期
 * @param date2 第二个日期
 */
export function diffMonth(date1: Date, date2: Date) {
  const year1 = date1.getFullYear()
  const year2 = date2.getFullYear()
  if (year1 === year2) {
    const month1 = date1.getMonth()
    const month2 = date2.getMonth()
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1
  }
  return year1 > year2 ? 1 : -1
}

/**
 * 计算两个日期之间的天数差异
 * @param day1 第一个日期
 * @param day2 第二个日期
 */
export function diffDay(day1: Date, day2: Date) {
  const compareMonthResult = diffMonth(day1, day2)
  if (compareMonthResult === 0) {
    const date1 = day1.getDate()
    const date2 = day2.getDate()
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1
  }
  return compareMonthResult
}
