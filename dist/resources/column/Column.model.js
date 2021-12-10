"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const uuid_1 = require("uuid");
class Column {
    constructor({ id = (0, uuid_1.v4)(), title = '', order = 0 }) {
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