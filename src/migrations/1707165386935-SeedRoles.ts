import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedRoles1707165386935 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO role (name) VALUES ('Admin'), ('User')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DELETE FROM role WHERE name IN ('Admin', 'User')`);
    }
}