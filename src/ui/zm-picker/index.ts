import Picker from "./zm-picker.vue"
import type { ExtractPropTypes, PropType } from "vue"

export const pickerProps = {
  /**
   * @description 绑定值
   */
  modelValue: { type: Array as PropType<(number | string)[]>, default: () => [] },
  /**
   * @description 标题
   */
  title: { type: String, default: "" },
  /**
   * @description 列数据
   */
  columns: { type: Array as PropType<PickerColumn[]>, default: () => [] },
  /**
   * @description 是否显示顶部栏
   */
  showHeader: { type: Boolean, default: true },
  /**
   * @description 取消文字
   */
  cancelText: { type: String, default: "取消" },
  /**
   * @description 确认文字
   */
  confirmText: { type: String, default: "确认" },
  /**
   * @description 自定义columns结构中的字段
   */
  columnsFields: { type: Object as PropType<PickerColumnFields>, default: () => ({ text: "text", value: "value", children: "children" }) },
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

export const pickerEmits = {
  change: (data: { values: PickerValue[]; value: PickerValue; indexs: number[]; index: number; columns: PickerColumn[] }) => true,
  cancel: (data: { values: PickerValue[]; indexs: number[]; columns: PickerColumn[] }) => true,
  confirm: (data: { values: PickerValue[]; indexs: number[]; columns: PickerColumn[] }) => true,
  "update:show": (value: boolean) => true,
  "update:modelValue": (value: PickerValue[]) => true,
}

export type PickerValue = string | number
export type PickerColumn = { text?: string | number; value?: string | number; children?: PickerColumn[]; [key: PropertyKey]: any }
export type PickerColumnFields = { text: string; value: string; children: string }
export type PickerEmits = typeof pickerEmits
export type PickerProps = ExtractPropTypes<typeof pickerProps>
export type PickerInstance = InstanceType<typeof Picker>
