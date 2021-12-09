"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = __importDefault(require("uuid"));
const uuidv4 = uuid_1.default.v4();
class User {
    name;
    login;
    password;
    id;
    constructor({ id = uuidv4, name = '', login = '', password = '' } = {}) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
    }
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map