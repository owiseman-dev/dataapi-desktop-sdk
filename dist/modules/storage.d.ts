import { AxiosInstance } from 'axios';
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
export declare class StorageModule extends BaseModule {
    /**
     * 创建存储管理模块实例
     * @param httpClient Axios实例
     */
    constructor(httpClient: AxiosInstance);
    /**
     * 上传文件
     * @param file 文件对象（浏览器环境中的File对象或Node.js中的Buffer/Stream）
     * @param options 上传选项
     * @returns 上传后的文件信息
     */
    uploadFile(file: File | Buffer | NodeJS.ReadableStream, options?: UploadOptions): Promise<FileInfo>;
    /**
     * 下载文件
     * @param fileId 文件ID
     * @param options 下载选项
     * @returns 文件数据
     */
    downloadFile(fileId: string, options?: DownloadOptions): Promise<Blob | Buffer>;
    /**
     * 获取文件信息
     * @param fileId 文件ID
     * @returns 文件信息
     */
    getFileInfo(fileId: string): Promise<FileInfo>;
    /**
     * 列出文件
     * @param params 查询参数
     * @returns 文件列表响应
     */
    listFiles(params?: ListFilesParams): Promise<ListFilesResponse>;
    /**
     * 删除文件
     * @param fileId 文件ID
     * @returns 操作结果
     */
    deleteFile(fileId: string): Promise<void>;
    /**
     * 创建文件夹
     * @param folderPath 文件夹路径
     * @returns 创建的文件夹信息
     */
    createFolder(folderPath: string): Promise<FileInfo>;
    /**
     * 从响应头中获取文件名
     * @param response Axios响应对象
     * @returns 文件名
     */
    private getFileNameFromResponse;
}
