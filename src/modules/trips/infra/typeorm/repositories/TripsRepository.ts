import { getRepository, Repository } from 'typeorm';
import ITripsRepository from '@modules/trips/repositories/ITripsRepository';
import ICreateTripDTO from '@modules/trips/dtos/ICreateTripDTO';
import IListTripsByTimeAndLocationDTO from '@modules/trips/dtos/IListTripsByTimeAndLocationDTO';
import Trip from '../entities/Trip';

class TripsRepository implements ITripsRepository {
  private ormRepository: Repository<Trip>;

  constructor() {
    this.ormRepository = getRepository(Trip);
  }

  public async findByUuid(uuid: string): Promise<Trip | undefined> {
    const trip = await this.ormRepository.findOne(uuid);
    return trip;
  }

  public async create(tripData: ICreateTripDTO): Promise<Trip> {
    const trip = this.ormRepository.create(tripData);

    await this.ormRepository.save(trip);
    return trip;
  }

  public async save(trip: Trip): Promise<Trip> {
    return this.ormRepository.save(trip);
  }

  public async findTripsByDriver(
    driverId: string,
  ): Promise<Trip[] | undefined> {
    return this.ormRepository.find({ where: { driverId } });
  }

  public async findNumberOfTripsByTimeAndLocation(
    data: IListTripsByTimeAndLocationDTO,
  ): Promise<number> {
    const startTripCount = await this.ormRepository
      .createQueryBuilder()
      .from(Trip, 'trip')
      .where(
        `(trip.startLocationId = :id) AND (trip.startDateTime >= :startDate AND trip.startDateTime <= :endDate ) `,
        {
          id: data.locationId,
          startDate: data.startDate,
          endDate: data.endDate,
        },
      )
      .getCount();

    const endTripCount = await this.ormRepository
      .createQueryBuilder()
      .from(Trip, 'trip')
      .where(
        `(trip.endLocationId = :id) AND (trip.endDateTime >= :startDate AND trip.endDateTime <= :endDate ) `,
        {
          id: data.locationId,
          startDate: data.startDate,
          endDate: data.endDate,
        },
      )
      .getCount();

    return startTripCount + endTripCount;
  }
}

export default TripsRepository;
