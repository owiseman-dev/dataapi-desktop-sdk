import { AxiosInstance } from 'axios';
import { BaseModule } from '../core/base-module';

/**
 * 插件信息接口
 */
export interface PluginInfo {
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  homepage?: string;
  repository?: string;
  license?: string;
  main: string;
  enabled: boolean;
  dependencies?: Record<string, string>;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

/**
 * 插件安装参数
 */
export interface InstallPluginParams {
  /** 插件包URL或本地路径 */
  source: string;
  /** 是否自动启用 */
  autoEnable?: boolean;
}

/**
 * 插件配置接口
 */
export interface PluginConfig {
  id: string;
  pluginId: string;
  config: Record<string, any>;
  updatedAt: string;
}

/**
 * 插件事件接口
 */
export interface PluginEvent {
  id: string;
  pluginId: string;
  type: string;
  payload: Record<string, any>;
  timestamp: string;
}

/**
 * 插件管理模块
 * 管理和使用扩展功能的插件
 */
export class PluginModule extends BaseModule {
  /**
   * 创建插件管理模块实例
   * @param httpClient Axios实例
   */
  constructor(httpClient: AxiosInstance) {
    super(httpClient, '/api/plugins');
  }

  /**
   * 获取所有插件
   * @returns 插件列表
   */
  public async getAllPlugins(): Promise<PluginInfo[]> {
    return this.get<PluginInfo[]>('');
  }

  /**
   * 获取已启用的插件
   * @returns 已启用的插件列表
   */
  public async getEnabledPlugins(): Promise<PluginInfo[]> {
    return this.get<PluginInfo[]>('/enabled');
  }

  /**
   * 获取插件详情
   * @param pluginId 插件ID
   * @returns 插件信息
   */
  public async getPlugin(pluginId: string): Promise<PluginInfo> {
    return this.get<PluginInfo>(`/${pluginId}`);
  }

  /**
   * 安装插件
   * @param params 安装参数
   * @returns 安装的插件信息
   */
  public async installPlugin(params: InstallPluginParams): Promise<PluginInfo> {
    return this.post<PluginInfo>('/install', params);
  }

  /**
   * 卸载插件
   * @param pluginId 插件ID
   * @returns 操作结果
   */
  public async uninstallPlugin(pluginId: string): Promise<void> {
    await this.post(`/${pluginId}/uninstall`);
  }

  /**
   * 启用插件
   * @param pluginId 插件ID
   * @returns 更新后的插件信息
   */
  public async enablePlugin(pluginId: string): Promise<PluginInfo> {
    return this.post<PluginInfo>(`/${pluginId}/enable`);
  }

  /**
   * 禁用插件
   * @param pluginId 插件ID
   * @returns 更新后的插件信息
   */
  public async disablePlugin(pluginId: string): Promise<PluginInfo> {
    return this.post<PluginInfo>(`/${pluginId}/disable`);
  }

  /**
   * 更新插件
   * @param pluginId 插件ID
   * @param source 更新源
   * @returns 更新后的插件信息
   */
  public async updatePlugin(pluginId: string, source: string): Promise<PluginInfo> {
    return this.post<PluginInfo>(`/${pluginId}/update`, { source });
  }

  /**
   * 获取插件配置
   * @param pluginId 插件ID
   * @returns 插件配置
   */
  public async getPluginConfig(pluginId: string): Promise<PluginConfig> {
    return this.get<PluginConfig>(`/${pluginId}/config`);
  }

  /**
   * 更新插件配置
   * @param pluginId 插件ID
   * @param config 配置对象
   * @returns 更新后的插件配置
   */
  public async updatePluginConfig(pluginId: string, config: Record<string, any>): Promise<PluginConfig> {
    return this.put<PluginConfig>(`/${pluginId}/config`, { config });
  }

  /**
   * 调用插件方法
   * @param pluginId 插件ID
   * @param method 方法名
   * @param params 方法参数
   * @returns 方法返回值
   */
  public async invokePluginMethod<T = any>(pluginId: string, method: string, params?: any): Promise<T> {
    return this.post<T>(`/${pluginId}/invoke`, { method, params });
  }

  /**
   * 发送事件到插件
   * @param pluginId 插件ID
   * @param eventType 事件类型
   * @param payload 事件数据
   * @returns 事件信息
   */
  public async sendPluginEvent(pluginId: string, eventType: string, payload: Record<string, any>): Promise<PluginEvent> {
    return this.post<PluginEvent>(`/${pluginId}/events`, { type: eventType, payload });
  }

  /**
   * 获取插件事件历史
   * @param pluginId 插件ID
   * @param limit 事件数量限制
   * @returns 事件列表
   */
  public async getPluginEvents(pluginId: string, limit = 50): Promise<PluginEvent[]> {
    return this.get<PluginEvent[]>(`/${pluginId}/events`, { params: { limit } });
  }

  /**
   * 检查插件更新
   * @returns 可更新的插件列表
   */
  public async checkUpdates(): Promise<{ pluginId: string; currentVersion: string; latestVersion: string }[]> {
    return this.get('/updates');
  }
}