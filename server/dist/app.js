"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const node_path_1 = require("node:path");
const fs_1 = require("fs");
const keys_1 = require("./keys");
const routes_1 = __importDefault(require("./routes/routes"));
const api_routes_1 = __importDefault(require("./routes/api.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
if (['dev', 'test'].includes(keys_1.NODE_ENV)) {
    app.use((0, morgan_1.default)('dev'));
}
else {
    app.use((0, morgan_1.default)('combined', {
        stream: (0, fs_1.createWriteStream)((0, node_path_1.join)(__dirname, 'log', 'access.log')),
    }));
    app.use((0, morgan_1.default)('combined', {
        skip: (_, res) => res.statusCode < 400,
        stream: (0, fs_1.createWriteStream)((0, node_path_1.join)(__dirname, 'log', 'error.log')),
    }));
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(routes_1.default);
app.use('/api', api_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map