/**
 * config 部分参数类型
 * interceptors
 * showLoading
 * */

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface MyRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (errpr: any) => any;
}
export interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptors<T>;
  showLoading?: boolean;
}
