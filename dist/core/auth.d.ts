export interface LoginDto {
    username: string;
    password: string;
}
export interface RegisterDto {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}
export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
}
/**
 * 用户登录
 */
export declare function login(data: LoginDto): Promise<LoginResponse>;
/**
 * 用户注册
 */
export declare function register(data: RegisterDto): Promise<any>;
/**
 * 刷新令牌
 */
export declare function refreshToken(refreshToken: string): Promise<LoginResponse>;
/**
 * 退出登录
 */
export declare function logout(): Promise<void>;
