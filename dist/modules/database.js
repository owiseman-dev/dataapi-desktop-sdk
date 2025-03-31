"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const base_module_1 = require("../core/base-module");
/**
 * 数据库管理模块
 * 处理数据库操作、查询、事务等功能
 */
class DatabaseModule extends base_module_1.BaseModule {
    /**
     * 创建数据库管理模块实例
     * @param httpClient Axios实例
     */
    constructor(httpClient) {
        super(httpClient, '/api/database');
    }
    /**
     * 查询数据
     * @param collection 集合/表名
     * @param params 查询参数
     * @returns 查询结果
     */
    async query(collection, params = {}) {
        return this.post(`/${collection}/query`, params);
    }
    /**
     * 获取单条记录
     * @param collection 集合/表名
     * @param id 记录ID
     * @returns 记录数据
     */
    async getById(collection, id) {
        return this.get(`/${collection}/${id}`);
    }
    /**
     * 插入记录
     * @param collection 集合/表名
     * @param data 记录数据
     * @returns 插入结果
     */
    async insert(collection, data) {
        return this.post(`/${collection}`, data);
    }
    /**
     * 批量插入记录
     * @param collection 集合/表名
     * @param dataList 记录数据列表
     * @returns 操作结果
     */
    async bulkInsert(collection, dataList) {
        return this.post(`/${collection}/bulk`, dataList);
    }
    /**
     * 更新记录
     * @param collection 集合/表名
     * @param id 记录ID
     * @param data 更新数据
     * @returns 更新后的记录
     */
    async update(collection, id, data) {
        return this.put(`/${collection}/${id}`, data);
    }
    /**
     * 部分更新记录
     * @param collection 集合/表名
     * @param id 记录ID
     * @param data 更新数据
     * @returns 更新后的记录
     */
    async patchRecord(collection, id, data) {
        return this.patch(`/${collection}/${id}`, data);
    }
    /**
     * 删除记录
     * @param collection 集合/表名
     * @param id 记录ID
     * @returns 操作结果
     */
    async deleteRecord(collection, id) {
        await this.delete(`/${collection}/${id}`);
    }
    /**
     * 批量删除记录
     * @param collection 集合/表名
     * @param ids 记录ID列表
     * @returns 操作结果
     */
    async bulkDelete(collection, ids) {
        return this.post(`/${collection}/bulk-delete`, { ids });
    }
    /**
     * 执行自定义SQL查询
     * @param sql SQL语句
     * @param params 查询参数
     * @returns 查询结果
     */
    async executeQuery(sql, params = []) {
        return this.post('/execute', { sql, params });
    }
    /**
     * 开始事务
     * @returns 事务对象
     */
    async beginTransaction() {
        const response = await this.post('/transaction/begin');
        const transactionId = response.transactionId;
        return {
            id: transactionId,
            commit: async () => {
                await this.post(`/transaction/${transactionId}/commit`);
            },
            rollback: async () => {
                await this.post(`/transaction/${transactionId}/rollback`);
            }
        };
    }
    /**
     * 在事务中执行查询
     * @param transactionId 事务ID
     * @param sql SQL语句
     * @param params 查询参数
     * @returns 查询结果
     */
    async executeTransactionQuery(transactionId, sql, params = []) {
        return this.post(`/transaction/${transactionId}/execute`, { sql, params });
    }
    /**
     * 获取数据库元数据
     * @returns 数据库元数据
     */
    async getMetadata() {
        return this.get('/metadata');
    }
}
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.js.map