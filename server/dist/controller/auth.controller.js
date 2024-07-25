"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarToken = exports.loginUser = exports.registerUser = void 0;
const hash_1 = require("../services/hash");
const jwt_1 = require("../services/jwt");
const auth_1 = require("../services/auth");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, password, email, birthday } = req.body;
        const user = yield (0, auth_1.findOneBy)({ username, email });
        if (user)
            return res.status(400).json({ message: 'User is register' });
        const resp = yield (0, auth_1.createOne)({ name, birthday, email, password, username });
        return res.json(resp);
    }
    catch (error) {
        return res.json({ message: 'Server error' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const user = yield (0, auth_1.findOneBy)({ username, email });
    if (!user)
        return res.status(404).json({ message: 'User not found!' });
    const isValid = yield (0, hash_1.validatePass)(password, user.password);
    if (!isValid)
        return res.status(403).json({ message: 'Invalid Auth' });
    const token = (0, jwt_1.generateToken)({ id: user.id });
    return res.json({ token });
});
exports.loginUser = loginUser;
const validarToken = (req, res) => res.status(204);
exports.validarToken = validarToken;
//# sourceMappingURL=auth.controller.js.map