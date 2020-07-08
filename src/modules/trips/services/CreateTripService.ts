import { injectable, inject } from 'tsyringe';
import Trip from '@modules/trips/infra/typeorm/entities/Trip';
import IDriversRepository from '@modules/drivers/repositories/IDriversRepository';
import AppError from '@shared/errors/AppError';
import ILocationsRepository from '../repositories/ILocationsRepository';
import ITripsRepository from '../repositories/ITripsRepository';

interface IRequestDTO {
  driverId: string;
  startLocationId: string;
  endLocationId: string;
  startDateTime: Date;
}

@injectable()
class CreateTripService {
  constructor(
    @inject('TripsRepository')
    private tripsRepository: ITripsRepository,

    @inject('DriversRepository')
    private driversRepository: IDriversRepository,

    @inject('LocationsRepository')
    private locationsRepository: ILocationsRepository,
  ) {}

  public async execute(tripData: IRequestDTO): Promise<Trip | undefined> {
    if (tripData.startLocationId === tripData.endLocationId) {
      throw new AppError(
        'Starting location cannot be the same as the destination location',
      );
    }

    const driver = await this.driversRepository.findByUuid(tripData.driverId);
    if (!driver) {
      throw new AppError('Driver does not exist');
    }

    const startLocation = await this.locationsRepository.findByUuid(
      tripData.startLocationId,
    );
    if (!startLocation) {
      throw new AppError('Location does not exist');
    }

    const endLocation = await this.locationsRepository.findByUuid(
      tripData.endLocationId,
    );
    if (!endLocation) {
      throw new AppError('Location does not exist');
    }

    const trip = await this.tripsRepository.create(tripData);
    return trip;
  }
}
export default CreateTripService;
