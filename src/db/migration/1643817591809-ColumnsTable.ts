import { MigrationInterface, QueryRunner } from 'typeorm';

export class ColumnsTable1643817591809 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.query(
      `CREATE TABLE "columns" (
        "id" character varying NOT NULL, 
        "order" integer NOT NULL, 
        "title" character varying(100) NOT NULL, 
        "board_id" character varying, CONSTRAINT 
        "PK_4ac339ccbbfed1dcd96812abbd5" PRIMARY KEY ("id"))`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "columns" DROP CONSTRAINT "FK_3f88407849daf390e93035b15ef"`,
    );
    await queryRunner.dropTable('columns');
  }
}
