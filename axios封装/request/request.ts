import axios from "axios";
import type { AxiosInstance } from "axios";
import type { CherryInterceptor, CherryConfig } from "./type";
import type { App } from "vue";
// import { ElLoading } from "element-plus";
// import type { ILoadingInstance } from "element-plus/lib/el-loading/src/loading.type";
const defaultService = "$http";
class Request {
  // 定义实例类型
  instance: AxiosInstance;
  name?: string = "";
  // showLoading: boolean;
  // loading?: ILoadingInstance;
  // 拦截器类型
  interceptors?: CherryInterceptor;
  constructor(config: CherryConfig<any>) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    // this.showLoading = config.showLoading ?? true;
    this.name = config?.name;
    // config里面有传入拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 请求成功的拦截
        // if (this.showLoading) {
        //   this.loading = ElLoading.service({
        //     lock: true,
        //     text: "正在请求数据...",
        //     background: "rgba(0,0,0,0.2)"
        //   });
        // }
        return config;
      },
      (error) => {
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // 响应成功的拦截
        // this.loading?.close();
        return res.data;
      },
      (error) => {
        // this.loading?.close();
        return error;
      }
    );
  }

  // 单独请求的控制
  request<T = any>(config: CherryConfig<T>): Promise<T> {
    // 单独传入的config的拦截器并执行
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // if (config.showLoading === false) {
      //   this.showLoading = config.showLoading;
      // }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // this.showLoading = true;
          // 返回结果
          resolve(res);
        })
        .catch((error) => {
          // this.showLoading = true;
          reject(error);
          return error;
        });
    });
  }
  get<T = any>(config: CherryConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T = any>(config: CherryConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T = any>(config: CherryConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  put<T = any>(config: CherryConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }
  patch<T = any>(config: CherryConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
  install(_vue: App, instance?: string) {
    _vue.config.globalProperties.$http = this;
    _vue.provide(instance || this.name || defaultService, this);
  }
}
export { defaultService, Request };
