import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindTripsByDriverService from '@modules/trips/services/FindTripsByDriverService';
import CreateTripService from '@modules/trips/services/CreateTripService';

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
}
