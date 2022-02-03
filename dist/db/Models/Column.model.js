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
const uuid_1 = require("uuid");
const typeorm_1 = require("typeorm");
let Columns = class Columns extends typeorm_1.BaseEntity {
    constructor(order, title, board) {
        super();
        this.id = (0, uuid_1.v4)();
        this.order = order;
        this.title = title;
        this.board = board;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Columns.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Columns.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
    }),
    __metadata("design:type", String)
], Columns.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Board', 'board', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'board_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], Columns.prototype, "board", void 0);
Columns = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Number, String, Object])
], Columns);
exports.default = Columns;
//# sourceMappingURL=Column.model.js.map