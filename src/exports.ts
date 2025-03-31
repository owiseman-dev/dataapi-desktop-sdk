/**
 * 导出所有模块和类型
 */

// 核心类型和错误
export { ApiError } from './core/api-error';
export { BaseModule } from './core/base-module';

// 主客户端
export { DataAPIClient, DataAPIClientOptions } from './index';

// 用户认证模块
export {
  AuthModule,
  UserInfo,
  LoginParams,
  LoginResponse,
  RegisterParams,
  ResetPasswordParams,
  UpdatePasswordParams
} from './modules/auth';

// 存储管理模块
export {
  StorageModule,
  FileInfo,
  UploadOptions,
  DownloadOptions,
  ListFilesParams,
  ListFilesResponse
} from './modules/storage';

// 数据库管理模块
export {
  DatabaseModule,
  QueryParams,
  PageResponse,
  DatabaseResult,
  Transaction
} from './modules/database';

// 网关管理模块
export {
  GatewayModule,
  GatewayRoute,
  GatewayService,
  GatewayStatus,
  CreateRouteParams,
  CreateServiceParams
} from './modules/gateway';

// 插件管理模块
export {
  PluginModule,
  PluginInfo,
  InstallPluginParams,
  PluginConfig,
  PluginEvent
} from './modules/plugin';

// 知识库管理模块
export {
  KnowledgeModule,
  KnowledgeBase,
  Document,
  SearchResult,
  CreateKnowledgeBaseParams,
  CreateDocumentParams,
  SearchParams
} from './modules/knowledge';

// 流程管理模块
export {
  WorkflowModule,
  WorkflowDefinition,
  WorkflowTask,
  WorkflowTrigger,
  WorkflowInstance,
  WorkflowTaskInstance,
  CreateWorkflowParams,
  ExecuteWorkflowParams
} from './modules/workflow';