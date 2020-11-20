import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUserIsActiveColumn1599288376295 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'active',
            type: 'boolean',
            default: true,
            isNullable: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'active')
    }

}
