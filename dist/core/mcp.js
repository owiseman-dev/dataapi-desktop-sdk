import { invoke } from '@tauri-apps/api/tauri';
import { getConfig } from './config'; // 确保从正确的路径导入
/**
 * 发送MCP请求
 */
export async function sendRequest(request) {
    const config = getConfig();
    try {
        return await invoke('plugin:http|fetch', {
            url: `${config.apiUrl}/api/mcp/execute`,
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });
    }
    catch (error) {
        console.error('发送MCP请求失败:', error);
        throw error;
    }
}
/**
 * 获取MCP服务状态
 */
export async function getStatus() {
    const config = getConfig();
    try {
        return await invoke('plugin:http|fetch', {
            url: `${config.apiUrl}/api/mcp/status`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });
    }
    catch (error) {
        console.error('获取MCP状态失败:', error);
        throw error;
    }
}
