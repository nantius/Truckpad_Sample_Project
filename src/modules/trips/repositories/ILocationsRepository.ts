import Location from '@modules/trips/infra/typeorm/entities/Location';
import ICreateLocationDTO from '@modules/trips/dtos/ICreateLocationDTO';
import IListLocationsByTypeDTO from '../dtos/IListLocationsByTypeDTO';

export default interface ILocationsRepository {
  findByUuid(uuid: string): Promise<Location | undefined>;
  create(data: ICreateLocationDTO): Promise<Location>;
  save(location: Location): Promise<Location>;
  listByType(): Promise<IListLocationsByTypeDTO>;
}
