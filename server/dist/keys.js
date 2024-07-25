"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.DB_PASS = exports.DB_USER = exports.DB_PORT = exports.DB_HOST = exports.DB_NAME = exports.PORT = exports.NODE_ENV = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.NODE_ENV = process.env.NODE_ENV;
exports.PORT = +process.env.PORT || 3000;
exports.DB_NAME = process.env.DB_NAME || 'dbTodoApp';
exports.DB_HOST = process.env.DB_HOST || 'localhost';
exports.DB_PORT = +process.env.DB_PORT || 3306;
exports.DB_USER = process.env.DB_USER || 'd2023f';
exports.DB_PASS = process.env.DB_PASS || 'RG-1905032119050321';
exports.JWT_SECRET = process.env.JWT_SERCRET || 'This is a test!';
//# sourceMappingURL=keys.js.map