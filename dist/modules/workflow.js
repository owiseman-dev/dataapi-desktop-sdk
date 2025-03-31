"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowModule = void 0;
const base_module_1 = require("../core/base-module");
/**
 * 流程管理模块
 * 处理工作流的定义和执行
 */
class WorkflowModule extends base_module_1.BaseModule {
    /**
     * 创建流程管理模块实例
     * @param httpClient Axios实例
     */
    constructor(httpClient) {
        super(httpClient, '/api/workflows');
    }
    /**
     * 获取所有工作流定义
     * @returns 工作流定义列表
     */
    async getWorkflows() {
        return this.get('');
    }
    /**
     * 获取工作流定义详情
     * @param workflowId 工作流ID
     * @returns 工作流定义
     */
    async getWorkflow(workflowId) {
        return this.get(`/${workflowId}`);
    }
    /**
     * 创建工作流
     * @param params 创建参数
     * @returns 创建的工作流定义
     */
    async createWorkflow(params) {
        return this.post('', params);
    }
    /**
     * 更新工作流
     * @param workflowId 工作流ID
     * @param params 更新参数
     * @returns 更新后的工作流定义
     */
    async updateWorkflow(workflowId, params) {
        return this.put(`/${workflowId}`, params);
    }
    /**
     * 删除工作流
     * @param workflowId 工作流ID
     * @returns 操作结果
     */
    async deleteWorkflow(workflowId) {
        await this.delete(`/${workflowId}`);
    }
    /**
     * 激活工作流
     * @param workflowId 工作流ID
     * @returns 更新后的工作流定义
     */
    async activateWorkflow(workflowId) {
        return this.post(`/${workflowId}/activate`);
    }
    /**
     * 停用工作流
     * @param workflowId 工作流ID
     * @returns 更新后的工作流定义
     */
    async deactivateWorkflow(workflowId) {
        return this.post(`/${workflowId}/deactivate`);
    }
    /**
     * 执行工作流
     * @param workflowId 工作流ID
     * @param params 执行参数
     * @returns 工作流实例
     */
    async executeWorkflow(workflowId, params = {}) {
        return this.post(`/${workflowId}/execute`, params);
    }
    /**
     * 获取工作流实例
     * @param instanceId 实例ID
     * @returns 工作流实例
     */
    async getWorkflowInstance(instanceId) {
        return this.get(`/instances/${instanceId}`);
    }
    /**
     * 获取工作流的所有实例
     * @param workflowId 工作流ID
     * @returns 工作流实例列表
     */
    async getWorkflowInstances(workflowId) {
        return this.get(`/${workflowId}/instances`);
    }
    /**
     * 取消工作流实例
     * @param instanceId 实例ID
     * @returns 更新后的工作流实例
     */
    async cancelWorkflowInstance(instanceId) {
        return this.post(`/instances/${instanceId}/cancel`);
    }
    /**
     * 重试工作流实例
     * @param instanceId 实例ID
     * @returns 新的工作流实例
     */
    async retryWorkflowInstance(instanceId) {
        return this.post(`/instances/${instanceId}/retry`);
    }
    /**
     * 获取工作流任务实例详情
     * @param instanceId 工作流实例ID
     * @param taskInstanceId 任务实例ID
     * @returns 任务实例
     */
    async getTaskInstance(instanceId, taskInstanceId) {
        return this.get(`/instances/${instanceId}/tasks/${taskInstanceId}`);
    }
    /**
     * 重试工作流任务实例
     * @param instanceId 工作流实例ID
     * @param taskInstanceId 任务实例ID
     * @returns 更新后的任务实例
     */
    async retryTaskInstance(instanceId, taskInstanceId) {
        return this.post(`/instances/${instanceId}/tasks/${taskInstanceId}/retry`);
    }
    /**
     * 跳过工作流任务实例
     * @param instanceId 工作流实例ID
     * @param taskInstanceId 任务实例ID
     * @returns 更新后的任务实例
     */
    async skipTaskInstance(instanceId, taskInstanceId) {
        return this.post(`/instances/${instanceId}/tasks/${taskInstanceId}/skip`);
    }
}
exports.WorkflowModule = WorkflowModule;
//# sourceMappingURL=workflow.js.map