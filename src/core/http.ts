import { invoke } from '@tauri-apps/api/tauri';
import { getConfig } from './config';  // 从当前目录导入
import { buildApiUrl, createAuthHeaders, handleApiResponse } from '../api/config';

/**
 * HTTP 请求选项
 */
export interface HttpRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retry?: number;
}

/**
 * HTTP 客户端类
 */
export class HttpClient {
  /**
   * 发送 HTTP 请求
   * @param path API 路径
   * @param options 请求选项
   * @returns 响应数据
   */
  static async request<T = any>(path: string, options: HttpRequestOptions = {}): Promise<T> {
    const config = getConfig();
    const url = buildApiUrl(path);
    const method = options.method || 'GET';
    const headers = options.headers || {};
    const timeout = options.timeout || config.timeout;
    const retry = options.retry !== undefined ? options.retry : config.api?.retries || 0;
    
    let body: string | undefined;
    if (options.body) {
      body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
      if (!headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
      }
    }
    
    try {
      const response = await invoke('plugin:http|fetch', {
        url,
        method,
        headers,
        body,
        timeout
      });
      
      return await handleApiResponse(response);
    } catch (error) {
      if (retry > 0) {
        // 根据调试模式决定是否输出重试日志
        if (config.debug) {
          console.log(`请求失败，重试中 (${retry})...`, error);
        }
        return HttpClient.request(path, { ...options, retry: retry - 1 });
      }
      
      throw error;
    }
  }
  
  /**
   * 发送 GET 请求
   * @param path API 路径
   * @param options 请求选项
   * @returns 响应数据
   */
  static async get<T = any>(path: string, options: Omit<HttpRequestOptions, 'method'> = {}): Promise<T> {
    return HttpClient.request<T>(path, { ...options, method: 'GET' });
  }
  
  /**
   * 发送 POST 请求
   * @param path API 路径
   * @param body 请求体
   * @param options 请求选项
   * @returns 响应数据
   */
  static async post<T = any>(path: string, body?: any, options: Omit<HttpRequestOptions, 'method' | 'body'> = {}): Promise<T> {
    return HttpClient.request<T>(path, { ...options, method: 'POST', body });
  }
  
  /**
   * 发送 PUT 请求
   * @param path API 路径
   * @param body 请求体
   * @param options 请求选项
   * @returns 响应数据
   */
  static async put<T = any>(path: string, body?: any, options: Omit<HttpRequestOptions, 'method' | 'body'> = {}): Promise<T> {
    return HttpClient.request<T>(path, { ...options, method: 'PUT', body });
  }
  
  /**
   * 发送 DELETE 请求
   * @param path API 路径
   * @param options 请求选项
   * @returns 响应数据
   */
  static async delete<T = any>(path: string, options: Omit<HttpRequestOptions, 'method'> = {}): Promise<T> {
    return HttpClient.request<T>(path, { ...options, method: 'DELETE' });
  }
  
  /**
   * 发送带认证的请求
   * @param path API 路径
   * @param options 请求选项
   * @returns 响应数据
   */
  static async authRequest<T = any>(path: string, options: HttpRequestOptions = {}): Promise<T> {
    const headers = createAuthHeaders(options.headers || {});
    return HttpClient.request<T>(path, { ...options, headers });
  }
}