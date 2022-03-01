import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddColumnCategoryIdToCarsTable1646100869436
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // adds column
    await queryRunner.addColumn(
      "cars",
      new TableColumn({
        name: "category_id",
        type: "uuid",
        isNullable: false,
      })
    );
    // adds foreign key constraint
    await queryRunner.createForeignKey(
      "cars",
      new TableForeignKey({
        name: "CarCategoryId",
        columnNames: ["category_id"],
        referencedTableName: "categories",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // removes constraint
    await queryRunner.dropForeignKey("cars", "CarCategoryId");
    // removes column
    await queryRunner.dropColumn("cars", "category_id");
  }
}
