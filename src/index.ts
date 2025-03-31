import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
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
export class DataAPIClient {
  /** HTTP客户端 */
  private readonly httpClient: AxiosInstance;
  /** 配置选项 */
  private readonly options: DataAPIClientOptions;

  /** 用户认证模块 */
  public readonly auth: AuthModule;
  /** 存储管理模块 */
  public readonly storage: StorageModule;
  /** 数据库管理模块 */
  public readonly database: DatabaseModule;
  /** 网关管理模块 */
  public readonly gateway: GatewayModule;
  /** 插件管理模块 */
  public readonly plugin: PluginModule;
  /** 知识库管理模块 */
  public readonly knowledge: KnowledgeModule;
  /** 流程管理模块 */
  public readonly workflow: WorkflowModule;

  /**
   * 创建DataAPI客户端实例
   * @param options 配置选项
   */
  constructor(options: DataAPIClientOptions) {
    this.options = {
      timeout: 30000,
      autoRefreshToken: true,
      useLocalStorage: typeof window !== 'undefined',
      tokenStorageKey: 'dataapi_access_token',
      refreshTokenStorageKey: 'dataapi_refresh_token',
      ...options
    };

    // 创建Axios实例
    this.httpClient = axios.create(this.options);

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
    this.httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // 如果是401错误且启用了自动刷新令牌，且不是刷新令牌请求本身
        if (
          error.response?.status === 401 &&
          this.options.autoRefreshToken &&
          !originalRequest._isRetry &&
          !originalRequest.url?.includes('/auth/refresh')
        ) {
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
          } catch (refreshError) {
            // 刷新令牌失败，清除令牌并返回原始错误
            this.clearTokens();
            return Promise.reject(error);
          }
        }
        
        return Promise.reject(error);
      }
    );

    // 初始化各功能模块
    this.auth = new AuthModule(this.httpClient);
    this.storage = new StorageModule(this.httpClient);
    this.database = new DatabaseModule(this.httpClient);
    this.gateway = new GatewayModule(this.httpClient);
    this.plugin = new PluginModule(this.httpClient);
    this.knowledge = new KnowledgeModule(this.httpClient);
    this.workflow = new WorkflowModule(this.httpClient);
  }

  /**
   * 获取访问令牌
   * @returns 访问令牌
   */
  private getAccessToken(): string | null {
    if (this.options.useLocalStorage && typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.options.tokenStorageKey!);
    }
    return null;
  }

  /**
   * 设置访问令牌
   * @param token 访问令牌
   */
  private setAccessToken(token: string): void {
    if (this.options.useLocalStorage && typeof localStorage !== 'undefined') {
      localStorage.setItem(this.options.tokenStorageKey!, token);
    }
  }

  /**
   * 获取刷新令牌
   * @returns 刷新令牌
   */
  private getRefreshToken(): string | null {
    if (this.options.useLocalStorage && typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.options.refreshTokenStorageKey!);
    }
    return null;
  }

  /**
   * 设置刷新令牌
   * @param token 刷新令牌
   */
  private setRefreshToken(token: string): void {
    if (this.options.useLocalStorage && typeof localStorage !== 'undefined') {
      localStorage.setItem(this.options.refreshTokenStorageKey!, token);
    }
  }

  /**
   * 清除所有令牌
   */
  private clearTokens(): void {
    if (this.options.useLocalStorage && typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.options.tokenStorageKey!);
      localStorage.removeItem(this.options.refreshTokenStorageKey!);
    }
  }
}