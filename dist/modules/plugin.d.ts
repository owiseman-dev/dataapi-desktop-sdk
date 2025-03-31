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
export declare class PluginModule extends BaseModule {
    /**
     * 创建插件管理模块实例
     * @param httpClient Axios实例
     */
    constructor(httpClient: AxiosInstance);
    /**
     * 获取所有插件
     * @returns 插件列表
     */
    getAllPlugins(): Promise<PluginInfo[]>;
    /**
     * 获取已启用的插件
     * @returns 已启用的插件列表
     */
    getEnabledPlugins(): Promise<PluginInfo[]>;
    /**
     * 获取插件详情
     * @param pluginId 插件ID
     * @returns 插件信息
     */
    getPlugin(pluginId: string): Promise<PluginInfo>;
    /**
     * 安装插件
     * @param params 安装参数
     * @returns 安装的插件信息
     */
    installPlugin(params: InstallPluginParams): Promise<PluginInfo>;
    /**
     * 卸载插件
     * @param pluginId 插件ID
     * @returns 操作结果
     */
    uninstallPlugin(pluginId: string): Promise<void>;
    /**
     * 启用插件
     * @param pluginId 插件ID
     * @returns 更新后的插件信息
     */
    enablePlugin(pluginId: string): Promise<PluginInfo>;
    /**
     * 禁用插件
     * @param pluginId 插件ID
     * @returns 更新后的插件信息
     */
    disablePlugin(pluginId: string): Promise<PluginInfo>;
    /**
     * 更新插件
     * @param pluginId 插件ID
     * @param source 更新源
     * @returns 更新后的插件信息
     */
    updatePlugin(pluginId: string, source: string): Promise<PluginInfo>;
    /**
     * 获取插件配置
     * @param pluginId 插件ID
     * @returns 插件配置
     */
    getPluginConfig(pluginId: string): Promise<PluginConfig>;
    /**
     * 更新插件配置
     * @param pluginId 插件ID
     * @param config 配置对象
     * @returns 更新后的插件配置
     */
    updatePluginConfig(pluginId: string, config: Record<string, any>): Promise<PluginConfig>;
    /**
     * 调用插件方法
     * @param pluginId 插件ID
     * @param method 方法名
     * @param params 方法参数
     * @returns 方法返回值
     */
    invokePluginMethod<T = any>(pluginId: string, method: string, params?: any): Promise<T>;
    /**
     * 发送事件到插件
     * @param pluginId 插件ID
     * @param eventType 事件类型
     * @param payload 事件数据
     * @returns 事件信息
     */
    sendPluginEvent(pluginId: string, eventType: string, payload: Record<string, any>): Promise<PluginEvent>;
    /**
     * 获取插件事件历史
     * @param pluginId 插件ID
     * @param limit 事件数量限制
     * @returns 事件列表
     */
    getPluginEvents(pluginId: string, limit?: number): Promise<PluginEvent[]>;
    /**
     * 检查插件更新
     * @returns 可更新的插件列表
     */
    checkUpdates(): Promise<{
        pluginId: string;
        currentVersion: string;
        latestVersion: string;
    }[]>;
}
