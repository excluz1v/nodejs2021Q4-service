import { MigrationInterface, QueryRunner } from 'typeorm';
import bcrypt from 'bcrypt';

export class PostRefactoring1642325483900 implements MigrationInterface {
  name?: string | undefined;

  async down(queryRunner: QueryRunner): Promise<this> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "columns" DROP CONSTRAINT "FK_3f88407849daf390e93035b15ef"`,
    );
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "board"`);
    await queryRunner.query(`DROP TABLE "columns"`);
    return this;
  }

  async up(queryRunner: QueryRunner): Promise<this> {
    await queryRunner.query(
      `CREATE TABLE "columns" (
        "id" character varying NOT NULL, 
        "order" integer NOT NULL, 
        "title" character varying(100) NOT NULL, 
        "board_id" character varying, CONSTRAINT 
        "PK_4ac339ccbbfed1dcd96812abbd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "board" (
      "id" character varying NOT NULL, 
      "title" character varying(100) NOT NULL, 
      CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" (
      "id" character varying NOT NULL,
      "name" character varying(50) NOT NULL, 
      "login" character varying(50) NOT NULL, 
      "password" character varying NOT NULL, 
      CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    // creating admin
    const adminPasswordWithHash: string = bcrypt.hashSync('admin', 10);
    await queryRunner.query(
      `INSERT INTO "user" (name, login, password, id) VALUES ('admin', 'admin', '${adminPasswordWithHash}', '1');`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" (
      "id" character varying NOT NULL,
      "title" character varying(100) NOT NULL,
      "order" integer NOT NULL, 
      "description" text NOT NULL,
      "userId" character varying, 
      "boardId" character varying NOT NULL,
      "columnId" text, 
      CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "columns" ADD CONSTRAINT "FK_3f88407849daf390e93035b15ef" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    return this;
  }
}
