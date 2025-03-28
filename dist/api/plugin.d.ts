/**
 * 插件信息接口
 */
export interface PluginInfo {
    id: string;
    name: string;
    version: string;
    description?: string;
    author?: string;
    enabled: boolean;
}
/**
 * 插件安装选项
 */
export interface PluginInstallOptions {
    /**
     * 是否自动启用插件
     */
    autoEnable?: boolean;
}
/**
 * 获取所有已安装的插件
 * @returns 插件列表
 */
export declare function getPlugins(): Promise<PluginInfo[]>;
/**
 * 获取插件详情
 * @param pluginId 插件ID
 * @returns 插件详情
 */
export declare function getPluginInfo(pluginId: string): Promise<PluginInfo | null>;
/**
 * 安装插件
 * @param pluginUrl 插件包URL或本地路径
 * @param options 安装选项
 * @returns 安装结果
 */
export declare function installPlugin(pluginUrl: string, options?: PluginInstallOptions): Promise<PluginInfo | null>;
/**
 * 卸载插件
 * @param pluginId 插件ID
 * @returns 是否成功
 */
export declare function uninstallPlugin(pluginId: string): Promise<boolean>;
/**
 * 启用插件
 * @param pluginId 插件ID
 * @returns 是否成功
 */
export declare function enablePlugin(pluginId: string): Promise<boolean>;
/**
 * 禁用插件
 * @param pluginId 插件ID
 * @returns 是否成功
 */
export declare function disablePlugin(pluginId: string): Promise<boolean>;
/**
 * 执行插件方法
 * @param pluginId 插件ID
 * @param method 方法名
 * @param params 参数
 * @returns 执行结果
 */
export declare function executePluginMethod<T = any>(pluginId: string, method: string, params?: Record<string, any>): Promise<T | null>;
