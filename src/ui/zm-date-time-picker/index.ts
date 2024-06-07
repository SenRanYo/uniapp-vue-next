import DatePicker from "./zm-date-picker.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const datePickerProps = {
  /**
   * @description 绑定日期
   */
  modelValue: { type: [String, Date, Number], default: "" },
  /**
   * @description 标题
   */
  title: { type: String, default: "" },
  /**
   * @description 列类型
   */
  columns: { type: Array as PropType<DatePickerColumnType[]>, default: () => ["year", "month", "day", "hour", "minute", "second"] },
  /**
   * @description 最小时间
   */
  minDate: { type: [String, Date, Number], default: new Date(new Date().getFullYear() - 10, 0, 1) },
  /**
   * @description 最大时间
   */
  maxDate: { type: [String, Date, Number], default: new Date(new Date().getFullYear() + 10, 11, 31) },
  /**
   * @description 取消文字
   */
  cancelText: { type: String, default: "取消" },
  /**
   * @description 确认文字
   */
  confirmText: { type: String, default: "确认" },
  /**
   * @description 是否显示顶部栏
   */
  showHeader: { type: Boolean, default: true },
  /**
   * @description 时间格式
   */
  format: { type: String, default: "YYYY-MM-DD HH:mm:ss" },
  /**
   * @description 选项过滤函数
   */
  columnFilter: { type: Function as PropType<DatePickerColumnFilter> },
  /**
   * @description 选项格式化函数
   */
  columnFormatter: { type: Function as PropType<DatePickerColumnFormatter>, default: (type: string, option: DatePickerOption) => option },
  /**
   * @description 选项高度
   */
  columnHeight: { type: [String, Number], default: "88rpx" },
  /**
   * @description 可见的选项个数
   */
  visibleColumnNum: { type: [String, Number], default: 5 },
  /**
   * @description 自定义类名
   */
  customClass: { type: String, default: "" },
  /**
   * @description 自定义样式
   */
  customStyle: { type: [String, Object], default: "" },
}

export const datePickerEmits = {
  cancel: (data: { value: string; selectedValues: string[]; selectedIndexes: number[] }) => true,
  change: (data: { value: string; selectedValues: string[]; selectedIndexes: number[] }) => true,
  confirm: (data: { value: string; selectedValues: string[]; selectedIndexes: number[] }) => true,
  "update:modelValue": (value: string) => true,
}

export type DatePickerOption = { text: string; value: string }
export type DatePickerColumnType = "year" | "month" | "day" | "hour" | "minute" | "second"
export type DatePickerColumnFilter = (type: string, options: DatePickerOption[], values?: string[]) => DatePickerOption[]
export type DatePickerColumnFormatter = (type: string, option: DatePickerOption) => DatePickerOption
export type DatePickerEmits = typeof datePickerEmits
export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
export type DatePickerInstance = InstanceType<typeof DatePicker>
