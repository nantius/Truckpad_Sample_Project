import { injectable, inject } from 'tsyringe';
import Location from '@modules/trips/infra/typeorm/entities/Location';
import ILocationsRepository from '../repositories/ILocationsRepository';

interface IRequestDTO {
  latitude: string;
  longitude: string;
}

@injectable()
class CreateLocationService {
  constructor(
    @inject('LocationsRepository')
    private locationsRepository: ILocationsRepository,
  ) {}

  public async execute(locationData: IRequestDTO): Promise<Location> {
    const location = await this.locationsRepository.create(locationData);
    return location;
  }
}
export default CreateLocationService;
