import { uuid as uuidv4 } from 'uuidv4';
import Trip from '@modules/trips/infra/typeorm/entities/Trip';
import ICreateTripDTO from '@modules/trips/dtos/ICreateTripDTO';
import { isWithinInterval } from 'date-fns';
import ITripsRepository from '../ITripsRepository';
import IListTripsByTimeAndLocationDTO from '../../dtos/IListTripsByTimeAndLocationDTO';

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

  public async findNumberOfTripsByTimeAndLocation(
    data: IListTripsByTimeAndLocationDTO,
  ): Promise<number> {
    const { locationId, endDate, startDate } = data;

    const foundTripByOrigin = this.trips.filter(
      trip =>
        trip.startLocationId === locationId &&
        isWithinInterval(trip.startDateTime, {
          start: startDate,
          end: endDate,
        }),
    );

    const foundTripByDestination = this.trips.filter(
      trip =>
        trip.endLocationId === locationId &&
        isWithinInterval(trip.endDateTime, {
          start: startDate,
          end: endDate,
        }),
    );

    return foundTripByOrigin.length + foundTripByDestination.length;
  }
}

export default FakeTripsRepository;
