"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const board_model_1 = require("./board.model");
const user_model_1 = require("./user.model");
let Task = class Task extends typeorm_1.BaseEntity {
    constructor(title, order, description, columnId, board, user, boardId = '', userId = null) {
        super();
        this.id = (0, uuid_1.v4)();
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.user = user;
        this.boardId = boardId;
        this.columnId = columnId;
        this.board = board;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Task.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, (task) => task.id, {
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_model_1.default)
], Task.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Task.prototype, "boardId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => board_model_1.default, (board) => board.id, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'boardId' }),
    __metadata("design:type", board_model_1.default)
], Task.prototype, "board", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Task.prototype, "columnId", void 0);
Task = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, Number, String, String, board_model_1.default,
        user_model_1.default, Object, String])
], Task);
exports.default = Task;
//# sourceMappingURL=task.model.js.map