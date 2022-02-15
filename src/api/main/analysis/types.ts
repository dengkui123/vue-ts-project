export interface IGoodsList {
  amount: string;
  title: string;
  tips: string;
  subtitle: string;
  number1: number;
  number2: number;
}

export interface IDataType<T = any[]> {
  code: number;
  data: T[];
}
