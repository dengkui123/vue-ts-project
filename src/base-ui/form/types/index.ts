type IFormType = 'input' | 'password' | 'select' | 'datepicker';

export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: any;
  // 针对select
  options?: any[];
  // 针对单个表单项的特殊属性
  otherOptions?: any;
  // 是否隐藏部分表单项
  isHidden?: boolean;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemStyle?: any;
  formStyle?: any;
}
