import { uuid as uuidv4 } from 'uuidv4';
import Trip from '@modules/trips/infra/typeorm/entities/Trip';
import ICreateTripDTO from '@modules/trips/dtos/ICreateTripDTO';
import ITripsRepository from '../ITripsRepository';

class FakeTripsRepository implements ITripsRepository {
  private trips: Trip[] = [];

  public async findByUuid(uuid: string): Promise<Trip | undefined> {
    const findTrip = this.trips.find(trip => trip.uuid === uuid);
    return findTrip;
  }

  public async create(tripData: ICreateTripDTO): Promise<Trip> {
    const trip = new Trip();

    Object.assign(trip, { uuid: uuidv4() }, tripData);
    this.trips.push(trip);
    return trip;
  }

  public async save(trip: Trip): Promise<Trip> {
    const findIndex = this.trips.findIndex(
      findTrip => findTrip.uuid === trip.uuid,
    );
    this.trips[findIndex] = trip;
    return trip;
  }

  public async findTripsByDriver(
    driverId: string,
  ): Promise<Trip[] | undefined> {
    const trips = this.trips.filter(trip => trip.driverId === driverId);
    return trips;
  }
}

export default FakeTripsRepository;
