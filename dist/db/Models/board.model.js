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
const Column_model_1 = require("./Column.model");
let Board = class Board extends typeorm_1.BaseEntity {
    constructor(title, columns) {
        super();
        this.id = (0, uuid_1.v4)();
        this.title = title;
        this.columns = columns;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Board.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
    }),
    __metadata("design:type", String)
], Board.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Column_model_1.default, (columns) => columns.board),
    __metadata("design:type", Array)
], Board.prototype, "columns", void 0);
Board = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, Array])
], Board);
exports.default = Board;
//# sourceMappingURL=board.model.js.map