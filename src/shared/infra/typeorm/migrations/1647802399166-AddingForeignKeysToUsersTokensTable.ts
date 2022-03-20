import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddingForeignKeysToUsersTokensTable1647802399166
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users_tokens",
      new TableColumn({
        name: "user_id",
        type: "uuid",
        isNullable: false,
      })
    );

    await queryRunner.createForeignKey(
      "users_tokens",
      new TableForeignKey({
        name: "UserIdForeignKey",
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("users_tokens", "UserIdForeignKey");
    await queryRunner.dropColumn("users_tokens", "user_id");
  }
}
