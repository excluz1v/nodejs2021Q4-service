"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTable1643720396584 = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcryptjs");
class UserTable1643720396584 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'name',
                    type: 'text',
                },
                {
                    name: 'login',
                    type: 'text',
                },
                {
                    name: 'password',
                    type: 'text',
                },
            ],
        }), true);
        const adminPsswordHash = bcrypt.hashSync('admin', 10);
        await queryRunner.query(`INSERT INTO "user" (name, login, password) VALUES ($1, $1, $2);`, ['admin', adminPsswordHash]);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('user');
    }
}
exports.UserTable1643720396584 = UserTable1643720396584;
//# sourceMappingURL=1643720396584-UserTable.js.map