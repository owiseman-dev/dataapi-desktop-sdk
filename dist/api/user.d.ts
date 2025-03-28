export interface UserRegisterDto {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    projectId?: string;
    realmName?: string;
}
export interface UserLoginDto {
    username: string;
    password: string;
    projectId?: string;
    realmName?: string;
}
export interface UserResponse {
    id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
}
export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    user: UserResponse;
}
/**
 * 用户注册
 * @param data 注册信息
 * @returns 注册结果
 */
export declare function register(data: UserRegisterDto): Promise<any>;
/**
 * 用户登录
 * @param data 登录信息
 * @returns 登录结果，包含token和用户信息
 */
export declare function login(data: UserLoginDto): Promise<LoginResponse>;
/**
 * 刷新令牌
 * @param refreshToken 刷新令牌
 * @returns 新的令牌信息
 */
export declare function refreshToken(refreshToken: string): Promise<LoginResponse>;
/**
 * 退出登录
 */
export declare function logout(): Promise<void>;
/**
 * 获取当前用户信息
 * @returns 用户信息
 */
export declare function getCurrentUser(): Promise<UserResponse | null>;
