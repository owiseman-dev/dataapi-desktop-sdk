import axios from 'axios';
import { AuthModule } from '../src/modules/auth';
import { ApiError } from '../src/core/api-error';

// 模拟axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AuthModule', () => {
  let authModule: AuthModule;
  let httpClient: any;

  beforeEach(() => {
    // 重置所有模拟
    jest.clearAllMocks();
    
    // 创建模拟的httpClient
    httpClient = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn()
    };
    
    // 创建AuthModule实例
    authModule = new AuthModule(httpClient);
  });

  describe('login', () => {
    it('应该成功登录并返回登录响应', async () => {
      // 模拟响应数据
      const mockResponse = {
        data: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          tokenType: 'Bearer',
          expiresIn: 3600,
          user: {
            id: 'user-123',
            username: 'testuser',
            email: 'test@example.com',
            roles: ['user'],
            permissions: ['read', 'write'],
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z'
          }
        }
      };
      
      // 设置模拟实现
      httpClient.post.mockResolvedValueOnce(mockResponse);
      
      // 调用登录方法
      const result = await authModule.login('testuser', 'password');
      
      // 验证结果
      expect(result).toEqual(mockResponse.data);
      expect(httpClient.post).toHaveBeenCalledWith('/api/auth/login', {
        username: 'testuser',
        password: 'password',
        rememberMe: false
      });
    });

    it('应该处理登录失败', async () => {
      // 模拟错误响应
      const mockError = {
        response: {
          status: 401,
          data: {
            message: '用户名或密码不正确'
          }
        }
      };
      
      // 设置模拟实现
      httpClient.post.mockRejectedValueOnce(mockError);
      
      // 调用登录方法并验证它抛出错误
      await expect(authModule.login('testuser', 'wrong-password')).rejects.toThrow();
      expect(httpClient.post).toHaveBeenCalledWith('/api/auth/login', {
        username: 'testuser',
        password: 'wrong-password',
        rememberMe: false
      });
    });
  });

  describe('getCurrentUser', () => {
    it('应该获取当前用户信息', async () => {
      // 模拟响应数据
      const mockResponse = {
        data: {
          id: 'user-123',
          username: 'testuser',
          email: 'test@example.com',
          roles: ['user'],
          permissions: ['read', 'write'],
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z'
        }
      };
      
      // 设置模拟实现
      httpClient.get.mockResolvedValueOnce(mockResponse);
      
      // 调用获取当前用户方法
      const result = await authModule.getCurrentUser();
      
      // 验证结果
      expect(result).toEqual(mockResponse.data);
      expect(httpClient.get).toHaveBeenCalledWith('/api/auth/me');
    });
  });

  describe('hasPermission', () => {
    it('应该返回true当用户有指定权限', async () => {
      // 模拟响应数据
      const mockResponse = {
        data: {
          id: 'user-123',
          username: 'testuser',
          email: 'test@example.com',
          roles: ['user'],
          permissions: ['read', 'write', 'admin'],
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z'
        }
      };
      
      // 设置模拟实现
      httpClient.get.mockResolvedValueOnce(mockResponse);
      
      // 调用检查权限方法
      const result = await authModule.hasPermission('admin');
      
      // 验证结果
      expect(result).toBe(true);
      expect(httpClient.get).toHaveBeenCalledWith('/api/auth/me');
    });

    it('应该返回false当用户没有指定权限', async () => {
      // 模拟响应数据
      const mockResponse = {
        data: {
          id: 'user-123',
          username: 'testuser',
          email: 'test@example.com',
          roles: ['user'],
          permissions: ['read', 'write'],
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z'
        }
      };
      
      // 设置模拟实现
      httpClient.get.mockResolvedValueOnce(mockResponse);
      
      // 调用检查权限方法
      const result = await authModule.hasPermission('admin');
      
      // 验证结果
      expect(result).toBe(false);
      expect(httpClient.get).toHaveBeenCalledWith('/api/auth/me');
    });
  });
});