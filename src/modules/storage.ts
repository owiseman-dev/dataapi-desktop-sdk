import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BaseModule } from '../core/base-module';

/**
 * 文件信息接口
 */
export interface FileInfo {
  id: string;
  name: string;
  path: string;
  size: number;
  mimeType: string;
  extension: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
  url?: string;
}

/**
 * 文件上传选项
 */
export interface UploadOptions {
  /** 文件夹路径 */
  folder?: string;
  /** 是否覆盖同名文件 */
  overwrite?: boolean;
  /** 文件元数据 */
  metadata?: Record<string, any>;
  /** 上传进度回调 */
  onProgress?: (progress: number) => void;
  /** 文件名（用于Buffer类型，没有原生文件名） */
  fileName?: string;
}

/**
 * 文件下载选项
 */
export interface DownloadOptions {
  /** 是否自动保存文件（仅浏览器环境） */
  autoSave?: boolean;
  /** 下载的文件名（仅在autoSave为true时有效） */
  fileName?: string;
  /** 下载进度回调 */
  onProgress?: (progress: number) => void;
}

/**
 * 文件列表查询参数
 */
export interface ListFilesParams {
  /** 文件夹路径 */
  folder?: string;
  /** 页码，从1开始 */
  page?: number;
  /** 每页数量 */
  size?: number;
  /** 排序字段 */
  sortBy?: string;
  /** 排序方向 */
  sortDirection?: 'asc' | 'desc';
  /** 文件类型过滤 */
  mimeType?: string;
  /** 文件扩展名过滤 */
  extension?: string;
}

/**
 * 文件列表响应
 */
export interface ListFilesResponse {
  content: FileInfo[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

/**
 * 存储管理模块
 * 处理文件上传、下载和管理
 */
export class StorageModule extends BaseModule {
  /**
   * 创建存储管理模块实例
   * @param httpClient Axios实例
   */
  constructor(httpClient: AxiosInstance) {
    super(httpClient, '/api/storage');
  }

  /**
   * 上传文件
   * @param file 文件对象（浏览器环境中的File对象或Node.js中的Buffer/Stream）
   * @param options 上传选项
   * @returns 上传后的文件信息
   */
  public async uploadFile(file: File | Buffer | NodeJS.ReadableStream, options: UploadOptions = {}): Promise<FileInfo> {
    const formData = new FormData();
    
    // 添加文件数据
    if (file instanceof File) {
      formData.append('file', file);
    } else if (Buffer.isBuffer(file)) {
      // 在Node.js环境中，需要创建一个类似File的对象
      const blob = new Blob([file]);
      // Buffer没有name属性，使用options中的fileName或默认名称
      const fileName = options.fileName || `file_${Date.now()}`;
      formData.append('file', blob, options.folder ? `${options.folder}/${fileName}` : fileName);
    } else {
      throw new Error('Unsupported file type for upload');
    }
    
    // 添加选项参数
    if (options.folder) {
      formData.append('folder', options.folder);
    }
    
    if (options.overwrite !== undefined) {
      formData.append('overwrite', options.overwrite.toString());
    }
    
    if (options.metadata) {
      formData.append('metadata', JSON.stringify(options.metadata));
    }
    
    // 配置请求
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    
    // 添加上传进度回调
    if (options.onProgress) {
      config.onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
        options.onProgress!(percentCompleted);
      };
    }
    
    // 发送请求
    const response = await this.post<FileInfo>('/upload', formData, config);
    return response;
  }

  /**
   * 下载文件
   * @param fileId 文件ID
   * @param options 下载选项
   * @returns 文件数据
   */
  public async downloadFile(fileId: string, options: DownloadOptions = {}): Promise<Blob | Buffer> {
    const config: AxiosRequestConfig = {
      responseType: 'blob',
      onDownloadProgress: options.onProgress ? (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
        options.onProgress!(percentCompleted);
      } : undefined
    };
    
    const response: AxiosResponse<Blob> = await this.httpClient.get(
      `${this.basePath}/download/${fileId}`,
      config
    );
    
    const fileData = response.data;
    
    // 在浏览器环境中，如果设置了自动保存，则触发文件下载
    if (typeof window !== 'undefined' && options.autoSave) {
      const url = window.URL.createObjectURL(fileData);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', options.fileName || this.getFileNameFromResponse(response));
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
    
    return fileData;
  }

  /**
   * 获取文件信息
   * @param fileId 文件ID
   * @returns 文件信息
   */
  public async getFileInfo(fileId: string): Promise<FileInfo> {
    return this.get<FileInfo>(`/${fileId}`);
  }

  /**
   * 列出文件
   * @param params 查询参数
   * @returns 文件列表响应
   */
  public async listFiles(params: ListFilesParams = {}): Promise<ListFilesResponse> {
    return this.get<ListFilesResponse>('', { params });
  }

  /**
   * 删除文件
   * @param fileId 文件ID
   * @returns 操作结果
   */
  public async deleteFile(fileId: string): Promise<void> {
    await this.delete(`/${fileId}`);
  }

  /**
   * 创建文件夹
   * @param folderPath 文件夹路径
   * @returns 创建的文件夹信息
   */
  public async createFolder(folderPath: string): Promise<FileInfo> {
    return this.post<FileInfo>('/folder', { path: folderPath });
  }

  /**
   * 从响应头中获取文件名
   * @param response Axios响应对象
   * @returns 文件名
   */
  private getFileNameFromResponse(response: AxiosResponse): string {
    // 尝试从Content-Disposition头中获取文件名
    const contentDisposition = response.headers['content-disposition'];
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch && filenameMatch[1]) {
        return filenameMatch[1];
      }
    }
    
    // 如果无法从头中获取，则使用当前时间戳作为文件名
    return `download_${Date.now()}`;
  }
}