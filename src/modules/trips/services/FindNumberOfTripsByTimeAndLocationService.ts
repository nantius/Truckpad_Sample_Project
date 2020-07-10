import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { isBefore } from 'date-fns';
import IListTripsByTimeAndLocationDTO from '../dtos/IListTripsByTimeAndLocationDTO';
import ITripsRepository from '../repositories/ITripsRepository';
import ILocationsRepository from '../repositories/ILocationsRepository';

@injectable()
class FindNumberOfTripsByTimeAndLocationService {
  constructor(
    @inject('TripsRepository')
    private tripsRepository: ITripsRepository,

    @inject('LocationsRepository')
    private locationRepository: ILocationsRepository,
  ) {}

  public async execute(data: IListTripsByTimeAndLocationDTO): Promise<number> {
    const { locationId, startDate, endDate } = data;

    const location = await this.locationRepository.findByUuid(locationId);

    if (!location) {
      throw new AppError('Location does not exist');
    }

    if (!isBefore(startDate, endDate)) {
      throw new AppError('startDate must come before endDate');
    }

    const numberOfTrips = await this.tripsRepository.findNumberOfTripsByTimeAndLocation(
      data,
    );
    return numberOfTrips;
  }
}
export default FindNumberOfTripsByTimeAndLocationService;
