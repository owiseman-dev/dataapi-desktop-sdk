import { HttpClient } from '../core/http';
/**
 * 获取所有已安装的插件
 * @returns 插件列表
 */
export async function getPlugins() {
    try {
        return await HttpClient.authRequest('/api/plugins');
    }
    catch (error) {
        console.error('获取插件列表失败:', error);
        return [];
    }
}
/**
 * 获取插件详情
 * @param pluginId 插件ID
 * @returns 插件详情
 */
export async function getPluginInfo(pluginId) {
    try {
        return await HttpClient.authRequest(`/api/plugins/${pluginId}`);
    }
    catch (error) {
        console.error(`获取插件 ${pluginId} 详情失败:`, error);
        return null;
    }
}
/**
 * 安装插件
 * @param pluginUrl 插件包URL或本地路径
 * @param options 安装选项
 * @returns 安装结果
 */
export async function installPlugin(pluginUrl, options = {}) {
    try {
        return await HttpClient.authRequest('/api/plugins/install', {
            method: 'POST',
            body: {
                url: pluginUrl,
                autoEnable: options.autoEnable !== false
            }
        });
    }
    catch (error) {
        console.error('安装插件失败:', error);
        return null;
    }
}
/**
 * 卸载插件
 * @param pluginId 插件ID
 * @returns 是否成功
 */
export async function uninstallPlugin(pluginId) {
    try {
        await HttpClient.authRequest(`/api/plugins/${pluginId}/uninstall`, {
            method: 'DELETE'
        });
        return true;
    }
    catch (error) {
        console.error(`卸载插件 ${pluginId} 失败:`, error);
        return false;
    }
}
/**
 * 启用插件
 * @param pluginId 插件ID
 * @returns 是否成功
 */
export async function enablePlugin(pluginId) {
    try {
        await HttpClient.authRequest(`/api/plugins/${pluginId}/enable`, {
            method: 'POST'
        });
        return true;
    }
    catch (error) {
        console.error(`启用插件 ${pluginId} 失败:`, error);
        return false;
    }
}
/**
 * 禁用插件
 * @param pluginId 插件ID
 * @returns 是否成功
 */
export async function disablePlugin(pluginId) {
    try {
        await HttpClient.authRequest(`/api/plugins/${pluginId}/disable`, {
            method: 'POST'
        });
        return true;
    }
    catch (error) {
        console.error(`禁用插件 ${pluginId} 失败:`, error);
        return false;
    }
}
/**
 * 执行插件方法
 * @param pluginId 插件ID
 * @param method 方法名
 * @param params 参数
 * @returns 执行结果
 */
export async function executePluginMethod(pluginId, method, params = {}) {
    try {
        return await HttpClient.authRequest(`/api/plugins/${pluginId}/execute`, {
            method: 'POST',
            body: {
                method,
                params
            }
        });
    }
    catch (error) {
        console.error(`执行插件 ${pluginId} 方法 ${method} 失败:`, error);
        return null;
    }
}
