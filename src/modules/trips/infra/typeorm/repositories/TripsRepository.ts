import { getRepository, Repository } from 'typeorm';
import ITripsRepository from '@modules/trips/repositories/ITripsRepository';
import ICreateTripDTO from '@modules/trips/dtos/ICreateTripDTO';
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
}

export default TripsRepository;
