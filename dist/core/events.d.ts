export type EventCallback = (...args: any[]) => void;
export declare class EventSystem {
    private listeners;
    /**
     * 注册事件监听器
     * @param event 事件名称
     * @param callback 回调函数
     */
    on(event: string, callback: EventCallback): void;
    /**
     * 注册一次性事件监听器
     * @param event 事件名称
     * @param callback 回调函数
     */
    once(event: string, callback: EventCallback): void;
    /**
     * 移除事件的所有监听器
     * @param event 事件名称
     */
    off(event: string): void;
    /**
     * 移除特定事件的特定监听器
     * @param event 事件名称
     * @param callback 要移除的回调函数
     */
    offListener(event: string, callback: EventCallback): void;
    /**
     * 触发事件
     * @param event 事件名称
     * @param args 事件参数
     */
    emit(event: string, ...args: any[]): void;
}
