import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateRentals1640871398065 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rentals",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "start_date", type: "timestamp", default: "now()" },
          { name: "end_date", type: "timestamp" },
          { name: "expect_return_date", type: "timestamp" },
          { name: "total", type: "numeric" },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp" },
          { name: "car_id", type: "uuid" },
          { name: "user_id", type: "uuid" },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "rentals",
      new TableForeignKey({
        name: "FKCar",
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        columnNames: ["car_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "rentals",
      new TableForeignKey({
        name: "FKUser",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("rentals", "FKUser");
    await queryRunner.dropForeignKey("rentals", "FKCar");
    await queryRunner.dropTable("rentals");
  }
}
