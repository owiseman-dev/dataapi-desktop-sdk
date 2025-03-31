/**
 * API错误类
 * 用于统一处理和格式化API请求过程中遇到的错误
 */
export declare class ApiError extends Error {
    /** HTTP状态码 */
    readonly statusCode: number;
    /** 错误详情 */
    readonly details: any;
    /**
     * 创建API错误实例
     * @param message 错误消息
     * @param statusCode HTTP状态码
     * @param details 错误详情
     */
    constructor(message: string, statusCode: number, details?: any);
    /**
     * 检查是否为特定HTTP状态码的错误
     * @param statusCode HTTP状态码
     * @returns 是否匹配
     */
    isStatus(statusCode: number): boolean;
    /**
     * 检查是否为认证错误（401）
     * @returns 是否为认证错误
     */
    isUnauthorized(): boolean;
    /**
     * 检查是否为权限错误（403）
     * @returns 是否为权限错误
     */
    isForbidden(): boolean;
    /**
     * 检查是否为资源不存在错误（404）
     * @returns 是否为资源不存在错误
     */
    isNotFound(): boolean;
    /**
     * 检查是否为服务器错误（500+）
     * @returns 是否为服务器错误
     */
    isServerError(): boolean;
    /**
     * 检查是否为网络错误（状态码为0）
     * @returns 是否为网络错误
     */
    isNetworkError(): boolean;
}
