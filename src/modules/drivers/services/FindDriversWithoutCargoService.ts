import { injectable, inject } from 'tsyringe';
import Driver from '@modules/drivers/infra/typeorm/entities/Driver';
import IDriversRepository from '../repositories/IDriversRepository';

@injectable()
class FindDriversWithoutCargoService {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository,
  ) {}

  public async execute(): Promise<Driver[]> {
    const drivers = await this.driversRepository.findDriversWithoutCargo();
    return drivers;
  }
}
export default FindDriversWithoutCargoService;
