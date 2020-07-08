import { getRepository, Repository, createQueryBuilder } from 'typeorm';
import Location from '@modules/trips/infra/typeorm/entities/Location';
import ILocationsRepository from '@modules/trips/repositories/ILocationsRepository';
import ICreateLocationDTO from '@modules/trips/dtos/ICreateLocationDTO';
import IListLocationsByTypeDTO from '@modules/trips/dtos/IListLocationsByTypeDTO';

class LocationsRepository implements ILocationsRepository {
  private ormRepository: Repository<Location>;

  constructor() {
    this.ormRepository = getRepository(Location);
  }

  public async findByUuid(uuid: string): Promise<Location | undefined> {
    const location = await this.ormRepository.findOne(uuid);
    return location;
  }

  public async create(locationData: ICreateLocationDTO): Promise<Location> {
    const location = this.ormRepository.create(locationData);

    await this.ormRepository.save(location);
    return location;
  }

  public async save(location: Location): Promise<Location> {
    return this.ormRepository.save(location);
  }

  public async listByType(): Promise<IListLocationsByTypeDTO> {
    const findQueryOrigins = await createQueryBuilder(Location, 'location')
      .innerJoin(
        'location.tripsAsOrigin',
        'trip',
        'trip."startLocationId" = location.uuid',
      )
      .getMany();

    const findQueryDestinations = await createQueryBuilder(Location, 'location')
      .innerJoin(
        'location.tripsAsDestination',
        'trip',
        'trip."endLocationId" = location.uuid',
      )
      .getMany();

    return {
      origin: findQueryOrigins,
      destination: findQueryDestinations,
    };
  }
}

export default LocationsRepository;
