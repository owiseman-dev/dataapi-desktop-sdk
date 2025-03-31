/**
 * 基本使用示例
 * 展示如何初始化和使用SDK的各个功能模块
 */

import { DataAPIClient } from '../src';

// 初始化客户端
const client = new DataAPIClient({
  baseURL: 'https://api.example.com', // 替换为实际的API地址
  timeout: 30000,
  autoRefreshToken: true
});

/**
 * 用户认证示例
 */
async function authExample() {
  try {
    // 用户登录
    const loginResult = await client.auth.login('username', 'password');
    console.log('登录成功:', loginResult);

    // 获取当前用户信息
    const currentUser = await client.auth.getCurrentUser();
    console.log('当前用户:', currentUser);

    // 检查用户权限
    const hasAdminPermission = await client.auth.hasPermission('admin');
    console.log('是否有管理员权限:', hasAdminPermission);

    // 登出
    await client.auth.logout();
    console.log('已登出');
  } catch (error) {
    console.error('认证操作失败:', error);
  }
}

/**
 * 存储管理示例
 */
async function storageExample() {
  try {
    // 列出文件
    const files = await client.storage.listFiles({
      folder: '/documents',
      page: 1,
      size: 10
    });
    console.log('文件列表:', files);

    // 上传文件（浏览器环境）
    if (typeof window !== 'undefined') {
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const uploadResult = await client.storage.uploadFile(file, {
          folder: '/uploads',
          onProgress: (progress) => console.log(`上传进度: ${progress}%`)
        });
        console.log('上传结果:', uploadResult);
      }
    }

    // 创建文件夹
    const newFolder = await client.storage.createFolder('/new-folder');
    console.log('创建的文件夹:', newFolder);

    // 获取文件信息
    const fileInfo = await client.storage.getFileInfo('file-id-123');
    console.log('文件信息:', fileInfo);

    // 下载文件
    const fileData = await client.storage.downloadFile('file-id-123', {
      autoSave: true,
      fileName: 'downloaded-file.pdf',
      onProgress: (progress) => console.log(`下载进度: ${progress}%`)
    });
    console.log('文件已下载');
  } catch (error) {
    console.error('存储操作失败:', error);
  }
}

/**
 * 数据库管理示例
 */
async function databaseExample() {
  try {
    // 查询数据
    const users = await client.database.query('users', {
      filter: { status: 'active' },
      sort: { createdAt: 'desc' },
      pagination: { page: 1, size: 20 }
    });
    console.log('用户列表:', users);

    // 获取单条记录
    const user = await client.database.getById('users', 'user-id-123');
    console.log('用户详情:', user);

    // 插入记录
    const newUser = await client.database.insert('users', {
      name: '张三',
      email: 'zhangsan@example.com',
      status: 'active'
    });
    console.log('新建用户:', newUser);

    // 更新记录
    const updatedUser = await client.database.update('users', newUser.id, {
      status: 'inactive'
    });
    console.log('更新后的用户:', updatedUser);

    // 删除记录
    await client.database.delete('users', newUser.id);
    console.log('用户已删除');

    // 使用事务
    const transaction = await client.database.beginTransaction();
    try {
      // 在事务中执行操作
      const result = await client.database.executeTransactionQuery(
        transaction.id,
        'INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)',
        ['user-id-456', 'product-id-789', 2]
      );
      
      // 提交事务
      await transaction.commit();
      console.log('事务已提交');
    } catch (error) {
      // 回滚事务
      await transaction.rollback();
      console.error('事务已回滚:', error);
    }
  } catch (error) {
    console.error('数据库操作失败:', error);
  }
}

/**
 * 网关管理示例
 */
async function gatewayExample() {
  try {
    // 获取网关状态
    const status = await client.gateway.getStatus();
    console.log('网关状态:', status);

    // 获取所有路由
    const routes = await client.gateway.getRoutes();
    console.log('路由列表:', routes);

    // 创建路由
    const newRoute = await client.gateway.createRoute({
      path: '/api/products/**',
      serviceId: 'product-service',
      stripPrefix: true
    });
    console.log('新建路由:', newRoute);

    // 禁用路由
    const disabledRoute = await client.gateway.disableRoute(newRoute.id);
    console.log('已禁用路由:', disabledRoute);

    // 刷新网关配置
    await client.gateway.refreshConfig();
    console.log('网关配置已刷新');
  } catch (error) {
    console.error('网关操作失败:', error);
  }
}

