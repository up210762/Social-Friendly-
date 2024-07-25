"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginSchema = exports.UserRegisterSchema = void 0;
const zod_1 = require("zod");
exports.UserRegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(10).max(50),
    username: zod_1.z.string().min(5).max(20),
    password: zod_1.z.string().min(4),
    email: zod_1.z.string().email(),
    birthday: zod_1.z.coerce.date()
});
exports.UserLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    username: zod_1.z.string().min(5).max(20).optional(),
    password: zod_1.z.string().min(4)
});
//# sourceMappingURL=UserSchema.js.map