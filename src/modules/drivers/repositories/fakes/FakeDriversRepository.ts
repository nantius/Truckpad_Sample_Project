import { uuid as uuidv4 } from 'uuidv4';
import Driver from '@modules/drivers/infra/typeorm/entities/Driver';
import ICreateDriverDTO from '@modules/drivers/dtos/ICreateDriverDTO';
import IDriversRepository from '../IDriversRepository';

class FakeDriversRepository implements IDriversRepository {
  private drivers: Driver[] = [];

  public async findByUuid(uuid: string): Promise<Driver | undefined> {
    const findDriver = this.drivers.find(driver => driver.uuid === uuid);

    return findDriver;
  }

  public async create(driverData: ICreateDriverDTO): Promise<Driver> {
    const driver = new Driver();

    Object.assign(driver, { uuid: uuidv4() }, driverData);
    this.drivers.push(driver);
    return driver;
  }

  public async save(driver: Driver): Promise<Driver> {
    const findIndex = this.drivers.findIndex(
      findDriver => findDriver.uuid === driver.uuid,
    );
    this.drivers[findIndex] = driver;
    return driver;
  }

  public async findDriversWithoutCargo(): Promise<Driver[]> {
    const driversNoCargo = this.drivers.filter(
      driver => driver.isLoaded === false,
    );

    return driversNoCargo;
  }

  public async findNumberOfDriversWithOwnVehicle(): Promise<number> {
    const driversWithOwnVehicle = this.drivers.filter(
      driver => driver.hasOwnVehicle === true,
    );

    return driversWithOwnVehicle.length;
  }
}

export default FakeDriversRepository;
