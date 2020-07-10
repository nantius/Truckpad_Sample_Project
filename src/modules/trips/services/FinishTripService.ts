import { injectable, inject } from 'tsyringe';
import Trip from '@modules/trips/infra/typeorm/entities/Trip';
import AppError from '@shared/errors/AppError';
import { isBefore } from 'date-fns';
import ITripsRepository from '../repositories/ITripsRepository';

interface IRequestDTO {
  tripId: string;
  finishDate: Date;
}

@injectable()
class FinishTripService {
  constructor(
    @inject('TripsRepository')
    private tripsRepository: ITripsRepository,
  ) {}

  public async execute({ tripId, finishDate }: IRequestDTO): Promise<Trip> {
    const trip = await this.tripsRepository.findByUuid(tripId);
    if (!trip) {
      throw new AppError('Trip does not exist.');
    }
    if (isBefore(finishDate, trip.startDateTime)) {
      throw new AppError('finishDate must come after startDate');
    }

    trip.endDateTime = finishDate;
    const finishedTrip = await this.tripsRepository.save(trip);
    return finishedTrip;
  }
}
export default FinishTripService;
