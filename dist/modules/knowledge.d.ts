import { AxiosInstance } from 'axios';
import { BaseModule } from '../core/base-module';
/**
 * 知识库信息接口
 */
export interface KnowledgeBase {
    id: string;
    name: string;
    description?: string;
    type: string;
    documentCount: number;
    createdAt: string;
    updatedAt: string;
    metadata?: Record<string, any>;
}
/**
 * 文档信息接口
 */
export interface Document {
    id: string;
    title: string;
    content: string;
    knowledgeBaseId: string;
    metadata?: Record<string, any>;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}
/**
 * 搜索结果接口
 */
export interface SearchResult {
    documentId: string;
    title: string;
    content: string;
    excerpt: string;
    score: number;
    highlights?: {
        field: string;
        fragments: string[];
    }[];
    metadata?: Record<string, any>;
}
/**
 * 知识库创建参数
 */
export interface CreateKnowledgeBaseParams {
    name: string;
    description?: string;
    type: string;
    metadata?: Record<string, any>;
}
/**
 * 文档创建参数
 */
export interface CreateDocumentParams {
    title: string;
    content: string;
    metadata?: Record<string, any>;
    tags?: string[];
}
/**
 * 搜索参数
 */
export interface SearchParams {
    query: string;
    filters?: Record<string, any>;
    limit?: number;
    offset?: number;
    highlightFields?: string[];
    highlightPreTag?: string;
    highlightPostTag?: string;
}
/**
 * 知识库管理模块
 * 提供知识库的访问和操作功能
 */
export declare class KnowledgeModule extends BaseModule {
    /**
     * 创建知识库管理模块实例
     * @param httpClient Axios实例
     */
    constructor(httpClient: AxiosInstance);
    /**
     * 获取所有知识库
     * @returns 知识库列表
     */
    getKnowledgeBases(): Promise<KnowledgeBase[]>;
    /**
     * 获取知识库详情
     * @param baseId 知识库ID
     * @returns 知识库信息
     */
    getKnowledgeBase(baseId: string): Promise<KnowledgeBase>;
    /**
     * 创建知识库
     * @param params 创建参数
     * @returns 创建的知识库信息
     */
    createKnowledgeBase(params: CreateKnowledgeBaseParams): Promise<KnowledgeBase>;
    /**
     * 更新知识库
     * @param baseId 知识库ID
     * @param params 更新参数
     * @returns 更新后的知识库信息
     */
    updateKnowledgeBase(baseId: string, params: Partial<CreateKnowledgeBaseParams>): Promise<KnowledgeBase>;
    /**
     * 删除知识库
     * @param baseId 知识库ID
     * @returns 操作结果
     */
    deleteKnowledgeBase(baseId: string): Promise<void>;
    /**
     * 获取知识库中的所有文档
     * @param baseId 知识库ID
     * @returns 文档列表
     */
    getDocuments(baseId: string): Promise<Document[]>;
    /**
     * 获取文档详情
     * @param baseId 知识库ID
     * @param documentId 文档ID
     * @returns 文档信息
     */
    getDocument(baseId: string, documentId: string): Promise<Document>;
    /**
     * 创建文档
     * @param baseId 知识库ID
     * @param params 创建参数
     * @returns 创建的文档信息
     */
    createDocument(baseId: string, params: CreateDocumentParams): Promise<Document>;
    /**
     * 更新文档
     * @param baseId 知识库ID
     * @param documentId 文档ID
     * @param params 更新参数
     * @returns 更新后的文档信息
     */
    updateDocument(baseId: string, documentId: string, params: Partial<CreateDocumentParams>): Promise<Document>;
    /**
     * 删除文档
     * @param baseId 知识库ID
     * @param documentId 文档ID
     * @returns 操作结果
     */
    deleteDocument(baseId: string, documentId: string): Promise<void>;
    /**
     * 搜索知识库
     * @param baseId 知识库ID
     * @param params 搜索参数
     * @returns 搜索结果
     */
    search(baseId: string, params: SearchParams): Promise<SearchResult[]>;
    /**
     * 批量导入文档
     * @param baseId 知识库ID
     * @param documents 文档列表
     * @returns 导入结果
     */
    importDocuments(baseId: string, documents: CreateDocumentParams[]): Promise<{
        total: number;
        successful: number;
        failed: number;
    }>;
    /**
     * 导出知识库文档
     * @param baseId 知识库ID
     * @param format 导出格式 (json, csv, markdown)
     * @returns 导出数据
     */
    exportDocuments(baseId: string, format?: 'json' | 'csv' | 'markdown'): Promise<Blob>;
    /**
     * 获取文档的相似文档
     * @param baseId 知识库ID
     * @param documentId 文档ID
     * @param limit 结果数量限制
     * @returns 相似文档列表
     */
    getSimilarDocuments(baseId: string, documentId: string, limit?: number): Promise<SearchResult[]>;
}
