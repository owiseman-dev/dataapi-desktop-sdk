import { getConfig } from '../core/config';

/**
 * API 配置接口
 */
export interface ApiConfig {
  /**
   * API 基础URL
   */
  apiUrl: string;  // 改为 apiUrl
  
  /**
   * 请求超时时间（毫秒）
   */
  timeout: number;
  
  /**
   * 默认请求头
   */
  headers: Record<string, string>;
  
  /**
   * 是否自动刷新令牌
   */
  autoRefreshToken: boolean;
}

/**
 * 获取API配置
 * 合并全局配置和API特定配置
 */
export function getApiConfig(): ApiConfig {
  const globalConfig = getConfig();
  
  // 默认API配置
  const defaultApiConfig: ApiConfig = {
    apiUrl: globalConfig.apiUrl || 'http://localhost:8080',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json'
    },
    autoRefreshToken: true
  };
  
  // 合并全局配置中的API配置（如果存在）
  return {
    ...defaultApiConfig,
    ...(globalConfig.api || {})
  };
}

/**
 * 创建带有认证信息的请求头
 * @param additionalHeaders 额外的请求头
 * @returns 包含认证信息的请求头
 */
export function createAuthHeaders(additionalHeaders: Record<string, string> = {}): Record<string, string> {
  const token = localStorage.getItem('access_token');
  const headers = { ...getApiConfig().headers, ...additionalHeaders };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

/**
 * 构建完整的API URL
 * @param path API路径
 * @returns 完整的API URL
 */
export function buildApiUrl(path: string): string {
  const config = getApiConfig();
  const apiUrl = config.apiUrl.endsWith('/') ? config.apiUrl.slice(0, -1) : config.apiUrl;
  const apiPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${apiUrl}${apiPath}`;
}

/**
 * 处理API响应
 * @param response API响应
 * @returns 处理后的响应数据
 */
export async function handleApiResponse(response: any): Promise<any> {
  // 如果响应包含data字段，则返回data
  if (response && response.data !== undefined) {
    return response.data;
  }
  
  // 否则返回整个响应
  return response;
}