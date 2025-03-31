"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginModule = void 0;
const base_module_1 = require("../core/base-module");
/**
 * 插件管理模块
 * 管理和使用扩展功能的插件
 */
class PluginModule extends base_module_1.BaseModule {
    /**
     * 创建插件管理模块实例
     * @param httpClient Axios实例
     */
    constructor(httpClient) {
        super(httpClient, '/api/plugins');
    }
    /**
     * 获取所有插件
     * @returns 插件列表
     */
    async getAllPlugins() {
        return this.get('');
    }
    /**
     * 获取已启用的插件
     * @returns 已启用的插件列表
     */
    async getEnabledPlugins() {
        return this.get('/enabled');
    }
    /**
     * 获取插件详情
     * @param pluginId 插件ID
     * @returns 插件信息
     */
    async getPlugin(pluginId) {
        return this.get(`/${pluginId}`);
    }
    /**
     * 安装插件
     * @param params 安装参数
     * @returns 安装的插件信息
     */
    async installPlugin(params) {
        return this.post('/install', params);
    }
    /**
     * 卸载插件
     * @param pluginId 插件ID
     * @returns 操作结果
     */
    async uninstallPlugin(pluginId) {
        await this.post(`/${pluginId}/uninstall`);
    }
    /**
     * 启用插件
     * @param pluginId 插件ID
     * @returns 更新后的插件信息
     */
    async enablePlugin(pluginId) {
        return this.post(`/${pluginId}/enable`);
    }
    /**
     * 禁用插件
     * @param pluginId 插件ID
     * @returns 更新后的插件信息
     */
    async disablePlugin(pluginId) {
        return this.post(`/${pluginId}/disable`);
    }
    /**
     * 更新插件
     * @param pluginId 插件ID
     * @param source 更新源
     * @returns 更新后的插件信息
     */
    async updatePlugin(pluginId, source) {
        return this.post(`/${pluginId}/update`, { source });
    }
    /**
     * 获取插件配置
     * @param pluginId 插件ID
     * @returns 插件配置
     */
    async getPluginConfig(pluginId) {
        return this.get(`/${pluginId}/config`);
    }
    /**
     * 更新插件配置
     * @param pluginId 插件ID
     * @param config 配置对象
     * @returns 更新后的插件配置
     */
    async updatePluginConfig(pluginId, config) {
        return this.put(`/${pluginId}/config`, { config });
    }
    /**
     * 调用插件方法
     * @param pluginId 插件ID
     * @param method 方法名
     * @param params 方法参数
     * @returns 方法返回值
     */
    async invokePluginMethod(pluginId, method, params) {
        return this.post(`/${pluginId}/invoke`, { method, params });
    }
    /**
     * 发送事件到插件
     * @param pluginId 插件ID
     * @param eventType 事件类型
     * @param payload 事件数据
     * @returns 事件信息
     */
    async sendPluginEvent(pluginId, eventType, payload) {
        return this.post(`/${pluginId}/events`, { type: eventType, payload });
    }
    /**
     * 获取插件事件历史
     * @param pluginId 插件ID
     * @param limit 事件数量限制
     * @returns 事件列表
     */
    async getPluginEvents(pluginId, limit = 50) {
        return this.get(`/${pluginId}/events`, { params: { limit } });
    }
    /**
     * 检查插件更新
     * @returns 可更新的插件列表
     */
    async checkUpdates() {
        return this.get('/updates');
    }
}
exports.PluginModule = PluginModule;
//# sourceMappingURL=plugin.js.map