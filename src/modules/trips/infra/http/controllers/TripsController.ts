import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import FindTripsByDriverService from '@modules/trips/services/FindTripsByDriverService';
import CreateTripService from '@modules/trips/services/CreateTripService';
import FindNumberOfTripsByTimeAndLocationService from '@modules/trips/services/FindNumberOfTripsByTimeAndLocationService';
import FinishTripService from '@modules/trips/services/FinishTripService';

export default class TripsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      driverId,
      startLocationId,
      endLocationId,
      startDateTime,
    } = request.body;

    const createTrip = container.resolve(CreateTripService);

    const trip = await createTrip.execute({
      driverId,
      startDateTime,
      startLocationId,
      endLocationId,
    });

    return response.status(201).json(trip);
  }

  public async findTripsByDriver(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { driverId } = request.params;

    const findTrips = container.resolve(FindTripsByDriverService);

    const trips = await findTrips.execute({ driverId });

    if (trips?.length === 0) {
      return response.status(204).json(trips);
    }

    return response.json(trips);
  }

  public async findTripsByTimeAndLocation(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { locationId, startDate, endDate } = request.body;

    const formatedStartDate = parseISO(startDate);
    const formatedEndDate = parseISO(endDate);

    const findTrips = container.resolve(
      FindNumberOfTripsByTimeAndLocationService,
    );

    const numberOfTrips = await findTrips.execute({
      locationId,
      endDate: formatedEndDate,
      startDate: formatedStartDate,
    });

    return response.json(numberOfTrips);
  }

  public async finishTrip(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { tripId } = request.params;
    const { finishDate } = request.body;

    const formattedDate = parseISO(finishDate);

    const finishTrip = container.resolve(FinishTripService);
    const trip = await finishTrip.execute({
      tripId,
      finishDate: formattedDate,
    });
    return response.json(trip);
  }
}
