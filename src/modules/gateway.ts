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
export class GatewayModule extends BaseModule {
  /**
   * 创建网关管理模块实例
   * @param httpClient Axios实例
   */
  constructor(httpClient: AxiosInstance) {
    super(httpClient, '/api/gateway');
  }

  /**
   * 获取网关状态
   * @returns 网关状态信息
   */
  public async getStatus(): Promise<GatewayStatus> {
    return this.get<GatewayStatus>('/status');
  }

  /**
   * 获取所有路由
   * @returns 路由列表
   */
  public async getRoutes(): Promise<GatewayRoute[]> {
    return this.get<GatewayRoute[]>('/routes');
  }

  /**
   * 获取路由详情
   * @param routeId 路由ID
   * @returns 路由信息
   */
  public async getRoute(routeId: string): Promise<GatewayRoute> {
    return this.get<GatewayRoute>(`/routes/${routeId}`);
  }

  /**
   * 创建路由
   * @param params 路由创建参数
   * @returns 创建的路由信息
   */
  public async createRoute(params: CreateRouteParams): Promise<GatewayRoute> {
    return this.post<GatewayRoute>('/routes', params);
  }

  /**
   * 更新路由
   * @param routeId 路由ID
   * @param params 路由更新参数
   * @returns 更新后的路由信息
   */
  public async updateRoute(routeId: string, params: Partial<CreateRouteParams>): Promise<GatewayRoute> {
    return this.put<GatewayRoute>(`/routes/${routeId}`, params);
  }

  /**
   * 删除路由
   * @param routeId 路由ID
   * @returns 操作结果
   */
  public async deleteRoute(routeId: string): Promise<void> {
    await this.delete(`/routes/${routeId}`);
  }

  /**
   * 启用路由
   * @param routeId 路由ID
   * @returns 更新后的路由信息
   */
  public async enableRoute(routeId: string): Promise<GatewayRoute> {
    return this.post<GatewayRoute>(`/routes/${routeId}/enable`);
  }

  /**
   * 禁用路由
   * @param routeId 路由ID
   * @returns 更新后的路由信息
   */
  public async disableRoute(routeId: string): Promise<GatewayRoute> {
    return this.post<GatewayRoute>(`/routes/${routeId}/disable`);
  }

  /**
   * 获取所有服务
   * @returns 服务列表
   */
  public async getServices(): Promise<GatewayService[]> {
    return this.get<GatewayService[]>('/services');
  }

  /**
   * 获取服务详情
   * @param serviceId 服务ID
   * @returns 服务信息
   */
  public async getService(serviceId: string): Promise<GatewayService> {
    return this.get<GatewayService>(`/services/${serviceId}`);
  }

  /**
   * 创建服务
   * @param params 服务创建参数
   * @returns 创建的服务信息
   */
  public async createService(params: CreateServiceParams): Promise<GatewayService> {
    return this.post<GatewayService>('/services', params);
  }

  /**
   * 更新服务
   * @param serviceId 服务ID
   * @param params 服务更新参数
   * @returns 更新后的服务信息
   */
  public async updateService(serviceId: string, params: Partial<CreateServiceParams>): Promise<GatewayService> {
    return this.put<GatewayService>(`/services/${serviceId}`, params);
  }

  /**
   * 删除服务
   * @param serviceId 服务ID
   * @returns 操作结果
   */
  public async deleteService(serviceId: string): Promise<void> {
    await this.delete(`/services/${serviceId}`);
  }

  /**
   * 刷新网关配置
   * @returns 操作结果
   */
  public async refreshConfig(): Promise<void> {
    await this.post('/refresh');
  }

  /**
   * 获取网关日志
   * @param limit 日志条数限制
   * @returns 日志列表
   */
  public async getLogs(limit = 100): Promise<{ timestamp: string; level: string; message: string }[]> {
    return this.get('/logs', { params: { limit } });
  }
}