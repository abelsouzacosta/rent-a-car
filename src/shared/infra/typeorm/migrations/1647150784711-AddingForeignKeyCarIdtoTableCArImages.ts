import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddingForeignKeyCarIdtoTableCArImages1647150784711
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "cars_images",
      new TableForeignKey({
        name: "CarConstraint",
        columnNames: ["car_id"],
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("cars_images", "CarConstraint");
  }
}
