"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const uuid_1 = __importDefault(require("uuid"));
const Column_model_1 = require("../column/Column.model");
class Board {
    constructor({ id = uuid_1.default.v4(), title, columns }) {
        this.id = id;
        this.title = title;
        this.columns = Board.createColumn(columns);
    }
    id;
    title;
    columns;
    static createColumn(ArrOfColumns) {
        return [...ArrOfColumns].map((col) => new Column_model_1.Column(col));
    }
}
exports.Board = Board;
//# sourceMappingURL=board.model.js.map