import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddingForeignKeysToRentalsTable1647314396567
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "rentals",
      new TableColumn({
        name: "car_id",
        type: "uuid",
        isNullable: false,
      })
    );

    await queryRunner.addColumn(
      "rentals",
      new TableColumn({
        name: "user_id",
        type: "uuid",
        isNullable: false,
      })
    );

    await queryRunner.createForeignKey(
      "rentals",
      new TableForeignKey({
        name: "CarId",
        columnNames: ["car_id"],
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "rentals",
      new TableForeignKey({
        name: "UserId",
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("rentals", "UserId");
    await queryRunner.dropForeignKey("rentals", "CarId");

    await queryRunner.dropColumn("rentals", "user_id");
    await queryRunner.dropColumn("rentals", "car_id");
  }
}
