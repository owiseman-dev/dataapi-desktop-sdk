export declare class Store {
    private state;
    private listeners;
    /**
     * 获取状态
     */
    get<T>(key: string, defaultValue?: T): T;
    /**
     * 设置状态
     */
    set<T>(key: string, value: T): void;
    /**
     * 监听状态变化
     */
    subscribe(key: string, listener: (value: any, oldValue: any) => void): () => void;
    /**
     * 通知监听器
     */
    private notify;
}
