"use strict";
/**
 * 导出所有模块和类型
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowModule = exports.KnowledgeModule = exports.PluginModule = exports.GatewayModule = exports.DatabaseModule = exports.StorageModule = exports.AuthModule = exports.DataAPIClient = exports.BaseModule = exports.ApiError = void 0;
// 核心类型和错误
var api_error_1 = require("./core/api-error");
Object.defineProperty(exports, "ApiError", { enumerable: true, get: function () { return api_error_1.ApiError; } });
var base_module_1 = require("./core/base-module");
Object.defineProperty(exports, "BaseModule", { enumerable: true, get: function () { return base_module_1.BaseModule; } });
// 主客户端
var index_1 = require("./index");
Object.defineProperty(exports, "DataAPIClient", { enumerable: true, get: function () { return index_1.DataAPIClient; } });
// 用户认证模块
var auth_1 = require("./modules/auth");
Object.defineProperty(exports, "AuthModule", { enumerable: true, get: function () { return auth_1.AuthModule; } });
// 存储管理模块
var storage_1 = require("./modules/storage");
Object.defineProperty(exports, "StorageModule", { enumerable: true, get: function () { return storage_1.StorageModule; } });
// 数据库管理模块
var database_1 = require("./modules/database");
Object.defineProperty(exports, "DatabaseModule", { enumerable: true, get: function () { return database_1.DatabaseModule; } });
// 网关管理模块
var gateway_1 = require("./modules/gateway");
Object.defineProperty(exports, "GatewayModule", { enumerable: true, get: function () { return gateway_1.GatewayModule; } });
// 插件管理模块
var plugin_1 = require("./modules/plugin");
Object.defineProperty(exports, "PluginModule", { enumerable: true, get: function () { return plugin_1.PluginModule; } });
// 知识库管理模块
var knowledge_1 = require("./modules/knowledge");
Object.defineProperty(exports, "KnowledgeModule", { enumerable: true, get: function () { return knowledge_1.KnowledgeModule; } });
// 流程管理模块
var workflow_1 = require("./modules/workflow");
Object.defineProperty(exports, "WorkflowModule", { enumerable: true, get: function () { return workflow_1.WorkflowModule; } });
//# sourceMappingURL=exports.js.map