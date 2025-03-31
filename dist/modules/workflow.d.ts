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
export declare class WorkflowModule extends BaseModule {
    /**
     * 创建流程管理模块实例
     * @param httpClient Axios实例
     */
    constructor(httpClient: AxiosInstance);
    /**
     * 获取所有工作流定义
     * @returns 工作流定义列表
     */
    getWorkflows(): Promise<WorkflowDefinition[]>;
    /**
     * 获取工作流定义详情
     * @param workflowId 工作流ID
     * @returns 工作流定义
     */
    getWorkflow(workflowId: string): Promise<WorkflowDefinition>;
    /**
     * 创建工作流
     * @param params 创建参数
     * @returns 创建的工作流定义
     */
    createWorkflow(params: CreateWorkflowParams): Promise<WorkflowDefinition>;
    /**
     * 更新工作流
     * @param workflowId 工作流ID
     * @param params 更新参数
     * @returns 更新后的工作流定义
     */
    updateWorkflow(workflowId: string, params: Partial<CreateWorkflowParams>): Promise<WorkflowDefinition>;
    /**
     * 删除工作流
     * @param workflowId 工作流ID
     * @returns 操作结果
     */
    deleteWorkflow(workflowId: string): Promise<void>;
    /**
     * 激活工作流
     * @param workflowId 工作流ID
     * @returns 更新后的工作流定义
     */
    activateWorkflow(workflowId: string): Promise<WorkflowDefinition>;
    /**
     * 停用工作流
     * @param workflowId 工作流ID
     * @returns 更新后的工作流定义
     */
    deactivateWorkflow(workflowId: string): Promise<WorkflowDefinition>;
    /**
     * 执行工作流
     * @param workflowId 工作流ID
     * @param params 执行参数
     * @returns 工作流实例
     */
    executeWorkflow(workflowId: string, params?: ExecuteWorkflowParams): Promise<WorkflowInstance>;
    /**
     * 获取工作流实例
     * @param instanceId 实例ID
     * @returns 工作流实例
     */
    getWorkflowInstance(instanceId: string): Promise<WorkflowInstance>;
    /**
     * 获取工作流的所有实例
     * @param workflowId 工作流ID
     * @returns 工作流实例列表
     */
    getWorkflowInstances(workflowId: string): Promise<WorkflowInstance[]>;
    /**
     * 取消工作流实例
     * @param instanceId 实例ID
     * @returns 更新后的工作流实例
     */
    cancelWorkflowInstance(instanceId: string): Promise<WorkflowInstance>;
    /**
     * 重试工作流实例
     * @param instanceId 实例ID
     * @returns 新的工作流实例
     */
    retryWorkflowInstance(instanceId: string): Promise<WorkflowInstance>;
    /**
     * 获取工作流任务实例详情
     * @param instanceId 工作流实例ID
     * @param taskInstanceId 任务实例ID
     * @returns 任务实例
     */
    getTaskInstance(instanceId: string, taskInstanceId: string): Promise<WorkflowTaskInstance>;
    /**
     * 重试工作流任务实例
     * @param instanceId 工作流实例ID
     * @param taskInstanceId 任务实例ID
     * @returns 更新后的任务实例
     */
    retryTaskInstance(instanceId: string, taskInstanceId: string): Promise<WorkflowTaskInstance>;
    /**
     * 跳过工作流任务实例
     * @param instanceId 工作流实例ID
     * @param taskInstanceId 任务实例ID
     * @returns 更新后的任务实例
     */
    skipTaskInstance(instanceId: string, taskInstanceId: string): Promise<WorkflowTaskInstance>;
}
