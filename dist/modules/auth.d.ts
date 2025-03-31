import { AxiosInstance } from 'axios';
import { BaseModule } from '../core/base-module';
/**
 * 用户信息接口
 */
export interface UserInfo {
    id: string;
    username: string;
    email: string;
    fullName?: string;
    avatar?: string;
    roles: string[];
    permissions: string[];
    createdAt: string;
    updatedAt: string;
    lastLoginAt?: string;
    metadata?: Record<string, any>;
}
/**
 * 登录请求参数
 */
export interface LoginParams {
    username: string;
    password: string;
    rememberMe?: boolean;
}
/**
 * 登录响应
 */
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: UserInfo;
}
/**
 * 注册请求参数
 */
export interface RegisterParams {
    username: string;
    email: string;
    password: string;
    fullName?: string;
    metadata?: Record<string, any>;
}
/**
 * 密码重置请求参数
 */
export interface ResetPasswordParams {
    email: string;
}
/**
 * 密码更新请求参数
 */
export interface UpdatePasswordParams {
    currentPassword: string;
    newPassword: string;
}
/**
 * 用户认证模块
 * 处理用户登录、注册、权限验证等功能
 */
export declare class AuthModule extends BaseModule {
    /**
     * 创建用户认证模块实例
     * @param httpClient Axios实例
     */
    constructor(httpClient: AxiosInstance);
    /**
     * 用户登录
     * @param usernameOrEmail 用户名或邮箱
     * @param password 密码
     * @param rememberMe 是否记住登录状态
     * @returns 登录响应
     */
    login(usernameOrEmail: string, password: string, rememberMe?: boolean): Promise<LoginResponse>;
    /**
     * 用户注册
     * @param params 注册参数
     * @returns 用户信息
     */
    register(params: RegisterParams): Promise<UserInfo>;
    /**
     * 用户登出
     * @returns 操作结果
     */
    logout(): Promise<void>;
    /**
     * 刷新访问令牌
     * @param refreshToken 刷新令牌
     * @returns 新的登录响应
     */
    refreshToken(refreshToken: string): Promise<LoginResponse>;
    /**
     * 获取当前用户信息
     * @returns 用户信息
     */
    getCurrentUser(): Promise<UserInfo>;
    /**
     * 请求密码重置
     * @param email 用户邮箱
     * @returns 操作结果
     */
    requestPasswordReset(email: string): Promise<void>;
    /**
     * 更新密码
     * @param params 密码更新参数
     * @returns 操作结果
     */
    updatePassword(params: UpdatePasswordParams): Promise<void>;
    /**
     * 验证令牌是否有效
     * @returns 是否有效
     */
    validateToken(): Promise<boolean>;
    /**
     * 检查用户是否具有指定角色
     * @param role 角色名称
     * @returns 是否具有该角色
     */
    hasRole(role: string): Promise<boolean>;
    /**
     * 检查用户是否具有指定权限
     * @param permission 权限名称
     * @returns 是否具有该权限
     */
    hasPermission(permission: string): Promise<boolean>;
}
