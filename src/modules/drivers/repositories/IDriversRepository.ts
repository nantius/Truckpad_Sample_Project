import Driver from '@modules/drivers/infra/typeorm/entities/Driver';
import ICreateDriverDTO from '@modules/drivers/dtos/ICreateDriverDTO';

export default interface IDriversRepository {
  findByUuid(uuid: string): Promise<Driver | undefined>;
  create(data: ICreateDriverDTO): Promise<Driver>;
  save(driver: Driver): Promise<Driver>;
  findDriversWithoutCargo(): Promise<Driver[]>;
  findNumberOfDriversWithOwnVehicle(): Promise<number>;
}
