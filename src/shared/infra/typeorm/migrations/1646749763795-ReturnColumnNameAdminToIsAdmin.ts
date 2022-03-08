import { MigrationInterface, QueryRunner } from "typeorm";

export class ReturnColumnNameAdminToIsAdmin1646749763795
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("users", "admin", "isAdmin");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("users", "isAdmin", "admin");
  }
}
