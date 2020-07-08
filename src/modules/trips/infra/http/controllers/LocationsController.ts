import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateLocationService from '@modules/trips/services/CreateLocationService';
import FindLocationsByTypeService from '@modules/trips/services/FindLocationsByTypeService';

export default class LocationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { latitude, longitude } = request.body;

    const createLocation = container.resolve(CreateLocationService);

    const location = await createLocation.execute({
      latitude,
      longitude,
    });
    return response.status(201).json(location);
  }

  public async listByType(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findByType = container.resolve(FindLocationsByTypeService);

    const locations = await findByType.execute();
    return response.json(locations);
  }
}
