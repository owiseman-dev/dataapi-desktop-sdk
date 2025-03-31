import { AxiosRequestConfig } from 'axios';
import { AuthModule } from './modules/auth';
import { StorageModule } from './modules/storage';
import { DatabaseModule } from './modules/database';
import { GatewayModule } from './modules/gateway';
import { PluginModule } from './modules/plugin';
import { KnowledgeModule } from './modules/knowledge';
import { WorkflowModule } from './modules/workflow';
/**
 * SDK配置选项
 */
export interface DataAPIClientOptions extends AxiosRequestConfig {
    /** API基础URL */
    baseURL: string;
    /** 请求超时时间（毫秒） */
    timeout?: number;
    /** 是否自动刷新令牌 */
    autoRefreshToken?: boolean;
    /** 是否在浏览器环境中使用localStorage存储令牌 */
    useLocalStorage?: boolean;
    /** 自定义令牌存储键名 */
    tokenStorageKey?: string;
    /** 自定义刷新令牌存储键名 */
    refreshTokenStorageKey?: string;
}
/**
 * DataAPI客户端类
 * SDK的主入口，整合所有功能模块
 */
export declare class DataAPIClient {
    /** HTTP客户端 */
    private readonly httpClient;
    /** 配置选项 */
    private readonly options;
    /** 用户认证模块 */
    readonly auth: AuthModule;
    /** 存储管理模块 */
    readonly storage: StorageModule;
    /** 数据库管理模块 */
    readonly database: DatabaseModule;
    /** 网关管理模块 */
    readonly gateway: GatewayModule;
    /** 插件管理模块 */
    readonly plugin: PluginModule;
    /** 知识库管理模块 */
    readonly knowledge: KnowledgeModule;
    /** 流程管理模块 */
    readonly workflow: WorkflowModule;
    /**
     * 创建DataAPI客户端实例
     * @param options 配置选项
     */
    constructor(options: DataAPIClientOptions);
    /**
     * 获取访问令牌
     * @returns 访问令牌
     */
    private getAccessToken;
    /**
     * 设置访问令牌
     * @param token 访问令牌
     */
    private setAccessToken;
    /**
     * 获取刷新令牌
     * @returns 刷新令牌
     */
    private getRefreshToken;
    /**
     * 设置刷新令牌
     * @param token 刷新令牌
     */
    private setRefreshToken;
    /**
     * 清除所有令牌
     */
    private clearTokens;
}
