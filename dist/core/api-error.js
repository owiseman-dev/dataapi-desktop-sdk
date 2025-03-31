"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
/**
 * API错误类
 * 用于统一处理和格式化API请求过程中遇到的错误
 */
class ApiError extends Error {
    /**
     * 创建API错误实例
     * @param message 错误消息
     * @param statusCode HTTP状态码
     * @param details 错误详情
     */
    constructor(message, statusCode, details) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.details = details;
        // 确保instanceof正常工作
        Object.setPrototypeOf(this, ApiError.prototype);
    }
    /**
     * 检查是否为特定HTTP状态码的错误
     * @param statusCode HTTP状态码
     * @returns 是否匹配
     */
    isStatus(statusCode) {
        return this.statusCode === statusCode;
    }
    /**
     * 检查是否为认证错误（401）
     * @returns 是否为认证错误
     */
    isUnauthorized() {
        return this.isStatus(401);
    }
    /**
     * 检查是否为权限错误（403）
     * @returns 是否为权限错误
     */
    isForbidden() {
        return this.isStatus(403);
    }
    /**
     * 检查是否为资源不存在错误（404）
     * @returns 是否为资源不存在错误
     */
    isNotFound() {
        return this.isStatus(404);
    }
    /**
     * 检查是否为服务器错误（500+）
     * @returns 是否为服务器错误
     */
    isServerError() {
        return this.statusCode >= 500;
    }
    /**
     * 检查是否为网络错误（状态码为0）
     * @returns 是否为网络错误
     */
    isNetworkError() {
        return this.statusCode === 0;
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=api-error.js.map