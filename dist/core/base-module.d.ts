import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiError } from './api-error';
/**
 * 基础模块类
 * 所有功能模块的基类，提供通用的HTTP请求方法和错误处理
 */
export declare abstract class BaseModule {
    protected readonly httpClient: AxiosInstance;
    protected readonly basePath: string;
    /**
     * 创建基础模块实例
     * @param httpClient Axios实例
     * @param basePath API基础路径
     */
    constructor(httpClient: AxiosInstance, basePath: string);
    /**
     * 发送GET请求
     * @param path 请求路径（相对于basePath）
     * @param config Axios请求配置
     * @returns 响应数据
     */
    protected get<T>(path: string, config?: AxiosRequestConfig): Promise<T>;
    /**
     * 发送POST请求
     * @param path 请求路径（相对于basePath）
     * @param data 请求数据
     * @param config Axios请求配置
     * @returns 响应数据
     */
    protected post<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    /**
     * 发送PUT请求
     * @param path 请求路径（相对于basePath）
     * @param data 请求数据
     * @param config Axios请求配置
     * @returns 响应数据
     */
    protected put<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    /**
     * 发送PATCH请求
     * @param path 请求路径（相对于basePath）
     * @param data 请求数据
     * @param config Axios请求配置
     * @returns 响应数据
     */
    protected patch<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    /**
     * 发送DELETE请求
     * @param path 请求路径（相对于basePath）
     * @param config Axios请求配置
     * @returns 响应数据
     */
    protected delete<T = void>(path: string, config?: AxiosRequestConfig): Promise<T>;
    /**
     * 处理API错误
     * @param error 原始错误对象
     * @returns 格式化的API错误
     */
    protected handleError(error: any): ApiError;
}
