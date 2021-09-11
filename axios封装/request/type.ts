import type { AxiosRequestConfig, AxiosResponse } from "axios";
interface CherryInterceptor<T = AxiosResponse> {
  name?: string;
  requestInterceptor?: (config: AxiosRequestConfig) => any;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (config: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}
interface CherryConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // showLoading?: boolean;
  name?: string;
  interceptors?: CherryInterceptor<T>;
}
export { CherryInterceptor, CherryConfig };
