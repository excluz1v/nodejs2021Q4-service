"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const uuid_1 = require("uuid");
class Task {
    constructor({ id = (0, uuid_1.v4)(), title = '', order = 0, description = '', userId = '', boardId = (0, uuid_1.v4)(), columnId = '', } = {}) {
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