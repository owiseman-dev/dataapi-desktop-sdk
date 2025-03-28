export interface PluginCommand {
    command: string;
    parameters: Record<string, string>;
}
export interface PluginResponse {
    success: boolean;
    result?: string;
    errorMessage?: string;
}
/**
 * 执行插件命令
 */
export declare function executeCommand(pluginId: string, command: PluginCommand): Promise<PluginResponse>;
/**
 * 获取插件状态
 */
export declare function getPluginStatus(pluginId: string): Promise<any>;
/**
 * 启动MQTT插件
 */
export declare function startMqttPlugin(): Promise<PluginResponse>;
/**
 * 停止MQTT插件
 */
export declare function stopMqttPlugin(): Promise<PluginResponse>;
/**
 * 发布MQTT消息
 */
export declare function publishMqttMessage(topic: string, message: string): Promise<PluginResponse>;
