"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAPIClient = void 0;
const axios_1 = __importDefault(require("axios"));
const auth_1 = require("./modules/auth");
const storage_1 = require("./modules/storage");
const database_1 = require("./modules/database");
const gateway_1 = require("./modules/gateway");
const plugin_1 = require("./modules/plugin");
const knowledge_1 = require("./modules/knowledge");
const workflow_1 = require("./modules/workflow");
/**
 * DataAPI客户端类
 * SDK的主入口，整合所有功能模块
 */
class DataAPIClient {
    /**
     * 创建DataAPI客户端实例
     * @param options 配置选项
     */
    constructor(options) {
        this.options = {
            timeout: 30000,
            autoRefreshToken: true,
            useLocalStorage: typeof window !== 'undefined',
            tokenStorageKey: 'dataapi_access_token',
            refreshTokenStorageKey: 'dataapi_refresh_token',
            ...options
        };
        // 创建Axios实例
        this.httpClient = axios_1.default.create(this.options);
        // 配置请求拦截器，添加认证头
        this.httpClient.interceptors.request.use((config) => {
            const token = this.getAccessToken();
            if (token) {
                config.headers = config.headers || {};
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        });
        // 配置响应拦截器，处理令牌刷新
        this.httpClient.interceptors.response.use((response) => response, async (error) => {
            const originalRequest = error.config;
            // 如果是401错误且启用了自动刷新令牌，且不是刷新令牌请求本身
            if (error.response?.status === 401 &&
                this.options.autoRefreshToken &&
                !originalRequest._isRetry &&
                !originalRequest.url?.includes('/auth/refresh')) {
                originalRequest._isRetry = true;
                try {
                    // 尝试刷新令牌
                    const refreshToken = this.getRefreshToken();
                    if (!refreshToken) {
                        throw new Error('No refresh token available');
                    }
                    const response = await this.auth.refreshToken(refreshToken);
                    // 保存新令牌
                    this.setAccessToken(response.accessToken);
                    this.setRefreshToken(response.refreshToken);
                    // 重试原始请求
                    originalRequest.headers['Authorization'] = `Bearer ${response.accessToken}`;
                    return this.httpClient(originalRequest);
                }
                catch (refreshError) {
                    // 刷新令牌失败，清除令牌并返回原始错误
                    this.clearTokens();
                    return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        });
        // 初始化各功能模块
        this.auth = new auth_1.AuthModule(this.httpClient);
        this.storage = new storage_1.StorageModule(this.httpClient);
        this.database = new database_1.DatabaseModule(this.httpClient);
        this.gateway = new gateway_1.GatewayModule(this.httpClient);
        this.plugin = new plugin_1.PluginModule(this.httpClient);
        this.knowledge = new knowledge_1.KnowledgeModule(this.httpClient);
        this.workflow = new workflow_1.WorkflowModule(this.httpClient);
    }
    /**
     * 获取访问令牌
     * @returns 访问令牌
     */
    getAccessToken() {
        if (this.options.useLocalStorage && typeof localStorage !== 'undefined') {
            return localStorage.getItem(this.options.tokenStorageKey);
        }
        return null;
    }
    /**
     * 设置访问令牌
     * @param token 访问令牌
     */
    setAccessToken(token) {
        if (this.options.useLocalStorage && typeof localStorage !== 'undefined') {
            localStorage.setItem(this.options.tokenStorageKey, token);
        }
    }
    /**
     * 获取刷新令牌
     * @returns 刷新令牌
     */
    getRefreshToken() {
        if (this.options.useLocalStorage && typeof localStorage !== 'undefined') {
            return localStorage.getItem(this.options.refreshTokenStorageKey);
        }
        return null;
    }
    /**
     * 设置刷新令牌
     * @param token 刷新令牌
     */
    setRefreshToken(token) {
        if (this.options.useLocalStorage && typeof localStorage !== 'undefined') {
            localStorage.setItem(this.options.refreshTokenStorageKey, token);
        }
    }
    /**
     * 清除所有令牌
     */
    clearTokens() {
        if (this.options.useLocalStorage && typeof localStorage !== 'undefined') {
            localStorage.removeItem(this.options.tokenStorageKey);
            localStorage.removeItem(this.options.refreshTokenStorageKey);
        }
    }
}
exports.DataAPIClient = DataAPIClient;
//# sourceMappingURL=index.js.map