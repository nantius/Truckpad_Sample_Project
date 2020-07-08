import { injectable, inject } from 'tsyringe';
import Trip from '@modules/trips/infra/typeorm/entities/Trip';
import IDriversRepository from '@modules/drivers/repositories/IDriversRepository';
import AppError from '@shared/errors/AppError';
import ITripsRepository from '../repositories/ITripsRepository';

interface IRequestDTO {
  driverId: string;
}

@injectable()
class FindTripsByDriverService {
  constructor(
    @inject('TripsRepository')
    private tripsRepository: ITripsRepository,

    @inject('DriversRepository')
    private driversRepository: IDriversRepository,
  ) {}

  public async execute({ driverId }: IRequestDTO): Promise<Trip[] | undefined> {
    const driver = await this.driversRepository.findByUuid(driverId);
    if (!driver) {
      throw new AppError('Driver does not exist.');
    }

    const trips = await this.tripsRepository.findTripsByDriver(driverId);
    return trips;
  }
}
export default FindTripsByDriverService;
