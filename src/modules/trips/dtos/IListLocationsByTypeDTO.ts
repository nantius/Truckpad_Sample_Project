import Location from '@modules/trips/infra/typeorm/entities/Location';

export default interface IListLocationsByTypeDTO {
  origin: Location[];
  destination: Location[];
}
