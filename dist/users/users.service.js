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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcryptjs");
const typeorm_2 = require("@nestjs/typeorm");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    hashPassword(pass) {
        return bcrypt.hashSync(pass, 10);
    }
    async createUser(dto) {
        const { name, login } = dto;
        const password = this.hashPassword(dto.password);
        const user = await this.userRepository.save({ name, login, password });
        const result = new user_entity_1.UserEntity(user);
        return result;
    }
    async getAllusers() {
        const users = await this.userRepository.find();
        return users.map((user) => new user_entity_1.UserEntity(user));
    }
    async getSingleUser(userId) {
        const user = await this.userRepository.findOne(userId);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        const result = new user_entity_1.UserEntity(user);
        return result;
    }
    async update(userId, updateuserDto) {
        const user = await this.getSingleUser(userId);
        let { password } = updateuserDto;
        const { name, login } = updateuserDto;
        if (password) {
            password = this.hashPassword(password);
        }
        let updatedUser = Object.assign(user, { password, name, login });
        updatedUser = await this.userRepository.save(updatedUser);
        return new user_entity_1.UserEntity(updatedUser);
    }
    async del(userId) {
        const user = await this.getSingleUser(userId);
        if (user) {
            await this.userRepository.delete({
                id: userId,
            });
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map