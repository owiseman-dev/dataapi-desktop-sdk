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
export class KnowledgeModule extends BaseModule {
  /**
   * 创建知识库管理模块实例
   * @param httpClient Axios实例
   */
  constructor(httpClient: AxiosInstance) {
    super(httpClient, '/api/knowledge');
  }

  /**
   * 获取所有知识库
   * @returns 知识库列表
   */
  public async getKnowledgeBases(): Promise<KnowledgeBase[]> {
    return this.get<KnowledgeBase[]>('/bases');
  }

  /**
   * 获取知识库详情
   * @param baseId 知识库ID
   * @returns 知识库信息
   */
  public async getKnowledgeBase(baseId: string): Promise<KnowledgeBase> {
    return this.get<KnowledgeBase>(`/bases/${baseId}`);
  }

  /**
   * 创建知识库
   * @param params 创建参数
   * @returns 创建的知识库信息
   */
  public async createKnowledgeBase(params: CreateKnowledgeBaseParams): Promise<KnowledgeBase> {
    return this.post<KnowledgeBase>('/bases', params);
  }

  /**
   * 更新知识库
   * @param baseId 知识库ID
   * @param params 更新参数
   * @returns 更新后的知识库信息
   */
  public async updateKnowledgeBase(
    baseId: string,
    params: Partial<CreateKnowledgeBaseParams>
  ): Promise<KnowledgeBase> {
    return this.put<KnowledgeBase>(`/bases/${baseId}`, params);
  }

  /**
   * 删除知识库
   * @param baseId 知识库ID
   * @returns 操作结果
   */
  public async deleteKnowledgeBase(baseId: string): Promise<void> {
    await this.delete(`/bases/${baseId}`);
  }

  /**
   * 获取知识库中的所有文档
   * @param baseId 知识库ID
   * @returns 文档列表
   */
  public async getDocuments(baseId: string): Promise<Document[]> {
    return this.get<Document[]>(`/bases/${baseId}/documents`);
  }

  /**
   * 获取文档详情
   * @param baseId 知识库ID
   * @param documentId 文档ID
   * @returns 文档信息
   */
  public async getDocument(baseId: string, documentId: string): Promise<Document> {
    return this.get<Document>(`/bases/${baseId}/documents/${documentId}`);
  }

  /**
   * 创建文档
   * @param baseId 知识库ID
   * @param params 创建参数
   * @returns 创建的文档信息
   */
  public async createDocument(baseId: string, params: CreateDocumentParams): Promise<Document> {
    return this.post<Document>(`/bases/${baseId}/documents`, params);
  }

  /**
   * 更新文档
   * @param baseId 知识库ID
   * @param documentId 文档ID
   * @param params 更新参数
   * @returns 更新后的文档信息
   */
  public async updateDocument(
    baseId: string,
    documentId: string,
    params: Partial<CreateDocumentParams>
  ): Promise<Document> {
    return this.put<Document>(`/bases/${baseId}/documents/${documentId}`, params);
  }

  /**
   * 删除文档
   * @param baseId 知识库ID
   * @param documentId 文档ID
   * @returns 操作结果
   */
  public async deleteDocument(baseId: string, documentId: string): Promise<void> {
    await this.delete(`/bases/${baseId}/documents/${documentId}`);
  }

  /**
   * 搜索知识库
   * @param baseId 知识库ID
   * @param params 搜索参数
   * @returns 搜索结果
   */
  public async search(baseId: string, params: SearchParams): Promise<SearchResult[]> {
    return this.post<SearchResult[]>(`/bases/${baseId}/search`, params);
  }

  /**
   * 批量导入文档
   * @param baseId 知识库ID
   * @param documents 文档列表
   * @returns 导入结果
   */
  public async importDocuments(
    baseId: string,
    documents: CreateDocumentParams[]
  ): Promise<{ total: number; successful: number; failed: number }> {
    return this.post(`/bases/${baseId}/import`, { documents });
  }

  /**
   * 导出知识库文档
   * @param baseId 知识库ID
   * @param format 导出格式 (json, csv, markdown)
   * @returns 导出数据
   */
  public async exportDocuments(baseId: string, format: 'json' | 'csv' | 'markdown' = 'json'): Promise<Blob> {
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
  public async getSimilarDocuments(baseId: string, documentId: string, limit = 5): Promise<SearchResult[]> {
    return this.get<SearchResult[]>(`/bases/${baseId}/documents/${documentId}/similar`, {
      params: { limit }
    });
  }
}