import { injectable, inject } from 'tsyringe';
import LocationsRepository from '../infra/typeorm/repositories/LocationsRepository';
import IListLocationsByTypeDTO from '../dtos/IListLocationsByTypeDTO';

@injectable()
class FindLocationsByTypeService {
  constructor(
    @inject('LocationsRepository')
    private locationsRepository: LocationsRepository,
  ) {}

  public async execute(): Promise<IListLocationsByTypeDTO> {
    const locations = await this.locationsRepository.listByType();
    return locations;
  }
}
export default FindLocationsByTypeService;
