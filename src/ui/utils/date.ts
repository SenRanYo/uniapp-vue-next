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
