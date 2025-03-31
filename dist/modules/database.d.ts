import { AxiosInstance } from 'axios';
import { BaseModule } from '../core/base-module';
/**
 * 数据库查询参数
 */
export interface QueryParams {
    /** 查询条件 */
    filter?: Record<string, any>;
    /** 排序字段 */
    sort?: Record<string, 'asc' | 'desc'>;
    /** 分页参数 */
    pagination?: {
        page: number;
        size: number;
    };
    /** 要返回的字段 */
    fields?: string[];
}
/**
 * 分页响应接口
 */
export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}
/**
 * 数据库操作结果
 */
export interface DatabaseResult {
    /** 影响的记录数 */
    affectedRows?: number;
    /** 插入的ID */
    insertId?: string | number;
    /** 操作是否成功 */
    success: boolean;
}
/**
 * 数据库事务接口
 */
export interface Transaction {
    /** 事务ID */
    id: string;
    /** 提交事务 */
    commit(): Promise<void>;
    /** 回滚事务 */
    rollback(): Promise<void>;
}
/**
 * 数据库管理模块
 * 处理数据库操作、查询、事务等功能
 */
export declare class DatabaseModule extends BaseModule {
    /**
     * 创建数据库管理模块实例
     * @param httpClient Axios实例
     */
    constructor(httpClient: AxiosInstance);
    /**
     * 查询数据
     * @param collection 集合/表名
     * @param params 查询参数
     * @returns 查询结果
     */
    query<T = any>(collection: string, params?: QueryParams): Promise<PageResponse<T>>;
    /**
     * 获取单条记录
     * @param collection 集合/表名
     * @param id 记录ID
     * @returns 记录数据
     */
    getById<T = any>(collection: string, id: string | number): Promise<T>;
    /**
     * 插入记录
     * @param collection 集合/表名
     * @param data 记录数据
     * @returns 插入结果
     */
    insert<T = any>(collection: string, data: Partial<T>): Promise<T>;
    /**
     * 批量插入记录
     * @param collection 集合/表名
     * @param dataList 记录数据列表
     * @returns 操作结果
     */
    bulkInsert<T = any>(collection: string, dataList: Partial<T>[]): Promise<DatabaseResult>;
    /**
     * 更新记录
     * @param collection 集合/表名
     * @param id 记录ID
     * @param data 更新数据
     * @returns 更新后的记录
     */
    update<T = any>(collection: string, id: string | number, data: Partial<T>): Promise<T>;
    /**
     * 部分更新记录
     * @param collection 集合/表名
     * @param id 记录ID
     * @param data 更新数据
     * @returns 更新后的记录
     */
    patchRecord<T = any>(collection: string, id: string | number, data: Partial<T>): Promise<T>;
    /**
     * 删除记录
     * @param collection 集合/表名
     * @param id 记录ID
     * @returns 操作结果
     */
    deleteRecord(collection: string, id: string | number): Promise<void>;
    /**
     * 批量删除记录
     * @param collection 集合/表名
     * @param ids 记录ID列表
     * @returns 操作结果
     */
    bulkDelete(collection: string, ids: (string | number)[]): Promise<DatabaseResult>;
    /**
     * 执行自定义SQL查询
     * @param sql SQL语句
     * @param params 查询参数
     * @returns 查询结果
     */
    executeQuery<T = any>(sql: string, params?: any[]): Promise<T[]>;
    /**
     * 开始事务
     * @returns 事务对象
     */
    beginTransaction(): Promise<Transaction>;
    /**
     * 在事务中执行查询
     * @param transactionId 事务ID
     * @param sql SQL语句
     * @param params 查询参数
     * @returns 查询结果
     */
    executeTransactionQuery<T = any>(transactionId: string, sql: string, params?: any[]): Promise<T[]>;
    /**
     * 获取数据库元数据
     * @returns 数据库元数据
     */
    getMetadata(): Promise<{
        collections: {
            name: string;
            count: number;
        }[];
        version: string;
        type: string;
    }>;
}
