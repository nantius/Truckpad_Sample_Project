import { injectable, inject } from 'tsyringe';
import IDriversRepository from '../repositories/IDriversRepository';

@injectable()
class FindNumberOfDriversWithOwnVehicleService {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository,
  ) {}

  public async execute(): Promise<number> {
    const drivers_count = await this.driversRepository.findNumberOfDriversWithOwnVehicle();
    return drivers_count;
  }
}
export default FindNumberOfDriversWithOwnVehicleService;
