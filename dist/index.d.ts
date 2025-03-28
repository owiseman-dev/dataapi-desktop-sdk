import * as api from './api';
import { SdkConfig } from './core/config';
import { EventSystem } from './core/events';
import { Store } from './core/store';
import { UserManager } from './core/user';
/**
 * DataAPI SDK 主类
 */
export declare class DataApiSDK {
    api: typeof api;
    events: EventSystem;
    store: Store;
    user: UserManager;
    private static instance;
    private initialized;
    /**
     * 创建 SDK 实例
     * @param config SDK 配置
     */
    constructor(config?: Partial<SdkConfig>);
    /**
     * 获取 SDK 单例实例
     * @param config SDK 配置
     * @returns SDK 实例
     */
    static getInstance(config?: Partial<SdkConfig>): DataApiSDK;
    /**
     * 初始化 SDK
     * @returns SDK 实例
     */
    init(): Promise<DataApiSDK>;
    /**
     * 连接到后端服务
     */
    connect(options?: {
        url?: string;
        token?: string;
    }): Promise<DataApiSDK>;
    /**
     * 断开连接
     */
    disconnect(): Promise<void>;
}
export * from './api';
export * from './core/user';
export * from './core/config';
declare const dataapi: DataApiSDK;
export default dataapi;
