import { AxiosInstance } from 'axios';
import { BaseModule } from '../core/base-module';

/**
 * 工作流定义接口
 */
export interface WorkflowDefinition {
  id: string;
  name: string;
  description?: string;
  version: number;
  tasks: WorkflowTask[];
  triggers: WorkflowTrigger[];
  variables?: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  status: 'ACTIVE' | 'DRAFT' | 'DEPRECATED';
}

/**
 * 工作流任务接口
 */
export interface WorkflowTask {
  id: string;
  name: string;
  type: string;
  config: Record<string, any>;
  dependsOn?: string[];
  retryPolicy?: {
    maxRetries: number;
    retryInterval: number;
  };
  timeout?: number;
}

/**
 * 工作流触发器接口
 */
export interface WorkflowTrigger {
  id: string;
  type: string;
  config: Record<string, any>;
}

/**
 * 工作流实例接口
 */
export interface WorkflowInstance {
  id: string;
  workflowId: string;
  status: 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELED';
  startTime: string;
  endTime?: string;
  variables: Record<string, any>;
  taskInstances: WorkflowTaskInstance[];
  triggerId?: string;
  triggerType?: string;
  triggerData?: Record<string, any>;
}

/**
 * 工作流任务实例接口
 */
export interface WorkflowTaskInstance {
  id: string;
  taskId: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'SKIPPED' | 'CANCELED';
  startTime?: string;
  endTime?: string;
  output?: any;
  error?: string;
  retries: number;
}

/**
 * 工作流创建参数
 */
export interface CreateWorkflowParams {
  name: string;
  description?: string;
  tasks: Omit<WorkflowTask, 'id'>[];
  triggers: Omit<WorkflowTrigger, 'id'>[];
  variables?: Record<string, any>;
  metadata?: Record<string, any>;
}

/**
 * 工作流执行参数
 */
export interface ExecuteWorkflowParams {
  variables?: Record<string, any>;
  triggerData?: Record<string, any>;
}

/**
 * 流程管理模块
 * 处理工作流的定义和执行
 */
export class WorkflowModule extends BaseModule {
  /**
   * 创建流程管理模块实例
   * @param httpClient Axios实例
   */
  constructor(httpClient: AxiosInstance) {
    super(httpClient, '/api/workflows');
  }

  /**
   * 获取所有工作流定义
   * @returns 工作流定义列表
   */
  public async getWorkflows(): Promise<WorkflowDefinition[]> {
    return this.get<WorkflowDefinition[]>('');
  }

  /**
   * 获取工作流定义详情
   * @param workflowId 工作流ID
   * @returns 工作流定义
   */
  public async getWorkflow(workflowId: string): Promise<WorkflowDefinition> {
    return this.get<WorkflowDefinition>(`/${workflowId}`);
  }

  /**
   * 创建工作流
   * @param params 创建参数
   * @returns 创建的工作流定义
   */
  public async createWorkflow(params: CreateWorkflowParams): Promise<WorkflowDefinition> {
    return this.post<WorkflowDefinition>('', params);
  }

  /**
   * 更新工作流
   * @param workflowId 工作流ID
   * @param params 更新参数
   * @returns 更新后的工作流定义
   */
  public async updateWorkflow(
    workflowId: string,
    params: Partial<CreateWorkflowParams>
  ): Promise<WorkflowDefinition> {
    return this.put<WorkflowDefinition>(`/${workflowId}`, params);
  }

  /**
   * 删除工作流
   * @param workflowId 工作流ID
   * @returns 操作结果
   */
  public async deleteWorkflow(workflowId: string): Promise<void> {
    await this.delete(`/${workflowId}`);
  }

  /**
   * 激活工作流
   * @param workflowId 工作流ID
   * @returns 更新后的工作流定义
   */
  public async activateWorkflow(workflowId: string): Promise<WorkflowDefinition> {
    return this.post<WorkflowDefinition>(`/${workflowId}/activate`);
  }

  /**
   * 停用工作流
   * @param workflowId 工作流ID
   * @returns 更新后的工作流定义
   */
  public async deactivateWorkflow(workflowId: string): Promise<WorkflowDefinition> {
    return this.post<WorkflowDefinition>(`/${workflowId}/deactivate`);
  }

  /**
   * 执行工作流
   * @param workflowId 工作流ID
   * @param params 执行参数
   * @returns 工作流实例
   */
  public async executeWorkflow(workflowId: string, params: ExecuteWorkflowParams = {}): Promise<WorkflowInstance> {
    return this.post<WorkflowInstance>(`/${workflowId}/execute`, params);
  }

  /**
   * 获取工作流实例
   * @param instanceId 实例ID
   * @returns 工作流实例
   */
  public async getWorkflowInstance(instanceId: string): Promise<WorkflowInstance> {
    return this.get<WorkflowInstance>(`/instances/${instanceId}`);
  }

  /**
   * 获取工作流的所有实例
   * @param workflowId 工作流ID
   * @returns 工作流实例列表
   */
  public async getWorkflowInstances(workflowId: string): Promise<WorkflowInstance[]> {
    return this.get<WorkflowInstance[]>(`/${workflowId}/instances`);
  }

  /**
   * 取消工作流实例
   * @param instanceId 实例ID
   * @returns 更新后的工作流实例
   */
  public async cancelWorkflowInstance(instanceId: string): Promise<WorkflowInstance> {
    return this.post<WorkflowInstance>(`/instances/${instanceId}/cancel`);
  }

  /**
   * 重试工作流实例
   * @param instanceId 实例ID
   * @returns 新的工作流实例
   */
  public async retryWorkflowInstance(instanceId: string): Promise<WorkflowInstance> {
    return this.post<WorkflowInstance>(`/instances/${instanceId}/retry`);
  }

  /**
   * 获取工作流任务实例详情
   * @param instanceId 工作流实例ID
   * @param taskInstanceId 任务实例ID
   * @returns 任务实例
   */
  public async getTaskInstance(instanceId: string, taskInstanceId: string): Promise<WorkflowTaskInstance> {
    return this.get<WorkflowTaskInstance>(`/instances/${instanceId}/tasks/${taskInstanceId}`);
  }

  /**
   * 重试工作流任务实例
   * @param instanceId 工作流实例ID
   * @param taskInstanceId 任务实例ID
   * @returns 更新后的任务实例
   */
  public async retryTaskInstance(instanceId: string, taskInstanceId: string): Promise<WorkflowTaskInstance> {
    return this.post<WorkflowTaskInstance>(`/instances/${instanceId}/tasks/${taskInstanceId}/retry`);
  }

  /**
   * 跳过工作流任务实例
   * @param instanceId 工作流实例ID
   * @param taskInstanceId 任务实例ID
   * @returns 更新后的任务实例
   */
  public async skipTaskInstance(instanceId: string, taskInstanceId: string): Promise<WorkflowTaskInstance> {
    return this.post<WorkflowTaskInstance>(`/instances/${instanceId}/tasks/${taskInstanceId}/skip`);
  }
}