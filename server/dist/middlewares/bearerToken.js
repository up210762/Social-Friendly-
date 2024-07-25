"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../keys");
function authToken(req, res, next) {
    var _a;
    try {
        const authHeader = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer'))) {
            return res.status(401).json({ message: 'Invalit prefix Token' });
        }
        const token = authHeader
            ? authHeader.split(' ')[1]
            : undefined;
        if (!token) {
            return res.status(401).json({ message: 'Authentication Error' });
        }
        const user = jsonwebtoken_1.default.verify(token, keys_1.JWT_SECRET);
        req.user = Object.assign({}, user);
        return next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(403).json({ message: 'Invalid Token!' });
        }
        return res.status(400).json({ message: 'Error in the files' });
    }
}
exports.authToken = authToken;
//# sourceMappingURL=bearerToken.js.map