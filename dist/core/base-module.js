"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModule = void 0;
const api_error_1 = require("./api-error");
/**
 * 基础模块类
 * 所有功能模块的基类，提供通用的HTTP请求方法和错误处理
 */
class BaseModule {
    /**
     * 创建基础模块实例
     * @param httpClient Axios实例
     * @param basePath API基础路径
     */
    constructor(httpClient, basePath) {
        this.httpClient = httpClient;
        this.basePath = basePath;
    }
    /**
     * 发送GET请求
     * @param path 请求路径（相对于basePath）
     * @param config Axios请求配置
     * @returns 响应数据
     */
    async get(path, config) {
        try {
            const response = await this.httpClient.get(`${this.basePath}${path}`, config);
            return response.data;
        }
        catch (error) {
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
    async post(path, data, config) {
        try {
            const response = await this.httpClient.post(`${this.basePath}${path}`, data, config);
            return response.data;
        }
        catch (error) {
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
    async put(path, data, config) {
        try {
            const response = await this.httpClient.put(`${this.basePath}${path}`, data, config);
            return response.data;
        }
        catch (error) {
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
    async patch(path, data, config) {
        try {
            const response = await this.httpClient.patch(`${this.basePath}${path}`, data, config);
            return response.data;
        }
        catch (error) {
            throw this.handleError(error);
        }
    }
    /**
     * 发送DELETE请求
     * @param path 请求路径（相对于basePath）
     * @param config Axios请求配置
     * @returns 响应数据
     */
    async delete(path, config) {
        try {
            const response = await this.httpClient.delete(`${this.basePath}${path}`, config);
            return response.data;
        }
        catch (error) {
            throw this.handleError(error);
        }
    }
    /**
     * 处理API错误
     * @param error 原始错误对象
     * @returns 格式化的API错误
     */
    handleError(error) {
        if (error.response) {
            // 服务器返回了错误响应
            const { status, data, statusText } = error.response;
            const message = data?.message || data?.error || statusText || '未知错误';
            return new api_error_1.ApiError(message, status, data);
        }
        else if (error.request) {
            // 请求已发送但未收到响应
            return new api_error_1.ApiError('无法连接到服务器', 0, { request: error.request });
        }
        else {
            // 请求配置出错
            return new api_error_1.ApiError(error.message || '请求配置错误', 0, error);
        }
    }
}
exports.BaseModule = BaseModule;
//# sourceMappingURL=base-module.js.map