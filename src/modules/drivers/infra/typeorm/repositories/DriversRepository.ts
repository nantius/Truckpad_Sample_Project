import { getRepository, Repository } from 'typeorm';
import Driver from '@modules/drivers/infra/typeorm/entities/Driver';
import IDriversRepository from '@modules/drivers/repositories/IDriversRepository';
import ICreateDriverDTO from '@modules/drivers/dtos/ICreateDriverDTO';

class DriversRepository implements IDriversRepository {
  private ormRepository: Repository<Driver>;

  constructor() {
    this.ormRepository = getRepository(Driver);
  }

  public async findByUuid(uuid: string): Promise<Driver | undefined> {
    const driver = await this.ormRepository.findOne(uuid);
    return driver;
  }

  public async create(driverData: ICreateDriverDTO): Promise<Driver> {
    const driver = this.ormRepository.create(driverData);

    await this.ormRepository.save(driver);
    return driver;
  }

  public async save(driver: Driver): Promise<Driver> {
    return this.ormRepository.save(driver);
  }

  public async noCargo(): Promise<Driver[]> {
    return this.ormRepository.find({ where: { isLoaded: false } });
  }
}

export default DriversRepository;
