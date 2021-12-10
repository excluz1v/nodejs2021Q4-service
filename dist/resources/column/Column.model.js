"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const uuid_1 = __importDefault(require("uuid"));
class Column {
    constructor({ id = uuid_1.default.v4(), title = '', order = 0 }) {
        this.id = id;
        this.title = title;
        this.order = order;
    }
    id;
    title;
    order;
}
exports.Column = Column;
//# sourceMappingURL=Column.model.js.map