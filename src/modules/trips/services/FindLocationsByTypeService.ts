import { injectable, inject } from 'tsyringe';
import IListLocationsByTypeDTO from '../dtos/IListLocationsByTypeDTO';
import ILocationsRepository from '../repositories/ILocationsRepository';

@injectable()
class FindLocationsByTypeService {
  constructor(
    @inject('LocationsRepository')
    private locationsRepository: ILocationsRepository,
  ) {}

  public async execute(): Promise<IListLocationsByTypeDTO> {
    const locations = await this.locationsRepository.listByType();
    return locations;
  }
}
export default FindLocationsByTypeService;
