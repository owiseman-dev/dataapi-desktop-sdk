/**
 * SDK配置接口
 */
export interface SdkConfig {
    /**
     * API服务器地址
     */
    apiUrl: string;
    /**
     * 请求超时时间（毫秒）
     */
    timeout: number;
    /**
     * 是否启用调试模式
     */
    debug: boolean;
    /**
     * 是否自动刷新令牌
     */
    autoRefreshToken: boolean;
    /**
     * 本地存储前缀
     */
    storagePrefix: string;
    /**
     * API特定配置
     */
    api?: {
        /**
         * 请求重试次数
         */
        retries?: number;
        /**
         * 请求重试延迟（毫秒）
         */
        retryDelay?: number;
        /**
         * 默认请求头
         */
        headers?: Record<string, string>;
    };
    /**
     * 插件配置
     */
    plugins?: Record<string, any>;
}
/**
 * 初始化SDK配置
 * @param config 用户提供的配置
 */
export declare function initConfig(config?: Partial<SdkConfig>): void;
/**
 * 获取当前SDK配置
 * @returns 当前配置
 */
export declare function getConfig(): SdkConfig;
/**
 * 更新SDK配置
 * @param config 要更新的配置
 */
export declare function updateConfig(config: Partial<SdkConfig>): void;
/**
 * 重置SDK配置为默认值
 */
export declare function resetConfig(): void;
/**
 * 获取带前缀的存储键
 * @param key 原始键
 * @returns 带前缀的键
 */
export declare function getStorageKey(key: string): string;
/**
 * 验证配置是否有效
 * @param config 要验证的配置
 * @returns 验证结果，如果有错误则返回错误信息
 */
export declare function validateConfig(config: Partial<SdkConfig>): {
    valid: boolean;
    errors?: string[];
};
