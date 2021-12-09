"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const uuid_1 = __importDefault(require("uuid"));
const uuidv4 = uuid_1.default.v4();
class Task {
    constructor({ id = uuidv4, title = '', order = 0, description = '', userId = '', boardId = uuidv4, columnId = '', } = {}) {
        this.id = id;
        this.title = title;
        this.columnId = columnId;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
    }
    id;
    title;
    order;
    description;
    userId;
    boardId;
    columnId;
    static toResponse(task) {
        const { id, title, order, description, userId } = task;
        return { id, title, order, description, userId };
    }
}
exports.Task = Task;
//# sourceMappingURL=task.model.js.map