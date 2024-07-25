"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bearerToken_1 = require("../middlewares/bearerToken");
const validateSchema_1 = require("../middlewares/validateSchema");
const auth_controller_1 = require("../controller/auth.controller");
const task_controller_1 = require("../controller/task.controller");
const UserSchema_1 = require("../schemas/UserSchema");
const router = (0, express_1.Router)();
router.post('/register', (0, validateSchema_1.validateSchema)(UserSchema_1.UserRegisterSchema), auth_controller_1.registerUser);
router.post('/login', (0, validateSchema_1.validateSchema)(UserSchema_1.UserLoginSchema), auth_controller_1.loginUser);
router.post('/auth', bearerToken_1.authToken, auth_controller_1.validarToken);
router.route('/tasks')
    .get(bearerToken_1.authToken, task_controller_1.getAllTasks);
exports.default = router;
//# sourceMappingURL=api.routes.js.map