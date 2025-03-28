export interface McpRequest {
    command: string;
    parameters?: Record<string, string>;
}
export interface McpResponse {
    success: boolean;
    result?: string;
    errorMessage?: string;
}
/**
 * 发送MCP请求
 */
export declare function sendRequest(request: McpRequest): Promise<McpResponse>;
/**
 * 获取MCP服务状态
 */
export declare function getStatus(): Promise<any>;
