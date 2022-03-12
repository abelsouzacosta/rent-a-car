import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddingForeignKeysToSpecificationsCars1647121740192
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys("specifications_cars", [
      new TableForeignKey({
        name: "SpecificationId",
        columnNames: ["specification_id"],
        referencedTableName: "specifications",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      }),

      new TableForeignKey({
        name: "CarId",
        columnNames: ["car_id"],
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("specifications_cars", "SpecificationId");
    await queryRunner.dropForeignKey("specifications_cars", "CarId");
  }
}
