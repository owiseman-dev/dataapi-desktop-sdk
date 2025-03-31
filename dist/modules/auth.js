"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const base_module_1 = require("../core/base-module");
/**
 * 用户认证模块
 * 处理用户登录、注册、权限验证等功能
 */
class AuthModule extends base_module_1.BaseModule {
    /**
     * 创建用户认证模块实例
     * @param httpClient Axios实例
     */
    constructor(httpClient) {
        super(httpClient, '/api/auth');
    }
    /**
     * 用户登录
     * @param usernameOrEmail 用户名或邮箱
     * @param password 密码
     * @param rememberMe 是否记住登录状态
     * @returns 登录响应
     */
    async login(usernameOrEmail, password, rememberMe = false) {
        const params = {
            username: usernameOrEmail,
            password,
            rememberMe
        };
        return this.post('/login', params);
    }
    /**
     * 用户注册
     * @param params 注册参数
     * @returns 用户信息
     */
    async register(params) {
        return this.post('/register', params);
    }
    /**
     * 用户登出
     * @returns 操作结果
     */
    async logout() {
        await this.post('/logout');
    }
    /**
     * 刷新访问令牌
     * @param refreshToken 刷新令牌
     * @returns 新的登录响应
     */
    async refreshToken(refreshToken) {
        return this.post('/refresh', { refreshToken });
    }
    /**
     * 获取当前用户信息
     * @returns 用户信息
     */
    async getCurrentUser() {
        return this.get('/me');
    }
    /**
     * 请求密码重置
     * @param email 用户邮箱
     * @returns 操作结果
     */
    async requestPasswordReset(email) {
        await this.post('/password/reset', { email });
    }
    /**
     * 更新密码
     * @param params 密码更新参数
     * @returns 操作结果
     */
    async updatePassword(params) {
        await this.post('/password/update', params);
    }
    /**
     * 验证令牌是否有效
     * @returns 是否有效
     */
    async validateToken() {
        try {
            await this.get('/validate');
            return true;
        }
        catch (error) {
            return false;
        }
    }
    /**
     * 检查用户是否具有指定角色
     * @param role 角色名称
     * @returns 是否具有该角色
     */
    async hasRole(role) {
        try {
            const user = await this.getCurrentUser();
            return user.roles.includes(role);
        }
        catch (error) {
            return false;
        }
    }
    /**
     * 检查用户是否具有指定权限
     * @param permission 权限名称
     * @returns 是否具有该权限
     */
    async hasPermission(permission) {
        try {
            const user = await this.getCurrentUser();
            return user.permissions.includes(permission);
        }
        catch (error) {
            return false;
        }
    }
}
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.js.map