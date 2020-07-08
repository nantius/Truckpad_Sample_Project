import { uuid as uuidv4 } from 'uuidv4';
import Location from '@modules/trips/infra/typeorm/entities/Location';
import ICreateLocationDTO from '@modules/trips/dtos/ICreateLocationDTO';
import ILocationsRepository from '../ILocationsRepository';

class FakeLocationsRepository implements ILocationsRepository {
  private locations: Location[] = [];

  public async findByUuid(uuid: string): Promise<Location | undefined> {
    const findDriver = this.locations.find(location => location.uuid === uuid);
    return findDriver;
  }

  public async create(locationData: ICreateLocationDTO): Promise<Location> {
    const location = new Location();

    Object.assign(location, { uuid: uuidv4() }, locationData);
    this.locations.push(location);
    return location;
  }

  public async save(location: Location): Promise<Location> {
    const findIndex = this.locations.findIndex(
      findLocation => findLocation.uuid === location.uuid,
    );
    this.locations[findIndex] = location;
    return location;
  }
}

export default FakeLocationsRepository;
