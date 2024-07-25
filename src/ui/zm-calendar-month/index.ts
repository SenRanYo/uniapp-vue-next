import { Dayjs } from "dayjs"
import Calendar from "./zm-calendar.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const calendarProps = {
  /**
   * 是否显示
   */
  show: { type: Boolean, default: false },
  /**
   * 选择模式，可选值 single 单选 multiple 多选 range 区间
   */
  mode: { type: String, default: "single", validator: (v: string) => ["single", "multiple", "range"].includes(v) },
  /**
   * 切换模式，可选值 default 平铺展示所有月份 month 按月切换 year-month 按年按月切换
   */
  switchMode: { type: String, default: "default", validator: (v: string) => ["default", "month", "year-month"].includes(v) },
  /**
   * 标题
   */
  title: { type: String, default: "日期选择" },
  /**
   * 颜色，对按钮和选中生效
   */
  color: { type: String, default: "" },
  /**
   * 可选择最小日期
   */
  minDate: { type: [String, Date], default: "" },
  /**
   * 可选择最大日期
   */
  maxDate: { type: [String, Date], default: "" },
  /**
   * 默认选中的日期，mode 为 multiple 或 range 时为数组，传入 null 表示默认不选择
   */
  defaultDate: { type: [Array, String, Date] as PropType<CalendarDefaultDate>, default: "" },
  /**
   * 日期的高度
   */
  dateHeight: { type: [String, Number], default: "" },
  /**
   * 日期格式化函数
   */
  formatter: { type: Function },
  /**
   * 是否为只读状态，只读状态下不能选择日期
   */
  readonly: { type: Boolean, default: true },
  /**
   * 是否以弹层的形式展示日历
   */
  poppable: { type: Boolean, default: true },
  /**
   * 是否显示月份背景水印
   */
  showMark: { type: Boolean, default: true },
  /**
   * 是否展示日历标题
   */
  showTitle: { type: Boolean, default: true },
  /**
   * 是否展示日历副标题（年月）
   */
  showSubtitle: { type: Boolean, default: true },
  /**
   * 是否展示确认按钮
   */
  showConfirm: { type: Boolean, default: true },
  /**
   * 确认按钮的文字
   */
  confirmText: { type: String, default: "确定" },
  /**
   * 确认按钮处于禁用状态时的文字
   */
  confirmDisabledText: { type: String, default: "确定" },
  /**
   * 设置周起始日
   */
  firstDayOfWeek: { type: [String, Number], default: "1" },
  /**
   * 日期区间是否允许选择同一天
   */
  allowSameDay: { type: Boolean, default: false },
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
  "update:modelValue": (value: string) => true,
}

export type CalendarDate = Dayjs | string | Date | null
export type CalendarDefaultDate = Array<string | Date | Dayjs> | Dayjs | string | Date | null
export type CalendarEmits = typeof calendarEmits
export type CalendarProps = ExtractPropTypes<typeof calendarProps>
export type CalendarExpose = {}
export type CalendarInstance = InstanceType<typeof Calendar>
