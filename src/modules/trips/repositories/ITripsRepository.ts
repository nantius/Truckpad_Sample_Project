import Trip from '@modules/trips/infra/typeorm/entities/Trip';
import ICreateTripDTO from '@modules/trips/dtos/ICreateTripDTO';

export default interface ITripsRepository {
  findByUuid(uuid: string): Promise<Trip | undefined>;
  create(data: ICreateTripDTO): Promise<Trip>;
  save(trip: Trip): Promise<Trip>;
  findTripsByDriver(driverId: string): Promise<Trip[] | undefined>;
  // findTripsByVehicleType(): Promise<Trip[]>;
}
