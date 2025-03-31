import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from './api-error';

/**
 * 基础模块类
 * 所有功能模块的基类，提供通用的HTTP请求方法和错误处理
 */
export abstract class BaseModule {
  protected readonly httpClient: AxiosInstance;
  protected readonly basePath: string;

  /**
   * 创建基础模块实例
   * @param httpClient Axios实例
   * @param basePath API基础路径
   */
  constructor(httpClient: AxiosInstance, basePath: string) {
    this.httpClient = httpClient;
    this.basePath = basePath;
  }

  /**
   * 发送GET请求
   * @param path 请求路径（相对于basePath）
   * @param config Axios请求配置
   * @returns 响应数据
   */
  protected async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.httpClient.get<T>(`${this.basePath}${path}`, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 发送POST请求
   * @param path 请求路径（相对于basePath）
   * @param data 请求数据
   * @param config Axios请求配置
   * @returns 响应数据
   */
  protected async post<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.httpClient.post<T>(`${this.basePath}${path}`, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 发送PUT请求
   * @param path 请求路径（相对于basePath）
   * @param data 请求数据
   * @param config Axios请求配置
   * @returns 响应数据
   */
  protected async put<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.httpClient.put<T>(`${this.basePath}${path}`, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 发送PATCH请求
   * @param path 请求路径（相对于basePath）
   * @param data 请求数据
   * @param config Axios请求配置
   * @returns 响应数据
   */
  protected async patch<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.httpClient.patch<T>(`${this.basePath}${path}`, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 发送DELETE请求
   * @param path 请求路径（相对于basePath）
   * @param config Axios请求配置
   * @returns 响应数据
   */
  protected async delete<T = void>(path: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.httpClient.delete<T>(`${this.basePath}${path}`, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 处理API错误
   * @param error 原始错误对象
   * @returns 格式化的API错误
   */
  protected handleError(error: any): ApiError {
    if (error.response) {
      // 服务器返回了错误响应
      const { status, data, statusText } = error.response;
      const message = data?.message || data?.error || statusText || '未知错误';
      return new ApiError(message, status, data);
    } else if (error.request) {
      // 请求已发送但未收到响应
      return new ApiError('无法连接到服务器', 0, { request: error.request });
    } else {
      // 请求配置出错
      return new ApiError(error.message || '请求配置错误', 0, error);
    }
  }
}