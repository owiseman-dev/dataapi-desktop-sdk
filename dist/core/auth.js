import { invoke } from '@tauri-apps/api/tauri';
import { getConfig } from '../core/config';
/**
 * 用户登录
 */
export async function login(data) {
    const config = getConfig();
    try {
        // 使用Tauri的invoke调用Rust函数
        return await invoke('plugin:http|fetch', {
            url: `${config.apiUrl}/api/auth/login`,
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    catch (error) {
        console.error('登录失败:', error);
        throw error;
    }
}
/**
 * 用户注册
 */
export async function register(data) {
    const config = getConfig();
    try {
        return await invoke('plugin:http|fetch', {
            url: `${config.apiUrl}/api/auth/register`,
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
 * 刷新令牌
 */
export async function refreshToken(refreshToken) {
    const config = getConfig();
    try {
        return await invoke('plugin:http|fetch', {
            url: `${config.apiUrl}/api/auth/refresh`,
            method: 'POST',
            body: JSON.stringify({ refresh_token: refreshToken }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
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
    const config = getConfig();
    try {
        await invoke('plugin:http|fetch', {
            url: `${config.apiUrl}/api/auth/logout`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    catch (error) {
        console.error('退出登录失败:', error);
        throw error;
    }
}
