export class Store {
    constructor() {
        this.state = {};
        this.listeners = new Map();
    }
    /**
     * 获取状态
     */
    get(key, defaultValue) {
        // 修复类型问题，添加非空断言或条件类型
        return (this.state[key] !== undefined ? this.state[key] : defaultValue);
    }
    /**
     * 设置状态
     */
    set(key, value) {
        const oldValue = this.state[key];
        this.state[key] = value;
        // 通知监听器
        if (oldValue !== value) {
            this.notify(key, value, oldValue);
        }
    }
    /**
     * 监听状态变化
     */
    subscribe(key, listener) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        this.listeners.get(key).push(listener);
        // 返回取消订阅函数
        return () => {
            const listeners = this.listeners.get(key);
            if (listeners) {
                const index = listeners.indexOf(listener);
                if (index !== -1) {
                    listeners.splice(index, 1);
                }
            }
        };
    }
    /**
     * 通知监听器
     */
    notify(key, value, oldValue) {
        const listeners = this.listeners.get(key);
        if (listeners) {
            listeners.forEach(listener => listener(value, oldValue));
        }
    }
}
