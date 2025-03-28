import { invoke } from '@tauri-apps/api/tauri';
import { getApiConfig } from './config';
import { getStorageKey } from '../core/config';

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
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const config = getApiConfig();
  
  try {
    // 判断是否为项目内登录
    const endpoint = credentials.projectId && credentials.realmName 
      ? '/api/auth/norm'
      : '/api/auth/login';
    
    const response = await invoke('plugin:http|fetch', {
      url: `${config.apiUrl}${endpoint}`,
      method: 'POST',
      body: JSON.stringify(credentials),  // 使用 credentials 而不是 data
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // 添加类型断言
    const typedResponse = response as any;
    
    // 保存token到本地存储
    if (typedResponse.data) {
      localStorage.setItem(getStorageKey('access_token'), typedResponse.data.access_token);
      localStorage.setItem(getStorageKey('refresh_token'), typedResponse.data.refresh_token);
    }
    
    return typedResponse.data;
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
}

/**
 * 退出登录
 */
export async function logout(): Promise<void> {
  const config = getApiConfig();
  
  try {
    const token = localStorage.getItem(getStorageKey('access_token'));
    if (token) {
      await invoke('plugin:http|fetch', {
        url: `${config.apiUrl}/api/auth/logout`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
  } catch (error) {
    console.error('退出登录失败:', error);
  } finally {
    localStorage.removeItem(getStorageKey('access_token'));
    localStorage.removeItem(getStorageKey('refresh_token'));
  }
}

/**
 * 刷新令牌
 * @param refreshToken 刷新令牌
 * @returns 新的令牌信息
 */
export async function refreshToken(refreshToken: string): Promise<AuthResponse> {
  const config = getApiConfig();
  
  try {
    const response = await invoke('plugin:http|fetch', {
      url: `${config.apiUrl}/api/auth/refresh`,
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // 添加类型断言
    const typedResponse = response as any;
    
    // 更新本地存储的token
    if (typedResponse.data) {
      localStorage.setItem(getStorageKey('access_token'), typedResponse.data.access_token);
      localStorage.setItem(getStorageKey('refresh_token'), typedResponse.data.refresh_token);
    }
    
    return typedResponse.data;
  } catch (error) {
    console.error('刷新令牌失败:', error);
    throw error;
  }
}