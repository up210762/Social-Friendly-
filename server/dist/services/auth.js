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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOne = exports.findOneBy = void 0;
const hash_1 = require("./hash");
const tempo_1 = require("@formkit/tempo");
const db_1 = __importDefault(require("../db"));
const findOneBy = ({ email, username }) => __awaiter(void 0, void 0, void 0, function* () {
    const SQL = `
    SELECT id, password FROM TR_USER WHERE username = ? OR email = ?;
  `;
    const [rows] = yield db_1.default.query(SQL, [username, email]);
    const [user] = rows;
    return user;
});
exports.findOneBy = findOneBy;
const createOne = ({ birthday, email, name, password, username }) => __awaiter(void 0, void 0, void 0, function* () {
    const SQL = `
    INSERT INTO TR_USER (name, username, password, email, birthday, createdDate)
      VALUES(?,?,?,?,?, NOW());
  `;
    const newPassword = yield (0, hash_1.encryptPass)(password);
    const formatBirthday = (0, tempo_1.format)(birthday, 'YYYY-MM-DD', 'en');
    const [resp] = yield db_1.default.execute(SQL, [name, username, newPassword, email, formatBirthday]);
    return resp;
});
exports.createOne = createOne;
//# sourceMappingURL=auth.js.map