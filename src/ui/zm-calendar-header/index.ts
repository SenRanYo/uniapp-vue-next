import { Dayjs } from "dayjs"
import Calendar from "./zm-calendar.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const calendarProps = {
  /**
   * 日期
   */
  date: { type: [String, Date], default: "" },
  /**
   * 可选择最小日期
   */
  minDate: { type: [String, Date], default: "" },
  /**
   * 可选择最大日期
   */
  maxDate: { type: [String, Date], default: "" },
  /**
   * 设置周起始日
   */
  firstDayOfWeek: { type: [String, Number], default: "1" },
  /**
   * 切换模式，可选值 default 平铺展示所有月份 month 按月切换 year-month 按年按月切换
   */
  switchMode: { type: String, default: "default", validator: (v: string) => ["default", "month", "year-month"].includes(v) },
  /**
   * 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const calendarEmits = {
  change: (value: string) => true,
}

export type CalendarDate = Dayjs | string | Date | null
export type CalendarDefaultDate = Array<string | Date | Dayjs> | Dayjs | string | Date | null
export type CalendarEmits = typeof calendarEmits
export type CalendarProps = ExtractPropTypes<typeof calendarProps>
export type CalendarExpose = {}
export type CalendarInstance = InstanceType<typeof Calendar>
