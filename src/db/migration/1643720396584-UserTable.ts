import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class UserTable1643720396584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
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
            isUnique: true,
          },
          {
            name: 'password',
            type: 'text',
          },
        ],
      }),
      true,
    );

    const adminPsswordHash = bcrypt.hashSync('admin', 10);

    await queryRunner.query(
      `INSERT INTO "user" (name, login, password) VALUES ($1, $1, $2);`,
      ['admin', adminPsswordHash],
    );
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('user');
  }
}
