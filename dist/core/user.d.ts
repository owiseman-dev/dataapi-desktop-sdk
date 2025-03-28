import { EventCallback } from './events';
import { UserLoginDto, UserRegisterDto, UserResponse } from '../api/user';
export declare class UserManager {
    private events;
    private _currentUser;
    private authStateListeners;
    /**
     * 初始化用户管理器
     */
    constructor();
    /**
     * 从本地存储恢复用户会话
     */
    restoreSession(): Promise<UserResponse | null>;
    /**
     * 用户注册
     * @param data 注册信息
     * @returns 注册结果
     */
    createUser(data: UserRegisterDto): Promise<any>;
    /**
     * 用户登录
     * @param data 登录信息
     * @returns 登录结果
     */
    signIn(data: UserLoginDto): Promise<any>;
    /**
     * 退出登录
     */
    signOut(): Promise<void>;
    /**
     * 刷新令牌
     */
    refreshToken(): Promise<any>;
    /**
     * 获取当前用户
     * @returns 当前用户信息
     */
    getCurrentUser(): UserResponse | null;
    /**
     * 监听认证状态变化
     * @param listener 监听器函数
     * @returns 取消监听的函数
     */
    onAuthStateChanged(listener: (user: UserResponse | null) => void): () => void;
    /**
     * 通知所有认证状态监听器
     */
    private _notifyAuthStateChanged;
    /**
     * 监听用户事件
     * @param event 事件名称
     * @param callback 回调函数
     */
    on(event: string, callback: EventCallback): UserManager;
    /**
     * 取消监听用户事件
     * @param event 事件名称
     * @param callback 回调函数
     */
    off(event: string, callback?: EventCallback): UserManager;
}
