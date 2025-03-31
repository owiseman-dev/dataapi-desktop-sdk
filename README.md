# DataAPI Desktop SDK

这是一个用TypeScript编写的SDK，用于连接Spring Boot后端系统，支持Web和桌面应用（如Tauri等）开发。该SDK旨在简化与后端系统的交互，减少重复代码。

## 功能特性

该SDK提供以下核心功能模块：

- **用户管理** - 用户认证、注册、权限控制等
- **存储管理** - 文件上传、下载、管理等
- **数据库管理** - 数据库操作接口
- **网关管理** - API网关配置和访问
- **插件管理** - 扩展功能的插件系统
- **知识库管理** - 知识库的访问和操作
- **流程管理** - 工作流定义和执行

## 安装

```bash
npm install dataapi-desktop-sdk
# 或
yarn add dataapi-desktop-sdk
```

## 快速开始

```typescript
import { DataAPIClient } from 'dataapi-desktop-sdk';

// 初始化客户端
const client = new DataAPIClient({
  baseURL: 'https://your-backend-api.com',
  timeout: 30000
});

// 用户登录
async function login() {
  try {
    const result = await client.auth.login('username', 'password');
    console.log('登录成功:', result);
  } catch (error) {
    console.error('登录失败:', error);
  }
}

// 获取数据
async function fetchData() {
  try {
    const data = await client.database.query('collection_name', { status: 'active' });
    console.log('获取数据:', data);
  } catch (error) {
    console.error('获取数据失败:', error);
  }
}
```

## 模块说明

### 用户管理 (Auth)

提供用户认证、注册、权限管理等功能。

### 存储管理 (Storage)

处理文件上传、下载和管理功能。

### 数据库管理 (Database)

提供数据库操作接口，支持查询、插入、更新和删除操作。

### 网关管理 (Gateway)

处理API网关的配置和访问。

### 插件管理 (Plugin)

管理和使用扩展功能的插件。

### 知识库管理 (Knowledge)

提供知识库的访问和操作功能。

### 流程管理 (Workflow)

处理工作流的定义和执行。

## 开发

```bash
# 安装依赖
npm install

# 构建SDK
npm run build

# 运行测试
npm test

# 代码格式化
npm run format
```

## 许可证

MIT