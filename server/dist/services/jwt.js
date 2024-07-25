"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const keys_1 = require("../keys");
const generateToken = (payload) => (0, jsonwebtoken_1.sign)(payload, keys_1.JWT_SECRET, {
    expiresIn: '1d'
});
exports.generateToken = generateToken;
const validateToken = (token) => (0, jsonwebtoken_1.verify)(token, keys_1.JWT_SECRET);
exports.validateToken = validateToken;
//# sourceMappingURL=jwt.js.map