/**
 * 插件管理示例
 */
async function pluginExample() {
  try {
    // 获取所有插件
    const plugins = await client.plugin.getAllPlugins();
    console.log('插件列表:', plugins);

    // 安装插件
    const newPlugin = await client.plugin.installPlugin({
      source: 'https://example.com/plugins/my-plugin.zip',
      autoEnable: true
    });
    console.log('已安装插件:', newPlugin);

    // 获取插件配置
    const pluginConfig = await client.plugin.getPluginConfig(newPlugin.id);
    console.log('插件配置:', pluginConfig);

    // 更新插件配置
    const updatedConfig = await client.plugin.updatePluginConfig(newPlugin.id, {
      apiKey: 'new-api-key',
      enableFeature: true
    });
    console.log('更新后的配置:', updatedConfig);

    // 调用插件方法
    const result = await client.plugin.invokePluginMethod(newPlugin.id, 'processData', {
      data: { key: 'value' }
    });
    console.log('插件方法调用结果:', result);
  } catch (error) {
    console.error('插件操作失败:', error);
  }
}

/**
 * 知识库管理示例
 */
async function knowledgeExample() {
  try {
    // 获取所有知识库
    const knowledgeBases = await client.knowledge.getKnowledgeBases();
    console.log('知识库列表:', knowledgeBases);

    // 创建知识库
    const newKnowledgeBase = await client.knowledge.createKnowledgeBase({
      name: '产品文档库',
      description: '包含所有产品的使用文档',
      type: 'document'
    });
    console.log('新建知识库:', newKnowledgeBase);

    // 创建文档
    const newDocument = await client.knowledge.createDocument(newKnowledgeBase.id, {
      title: '产品使用指南',
      content: '# 产品使用指南\n\n这是一份详细的产品使用说明...',
      tags: ['指南', '入门']
    });
    console.log('新建文档:', newDocument);

    // 搜索知识库
    const searchResults = await client.knowledge.search(newKnowledgeBase.id, {
      query: '使用指南',
      highlightFields: ['title', 'content'],
      limit: 10
    });
    console.log('搜索结果:', searchResults);

    // 获取相似文档
    const similarDocuments = await client.knowledge.getSimilarDocuments(
      newKnowledgeBase.id,
      newDocument.id,
      3
    );
    console.log('相似文档:', similarDocuments);
  } catch (error) {
    console.error('知识库操作失败:', error);
  }
}

/**
 * 流程管理示例
 */
async function workflowExample() {
  try {
    // 获取所有工作流
    const workflows = await client.workflow.getWorkflows();
    console.log('工作流列表:', workflows);

    // 创建工作流
    const newWorkflow = await client.workflow.createWorkflow({
      name: '订单处理流程',
      description: '处理新订单的工作流',
      tasks: [
        {
          name: '验证订单',
          type: 'script',
          config: {
            script: 'function validate(order) { return order.amount > 0; }'
          }
        },
        {
          name: '处理支付',
          type: 'service',
          config: {
            service: 'payment',
            method: 'process'
          },
          dependsOn: ['验证订单']
        }
      ],
      triggers: [
        {
          type: 'event',
          config: {
            eventType: 'order.created'
          }
        }
      ]
    });
    console.log('新建工作流:', newWorkflow);

    // 执行工作流
    const instance = await client.workflow.executeWorkflow(newWorkflow.id, {
      variables: {
        orderId: 'order-123',
        amount: 100
      }
    });
    console.log('工作流实例:', instance);

    // 获取工作流实例状态
    const instanceStatus = await client.workflow.getWorkflowInstance(instance.id);
    console.log('实例状态:', instanceStatus);

    // 如果工作流失败，可以重试
    if (instanceStatus.status === 'FAILED') {
      const retryInstance = await client.workflow.retryWorkflowInstance(instance.id);
      console.log('重试实例:', retryInstance);
    }
  } catch (error) {
    console.error('工作流操作失败:', error);
  }
}

// 运行示例
async function runExamples() {
  console.log('开始运行SDK示例...');
  
  // 依次运行各模块示例
  await authExample();
  await storageExample();
  await databaseExample();
  await gatewayExample();
  await pluginExample();
  await knowledgeExample();
  await workflowExample();
  
  console.log('SDK示例运行完成');
}

// 在Node.js环境中直接运行，在浏览器环境中可以绑定到按钮点击事件等
if (typeof window === 'undefined') {
  runExamples().catch(console.error);
}