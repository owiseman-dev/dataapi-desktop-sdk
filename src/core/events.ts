export type EventCallback = (...args: any[]) => void;

export class EventSystem {
  private listeners: Map<string, EventCallback[]> = new Map();
  
  /**
   * 注册事件监听器
   * @param event 事件名称
   * @param callback 回调函数
   */
  on(event: string, callback: EventCallback): void {
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
  once(event: string, callback: EventCallback): void {
    const onceCallback: EventCallback = (...args: any[]) => {
      callback(...args);
      this.offListener(event, onceCallback);
    };
    
    this.on(event, onceCallback);
  }
  
  /**
   * 移除事件的所有监听器
   * @param event 事件名称
   */
  off(event: string): void {
    this.listeners.delete(event);
  }
  
  /**
   * 移除特定事件的特定监听器
   * @param event 事件名称
   * @param callback 要移除的回调函数
   */
  offListener(event: string, callback: EventCallback): void {
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
  emit(event: string, ...args: any[]): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((callback: EventCallback) => callback(...args));
    }
  }
}