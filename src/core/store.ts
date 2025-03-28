export class Store {
    private state: Record<string, any> = {};
    private listeners: Map<string, Function[]> = new Map();
    
    /**
     * 获取状态
     */
    get<T>(key: string, defaultValue?: T): T {
      // 修复类型问题，添加非空断言或条件类型
      return (this.state[key] !== undefined ? this.state[key] : defaultValue) as T;
    }
    
    /**
     * 设置状态
     */
    set<T>(key: string, value: T): void {
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
    subscribe(key: string, listener: (value: any, oldValue: any) => void): () => void {
      if (!this.listeners.has(key)) {
        this.listeners.set(key, []);
      }
      
      this.listeners.get(key)!.push(listener);
      
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
    private notify(key: string, value: any, oldValue: any): void {
      const listeners = this.listeners.get(key);
      if (listeners) {
        listeners.forEach(listener => listener(value, oldValue));
      }
    }
  }