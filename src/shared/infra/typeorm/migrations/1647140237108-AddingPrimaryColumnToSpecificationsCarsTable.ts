import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddingPrimaryColumnToSpecificationsCarsTable1647140237108
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "specifications_cars",
      new TableColumn({
        name: "id",
        type: "uuid",
        isPrimary: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropPrimaryKey("specifications_cars");
    await queryRunner.dropColumn("specifications_cars", "id");
  }
}
