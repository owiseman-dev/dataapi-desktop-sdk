"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeModule = void 0;
const base_module_1 = require("../core/base-module");
/**
 * 知识库管理模块
 * 提供知识库的访问和操作功能
 */
class KnowledgeModule extends base_module_1.BaseModule {
    /**
     * 创建知识库管理模块实例
     * @param httpClient Axios实例
     */
    constructor(httpClient) {
        super(httpClient, '/api/knowledge');
    }
    /**
     * 获取所有知识库
     * @returns 知识库列表
     */
    async getKnowledgeBases() {
        return this.get('/bases');
    }
    /**
     * 获取知识库详情
     * @param baseId 知识库ID
     * @returns 知识库信息
     */
    async getKnowledgeBase(baseId) {
        return this.get(`/bases/${baseId}`);
    }
    /**
     * 创建知识库
     * @param params 创建参数
     * @returns 创建的知识库信息
     */
    async createKnowledgeBase(params) {
        return this.post('/bases', params);
    }
    /**
     * 更新知识库
     * @param baseId 知识库ID
     * @param params 更新参数
     * @returns 更新后的知识库信息
     */
    async updateKnowledgeBase(baseId, params) {
        return this.put(`/bases/${baseId}`, params);
    }
    /**
     * 删除知识库
     * @param baseId 知识库ID
     * @returns 操作结果
     */
    async deleteKnowledgeBase(baseId) {
        await this.delete(`/bases/${baseId}`);
    }
    /**
     * 获取知识库中的所有文档
     * @param baseId 知识库ID
     * @returns 文档列表
     */
    async getDocuments(baseId) {
        return this.get(`/bases/${baseId}/documents`);
    }
    /**
     * 获取文档详情
     * @param baseId 知识库ID
     * @param documentId 文档ID
     * @returns 文档信息
     */
    async getDocument(baseId, documentId) {
        return this.get(`/bases/${baseId}/documents/${documentId}`);
    }
    /**
     * 创建文档
     * @param baseId 知识库ID
     * @param params 创建参数
     * @returns 创建的文档信息
     */
    async createDocument(baseId, params) {
        return this.post(`/bases/${baseId}/documents`, params);
    }
    /**
     * 更新文档
     * @param baseId 知识库ID
     * @param documentId 文档ID
     * @param params 更新参数
     * @returns 更新后的文档信息
     */
    async updateDocument(baseId, documentId, params) {
        return this.put(`/bases/${baseId}/documents/${documentId}`, params);
    }
    /**
     * 删除文档
     * @param baseId 知识库ID
     * @param documentId 文档ID
     * @returns 操作结果
     */
    async deleteDocument(baseId, documentId) {
        await this.delete(`/bases/${baseId}/documents/${documentId}`);
    }
    /**
     * 搜索知识库
     * @param baseId 知识库ID
     * @param params 搜索参数
     * @returns 搜索结果
     */
    async search(baseId, params) {
        return this.post(`/bases/${baseId}/search`, params);
    }
    /**
     * 批量导入文档
     * @param baseId 知识库ID
     * @param documents 文档列表
     * @returns 导入结果
     */
    async importDocuments(baseId, documents) {
        return this.post(`/bases/${baseId}/import`, { documents });
    }
    /**
     * 导出知识库文档
     * @param baseId 知识库ID
     * @param format 导出格式 (json, csv, markdown)
     * @returns 导出数据
     */
    async exportDocuments(baseId, format = 'json') {
        const response = await this.httpClient.get(`${this.basePath}/bases/${baseId}/export`, {
            params: { format },
            responseType: 'blob'
        });
        return response.data;
    }
    /**
     * 获取文档的相似文档
     * @param baseId 知识库ID
     * @param documentId 文档ID
     * @param limit 结果数量限制
     * @returns 相似文档列表
     */
    async getSimilarDocuments(baseId, documentId, limit = 5) {
        return this.get(`/bases/${baseId}/documents/${documentId}/similar`, {
            params: { limit }
        });
    }
}
exports.KnowledgeModule = KnowledgeModule;
//# sourceMappingURL=knowledge.js.map