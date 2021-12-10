"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    name;
    login;
    password;
    id;
    constructor({ id = (0, uuid_1.v4)(), name = '', login = '', password = '' } = {}) {
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