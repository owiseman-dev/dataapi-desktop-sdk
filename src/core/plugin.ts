import { invoke } from '@tauri-apps/api/tauri';
import { getApiConfig } from '../api/config';  // 修改为 getApiConfig
import { getConfig } from './config';  // 确保从正确的路径导入

export interface PluginCommand {
  command: string;
  parameters: Record<string, string>;
}

export interface PluginResponse {
  success: boolean;
  result?: string;
  errorMessage?: string;
}

/**
 * 执行插件命令
 */
export async function executeCommand(pluginId: string, command: PluginCommand): Promise<PluginResponse> {
  const config = getConfig();
  
  try {
    return await invoke('plugin:http|fetch', {
      url: `${config.apiUrl}/api/plugins/${pluginId}/execute`,
      method: 'POST',
      body: JSON.stringify(command),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  } catch (error) {
    console.error('执行插件命令失败:', error);
    throw error;
  }
}

/**
 * 获取插件状态
 */
export async function getPluginStatus(pluginId: string): Promise<any> {
  const config = getConfig();
  
  try {
    return await invoke('plugin:http|fetch', {
      url: `${config.apiUrl}/api/plugins/${pluginId}/status`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  } catch (error) {
    console.error('获取插件状态失败:', error);
    throw error;
  }
}

/**
 * 启动MQTT插件
 */
export async function startMqttPlugin(): Promise<PluginResponse> {
  return executeCommand('mqtt', { command: 'start', parameters: {} });
}

/**
 * 停止MQTT插件
 */
export async function stopMqttPlugin(): Promise<PluginResponse> {
  return executeCommand('mqtt', { command: 'stop', parameters: {} });
}

/**
 * 发布MQTT消息
 */
export async function publishMqttMessage(topic: string, message: string): Promise<PluginResponse> {
  return executeCommand('mqtt', {
    command: 'publish',
    parameters: {
      topic,
      message
    }
  });
}