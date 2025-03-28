/**
 * SDK配置接口
 */
export interface SdkConfig {
  /**
   * API服务器地址
   */
  apiUrl: string;
  
  /**
   * 请求超时时间（毫秒）
   */
  timeout: number;
  
  /**
   * 是否启用调试模式
   */
  debug: boolean;
  
  /**
   * 是否自动刷新令牌
   */
  autoRefreshToken: boolean;
  
  /**
   * 本地存储前缀
   */
  storagePrefix: string;
  
  /**
   * API特定配置
   */
  api?: {
    /**
     * 请求重试次数
     */
    retries?: number;
    
    /**
     * 请求重试延迟（毫秒）
     */
    retryDelay?: number;
    
    /**
     * 默认请求头
     */
    headers?: Record<string, string>;
  };
  
  /**
   * 插件配置
   */
  plugins?: Record<string, any>;
}

/**
 * 默认SDK配置
 */
const defaultConfig: SdkConfig = {
  apiUrl: 'http://localhost:8080',
  timeout: 30000,
  debug: false,
  autoRefreshToken: true,
  storagePrefix: 'dataapi_',
  api: {
    retries: 3,
    retryDelay: 1000,
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

// 当前配置实例
let currentConfig: SdkConfig = { ...defaultConfig };

/**
 * 初始化SDK配置
 * @param config 用户提供的配置
 */
export function initConfig(config: Partial<SdkConfig> = {}): void {
  // 深度合并配置
  currentConfig = deepMerge(defaultConfig, config);
  
  if (currentConfig.debug) {
    console.log('SDK配置已初始化:', currentConfig);
  }
}

/**
 * 获取当前SDK配置
 * @returns 当前配置
 */
export function getConfig(): SdkConfig {
  return { ...currentConfig };
}

/**
 * 更新SDK配置
 * @param config 要更新的配置
 */
export function updateConfig(config: Partial<SdkConfig>): void {
  currentConfig = deepMerge(currentConfig, config);
  
  if (currentConfig.debug) {
    console.log('SDK配置已更新:', currentConfig);
  }
}

/**
 * 重置SDK配置为默认值
 */
export function resetConfig(): void {
  currentConfig = { ...defaultConfig };
  
  if (currentConfig.debug) {
    console.log('SDK配置已重置为默认值');
  }
}

/**
 * 深度合并对象
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的对象
 */
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          // 添加类型断言
          output[key as keyof T] = deepMerge(
            target[key as keyof T] as any, 
            source[key as keyof T] as any
          ) as any;
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
}

/**
 * 检查值是否为对象
 * @param item 要检查的值
 * @returns 是否为对象
 */
function isObject(item: any): boolean {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * 获取带前缀的存储键
 * @param key 原始键
 * @returns 带前缀的键
 */
export function getStorageKey(key: string): string {
  return `${currentConfig.storagePrefix}${key}`;
}

/**
 * 验证配置是否有效
 * @param config 要验证的配置
 * @returns 验证结果，如果有错误则返回错误信息
 */
export function validateConfig(config: Partial<SdkConfig>): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  
  // 验证API URL
  if (config.apiUrl && !isValidUrl(config.apiUrl)) {
    errors.push(`无效的API URL: ${config.apiUrl}`);
  }
  
  // 验证超时时间
  if (config.timeout !== undefined && (typeof config.timeout !== 'number' || config.timeout <= 0)) {
    errors.push(`超时时间必须是正数: ${config.timeout}`);
  }
  
  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}

/**
 * 检查URL是否有效
 * @param url 要检查的URL
 * @returns 是否有效
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}