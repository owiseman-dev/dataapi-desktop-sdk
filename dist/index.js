import * as api from './api';
import { initConfig } from './core/config';
import { EventSystem } from './core/events';
import { Store } from './core/store';
import { UserManager } from './core/user';
/**
 * DataAPI SDK 主类
 */
export class DataApiSDK {
    /**
     * 创建 SDK 实例
     * @param config SDK 配置
     */
    constructor(config = {}) {
        this.api = api;
        this.events = new EventSystem();
        this.store = new Store();
        this.initialized = false;
        initConfig(config);
        this.user = new UserManager();
    }
    /**
     * 获取 SDK 单例实例
     * @param config SDK 配置
     * @returns SDK 实例
     */
    static getInstance(config) {
        if (!DataApiSDK.instance) {
            DataApiSDK.instance = new DataApiSDK(config);
        }
        else if (config) {
            // 如果已经有实例但又传入了配置，则更新配置
            initConfig(config);
        }
        return DataApiSDK.instance;
    }
    /**
     * 初始化 SDK
     * @returns SDK 实例
     */
    async init() {
        if (this.initialized) {
            console.warn('DataAPI SDK 已经初始化');
            return this;
        }
        // 初始化逻辑
        await this.user.restoreSession();
        this.initialized = true;
        console.log('DataAPI SDK 初始化完成');
        this.events.emit('sdk:ready');
        return this;
    }
    /**
     * 连接到后端服务
     */
    async connect(options = {}) {
        // 连接逻辑
        this.events.emit('sdk:connected');
        return this;
    }
    /**
     * 断开连接
     */
    async disconnect() {
        // 断开连接逻辑
        this.events.emit('sdk:disconnected');
    }
}
DataApiSDK.instance = null;
// 导出类型和API
export * from './api';
export * from './core/user';
export * from './core/config';
// 创建默认实例
const dataapi = DataApiSDK.getInstance();
export default dataapi;
