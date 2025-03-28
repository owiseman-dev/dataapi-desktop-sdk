import { invoke } from '@tauri-apps/api/tauri';
// 添加正确的导入
import { getApiConfig } from './config'; // 导入 getApiConfig 而不是 getConfig
import { getStorageKey } from '../core/config';
/**
 * 用户注册
 * @param data 注册信息
 * @returns 注册结果
 */
export async function register(data) {
    const config = getApiConfig();
    try {
        // 判断是否为项目内注册
        const endpoint = data.projectId && data.realmName
            ? '/api/register/norm'
            : '/api/register';
        return await invoke('plugin:http|fetch', {
            url: `${config.apiUrl}${endpoint}`,
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    catch (error) {
        console.error('注册失败:', error);
        throw error;
    }
}
/**
 * 用户登录
 * @param data 登录信息
 * @returns 登录结果，包含token和用户信息
 */
export async function login(data) {
    const config = getApiConfig(); // 使用 getApiConfig 而不是 getConfig
    try {
        // 判断是否为项目内登录
        const endpoint = data.projectId && data.realmName
            ? '/api/auth/norm'
            : '/api/auth/login';
        const response = await invoke('plugin:http|fetch', {
            url: `${config.apiUrl}${endpoint}`, // 使用 apiUrl 而不是 baseUrl
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // 处理响应，添加类型断言
        const typedResponse = response;
        // 保存token到本地存储
        if (typedResponse.data) {
            localStorage.setItem(getStorageKey('access_token'), typedResponse.data.access_token);
            localStorage.setItem(getStorageKey('refresh_token'), typedResponse.data.refresh_token);
        }
        return typedResponse.data;
    }
    catch (error) {
        console.error('登录失败:', error);
        throw error;
    }
}
/**
 * 刷新令牌
 * @param refreshToken 刷新令牌
 * @returns 新的令牌信息
 */
export async function refreshToken(refreshToken) {
    const config = getApiConfig(); // 修改为 getApiConfig
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
        const typedResponse = response;
        // 更新本地存储的token
        if (typedResponse.data) {
            localStorage.setItem(getStorageKey('access_token'), typedResponse.data.access_token);
            localStorage.setItem(getStorageKey('refresh_token'), typedResponse.data.refresh_token);
        }
        return typedResponse.data;
    }
    catch (error) {
        console.error('刷新令牌失败:', error);
        throw error;
    }
}
/**
 * 退出登录
 */
export async function logout() {
    localStorage.removeItem(getStorageKey('access_token')); // 添加 getStorageKey
    localStorage.removeItem(getStorageKey('refresh_token')); // 添加 getStorageKey
}
/**
 * 获取当前用户信息
 * @returns 用户信息
 */
export async function getCurrentUser() {
    const token = localStorage.getItem(getStorageKey('access_token')); // 添加 getStorageKey
    if (!token)
        return null;
    const config = getApiConfig();
    try {
        const response = await invoke('plugin:http|fetch', {
            url: `${config.apiUrl}/api/users/me`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // 添加类型断言
        const typedResponse = response;
        return typedResponse.data;
    }
    catch (error) {
        console.error('获取用户信息失败:', error);
        return null;
    }
}
