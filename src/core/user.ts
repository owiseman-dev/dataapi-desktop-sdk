import { EventSystem, EventCallback } from './events';  // 导入 EventCallback
import { getStorageKey } from './config';
import { UserLoginDto, UserRegisterDto, UserResponse, login as apiLogin, register as apiRegister, getCurrentUser, logout as apiLogout, refreshToken as apiRefreshToken } from '../api/user';

export class UserManager {
  private events = new EventSystem();
  private _currentUser: UserResponse | null = null;
  private authStateListeners: Array<(user: UserResponse | null) => void> = [];
  
  /**
   * 初始化用户管理器
   */
  constructor() {}
  
  /**
   * 从本地存储恢复用户会话
   */
  async restoreSession(): Promise<UserResponse | null> {
    const token = localStorage.getItem(getStorageKey('access_token'));
    if (token) {
      try {
        this._currentUser = await getCurrentUser();  // 使用 _currentUser
        if (this._currentUser) {
          this._notifyAuthStateChanged();
          this.events.emit('user:restored', this._currentUser);
        }
        return this._currentUser;
      } catch (error) {
        console.error('恢复会话失败:', error);
        localStorage.removeItem(getStorageKey('access_token'));
        localStorage.removeItem(getStorageKey('refresh_token'));
        return null;
      }
    }
    return null;
  }
  
  /**
   * 用户注册
   * @param data 注册信息
   * @returns 注册结果
   */
  async createUser(data: UserRegisterDto): Promise<any> {
    const result = await apiRegister(data);
    this.events.emit('user:registered', result);
    return result;
  }
  
  /**
   * 用户登录
   * @param data 登录信息
   * @returns 登录结果
   */
  async signIn(data: UserLoginDto): Promise<any> {
    const result = await apiLogin(data);
    this._currentUser = result.user;  // 使用 _currentUser 而不是 currentUser
    this._notifyAuthStateChanged();
    this.events.emit('user:login', this._currentUser);  // 使用 _currentUser
    return result;
  }
  
  /**
   * 退出登录
   */
  async signOut(): Promise<void> {
    await apiLogout();
    this._currentUser = null;  // 使用 _currentUser
    this._notifyAuthStateChanged();
    this.events.emit('user:logout');
  }
  
  /**
   * 刷新令牌
   */
  async refreshToken(): Promise<any> {
    const refreshToken = localStorage.getItem(getStorageKey('refresh_token'));
    if (!refreshToken) {
      throw new Error('没有可用的刷新令牌');
    }
    
    return await apiRefreshToken(refreshToken);
  }
  
  /**
   * 获取当前用户
   * @returns 当前用户信息
   */
  getCurrentUser(): UserResponse | null {  // 重命名方法为 getCurrentUser
    return this._currentUser;
  }
  
  /**
   * 监听认证状态变化
   * @param listener 监听器函数
   * @returns 取消监听的函数
   */
  onAuthStateChanged(listener: (user: UserResponse | null) => void): () => void {
    this.authStateListeners.push(listener);
    
    // 立即触发一次当前状态
    listener(this._currentUser);  // 使用 _currentUser
    
    // 返回取消监听的函数
    return () => {
      const index = this.authStateListeners.indexOf(listener);
      if (index !== -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }
  
  /**
   * 通知所有认证状态监听器
   */
  private _notifyAuthStateChanged(): void {
    for (const listener of this.authStateListeners) {
      listener(this._currentUser);  // 使用 _currentUser
    }
  }
  
  /**
   * 监听用户事件
   * @param event 事件名称
   * @param callback 回调函数
   */
  on(event: string, callback: EventCallback): UserManager {  // 使用 EventCallback 类型
    this.events.on(event, callback);
    return this;
  }
  
  /**
   * 取消监听用户事件
   * @param event 事件名称
   * @param callback 回调函数
   */
  off(event: string, callback?: EventCallback): UserManager {
    if (callback) {
      this.events.offListener(event, callback);  // 使用 offListener 而不是 off
    } else {
      this.events.off(event);  // 只传递事件名称
    }
    return this;
  }
}