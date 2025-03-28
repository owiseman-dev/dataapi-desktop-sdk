/**
 * 登录凭证接口
 */
export interface LoginCredentials {
    username: string;
    password: string;
    projectId?: string;
    realmName?: string;
}
/**
 * 登录响应接口
 */
export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user?: any;
}
/**
 * 用户登录
 * @param credentials 登录凭证
 * @returns 登录结果
 */
export declare function login(credentials: LoginCredentials): Promise<AuthResponse>;
/**
 * 退出登录
 */
export declare function logout(): Promise<void>;
/**
 * 刷新令牌
 * @param refreshToken 刷新令牌
 * @returns 新的令牌信息
 */
export declare function refreshToken(refreshToken: string): Promise<AuthResponse>;
