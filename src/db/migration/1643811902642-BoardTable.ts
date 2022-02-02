import { MigrationInterface, QueryRunner } from 'typeorm';

export class BoardTable1643811902642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "board" (
      "id" character varying NOT NULL, 
      "title" character varying(100) NOT NULL, 
      CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('board');
  }
}
