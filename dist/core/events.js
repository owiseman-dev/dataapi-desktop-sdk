export class EventSystem {
    constructor() {
        this.listeners = new Map();
    }
    /**
     * 注册事件监听器
     * @param event 事件名称
     * @param callback 回调函数
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)?.push(callback);
    }
    /**
     * 注册一次性事件监听器
     * @param event 事件名称
     * @param callback 回调函数
     */
    once(event, callback) {
        const onceCallback = (...args) => {
            callback(...args);
            this.offListener(event, onceCallback);
        };
        this.on(event, onceCallback);
    }
    /**
     * 移除事件的所有监听器
     * @param event 事件名称
     */
    off(event) {
        this.listeners.delete(event);
    }
    /**
     * 移除特定事件的特定监听器
     * @param event 事件名称
     * @param callback 要移除的回调函数
     */
    offListener(event, callback) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index !== -1) {
                callbacks.splice(index, 1);
                if (callbacks.length === 0) {
                    this.listeners.delete(event);
                }
            }
        }
    }
    /**
     * 触发事件
     * @param event 事件名称
     * @param args 事件参数
     */
    emit(event, ...args) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach((callback) => callback(...args));
        }
    }
}
