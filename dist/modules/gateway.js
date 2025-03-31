"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayModule = void 0;
const base_module_1 = require("../core/base-module");
/**
 * 网关管理模块
 * 处理API网关的配置和访问
 */
class GatewayModule extends base_module_1.BaseModule {
    /**
     * 创建网关管理模块实例
     * @param httpClient Axios实例
     */
    constructor(httpClient) {
        super(httpClient, '/api/gateway');
    }
    /**
     * 获取网关状态
     * @returns 网关状态信息
     */
    async getStatus() {
        return this.get('/status');
    }
    /**
     * 获取所有路由
     * @returns 路由列表
     */
    async getRoutes() {
        return this.get('/routes');
    }
    /**
     * 获取路由详情
     * @param routeId 路由ID
     * @returns 路由信息
     */
    async getRoute(routeId) {
        return this.get(`/routes/${routeId}`);
    }
    /**
     * 创建路由
     * @param params 路由创建参数
     * @returns 创建的路由信息
     */
    async createRoute(params) {
        return this.post('/routes', params);
    }
    /**
     * 更新路由
     * @param routeId 路由ID
     * @param params 路由更新参数
     * @returns 更新后的路由信息
     */
    async updateRoute(routeId, params) {
        return this.put(`/routes/${routeId}`, params);
    }
    /**
     * 删除路由
     * @param routeId 路由ID
     * @returns 操作结果
     */
    async deleteRoute(routeId) {
        await this.delete(`/routes/${routeId}`);
    }
    /**
     * 启用路由
     * @param routeId 路由ID
     * @returns 更新后的路由信息
     */
    async enableRoute(routeId) {
        return this.post(`/routes/${routeId}/enable`);
    }
    /**
     * 禁用路由
     * @param routeId 路由ID
     * @returns 更新后的路由信息
     */
    async disableRoute(routeId) {
        return this.post(`/routes/${routeId}/disable`);
    }
    /**
     * 获取所有服务
     * @returns 服务列表
     */
    async getServices() {
        return this.get('/services');
    }
    /**
     * 获取服务详情
     * @param serviceId 服务ID
     * @returns 服务信息
     */
    async getService(serviceId) {
        return this.get(`/services/${serviceId}`);
    }
    /**
     * 创建服务
     * @param params 服务创建参数
     * @returns 创建的服务信息
     */
    async createService(params) {
        return this.post('/services', params);
    }
    /**
     * 更新服务
     * @param serviceId 服务ID
     * @param params 服务更新参数
     * @returns 更新后的服务信息
     */
    async updateService(serviceId, params) {
        return this.put(`/services/${serviceId}`, params);
    }
    /**
     * 删除服务
     * @param serviceId 服务ID
     * @returns 操作结果
     */
    async deleteService(serviceId) {
        await this.delete(`/services/${serviceId}`);
    }
    /**
     * 刷新网关配置
     * @returns 操作结果
     */
    async refreshConfig() {
        await this.post('/refresh');
    }
    /**
     * 获取网关日志
     * @param limit 日志条数限制
     * @returns 日志列表
     */
    async getLogs(limit = 100) {
        return this.get('/logs', { params: { limit } });
    }
}
exports.GatewayModule = GatewayModule;
//# sourceMappingURL=gateway.js.map