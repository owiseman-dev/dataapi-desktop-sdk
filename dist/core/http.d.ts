/**
 * HTTP 请求选项
 */
export interface HttpRequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: any;
    timeout?: number;
    retry?: number;
}
/**
 * HTTP 客户端类
 */
export declare class HttpClient {
    /**
     * 发送 HTTP 请求
     * @param path API 路径
     * @param options 请求选项
     * @returns 响应数据
     */
    static request<T = any>(path: string, options?: HttpRequestOptions): Promise<T>;
    /**
     * 发送 GET 请求
     * @param path API 路径
     * @param options 请求选项
     * @returns 响应数据
     */
    static get<T = any>(path: string, options?: Omit<HttpRequestOptions, 'method'>): Promise<T>;
    /**
     * 发送 POST 请求
     * @param path API 路径
     * @param body 请求体
     * @param options 请求选项
     * @returns 响应数据
     */
    static post<T = any>(path: string, body?: any, options?: Omit<HttpRequestOptions, 'method' | 'body'>): Promise<T>;
    /**
     * 发送 PUT 请求
     * @param path API 路径
     * @param body 请求体
     * @param options 请求选项
     * @returns 响应数据
     */
    static put<T = any>(path: string, body?: any, options?: Omit<HttpRequestOptions, 'method' | 'body'>): Promise<T>;
    /**
     * 发送 DELETE 请求
     * @param path API 路径
     * @param options 请求选项
     * @returns 响应数据
     */
    static delete<T = any>(path: string, options?: Omit<HttpRequestOptions, 'method'>): Promise<T>;
    /**
     * 发送带认证的请求
     * @param path API 路径
     * @param options 请求选项
     * @returns 响应数据
     */
    static authRequest<T = any>(path: string, options?: HttpRequestOptions): Promise<T>;
}
