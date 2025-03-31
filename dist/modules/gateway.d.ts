import { AxiosInstance } from 'axios';
import { BaseModule } from '../core/base-module';
/**
 * 网关路由信息
 */
export interface GatewayRoute {
    id: string;
    path: string;
    serviceId: string;
    url?: string;
    stripPrefix?: boolean;
    retryable?: boolean;
    enabled: boolean;
    metadata?: Record<string, any>;
    predicates?: string[];
    filters?: string[];
    order?: number;
    createdAt: string;
    updatedAt: string;
}
/**
 * 网关服务信息
 */
export interface GatewayService {
    id: string;
    name: string;
    description?: string;
    url: string;
    status: 'UP' | 'DOWN' | 'UNKNOWN';
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}
/**
 * 网关状态信息
 */
export interface GatewayStatus {
    status: 'UP' | 'DOWN' | 'DEGRADED';
    uptime: number;
    startTime: string;
    version: string;
    routes: number;
    services: number;
    memory: {
        free: number;
        total: number;
        max: number;
        heapUsed: number;
    };
}
/**
 * 网关路由创建参数
 */
export interface CreateRouteParams {
    path: string;
    serviceId: string;
    url?: string;
    stripPrefix?: boolean;
    retryable?: boolean;
    predicates?: string[];
    filters?: string[];
    metadata?: Record<string, any>;
    order?: number;
}
/**
 * 网关服务创建参数
 */
export interface CreateServiceParams {
    name: string;
    url: string;
    description?: string;
    metadata?: Record<string, any>;
}
/**
 * 网关管理模块
 * 处理API网关的配置和访问
 */
export declare class GatewayModule extends BaseModule {
    /**
     * 创建网关管理模块实例
     * @param httpClient Axios实例
     */
    constructor(httpClient: AxiosInstance);
    /**
     * 获取网关状态
     * @returns 网关状态信息
     */
    getStatus(): Promise<GatewayStatus>;
    /**
     * 获取所有路由
     * @returns 路由列表
     */
    getRoutes(): Promise<GatewayRoute[]>;
    /**
     * 获取路由详情
     * @param routeId 路由ID
     * @returns 路由信息
     */
    getRoute(routeId: string): Promise<GatewayRoute>;
    /**
     * 创建路由
     * @param params 路由创建参数
     * @returns 创建的路由信息
     */
    createRoute(params: CreateRouteParams): Promise<GatewayRoute>;
    /**
     * 更新路由
     * @param routeId 路由ID
     * @param params 路由更新参数
     * @returns 更新后的路由信息
     */
    updateRoute(routeId: string, params: Partial<CreateRouteParams>): Promise<GatewayRoute>;
    /**
     * 删除路由
     * @param routeId 路由ID
     * @returns 操作结果
     */
    deleteRoute(routeId: string): Promise<void>;
    /**
     * 启用路由
     * @param routeId 路由ID
     * @returns 更新后的路由信息
     */
    enableRoute(routeId: string): Promise<GatewayRoute>;
    /**
     * 禁用路由
     * @param routeId 路由ID
     * @returns 更新后的路由信息
     */
    disableRoute(routeId: string): Promise<GatewayRoute>;
    /**
     * 获取所有服务
     * @returns 服务列表
     */
    getServices(): Promise<GatewayService[]>;
    /**
     * 获取服务详情
     * @param serviceId 服务ID
     * @returns 服务信息
     */
    getService(serviceId: string): Promise<GatewayService>;
    /**
     * 创建服务
     * @param params 服务创建参数
     * @returns 创建的服务信息
     */
    createService(params: CreateServiceParams): Promise<GatewayService>;
    /**
     * 更新服务
     * @param serviceId 服务ID
     * @param params 服务更新参数
     * @returns 更新后的服务信息
     */
    updateService(serviceId: string, params: Partial<CreateServiceParams>): Promise<GatewayService>;
    /**
     * 删除服务
     * @param serviceId 服务ID
     * @returns 操作结果
     */
    deleteService(serviceId: string): Promise<void>;
    /**
     * 刷新网关配置
     * @returns 操作结果
     */
    refreshConfig(): Promise<void>;
    /**
     * 获取网关日志
     * @param limit 日志条数限制
     * @returns 日志列表
     */
    getLogs(limit?: number): Promise<{
        timestamp: string;
        level: string;
        message: string;
    }[]>;
}
