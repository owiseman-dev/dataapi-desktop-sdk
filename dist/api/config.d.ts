/**
 * API 配置接口
 */
export interface ApiConfig {
    /**
     * API 基础URL
     */
    apiUrl: string;
    /**
     * 请求超时时间（毫秒）
     */
    timeout: number;
    /**
     * 默认请求头
     */
    headers: Record<string, string>;
    /**
     * 是否自动刷新令牌
     */
    autoRefreshToken: boolean;
}
/**
 * 获取API配置
 * 合并全局配置和API特定配置
 */
export declare function getApiConfig(): ApiConfig;
/**
 * 创建带有认证信息的请求头
 * @param additionalHeaders 额外的请求头
 * @returns 包含认证信息的请求头
 */
export declare function createAuthHeaders(additionalHeaders?: Record<string, string>): Record<string, string>;
/**
 * 构建完整的API URL
 * @param path API路径
 * @returns 完整的API URL
 */
export declare function buildApiUrl(path: string): string;
/**
 * 处理API响应
 * @param response API响应
 * @returns 处理后的响应数据
 */
export declare function handleApiResponse(response: any): Promise<any>;
