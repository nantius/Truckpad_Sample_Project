import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import VehicleType from '@modules/drivers/infra/typeorm/entities/VehicleType';
import VehicleTypeSeeds from '../seeds/VehicleTypeSeeds';

export default class SeedVehicleTypes1593961987204
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository(VehicleType).save(VehicleTypeSeeds);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'delete from "vehicle_types" where id IN (1, 2, 3, 4, 5)',
    );
  }
}
