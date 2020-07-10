import { Router } from 'express';
import { getRepository } from 'typeorm';
import Location from '@modules/trips/infra/typeorm/entities/Location';
import LocationsController from '../controllers/LocationsController';

const locationsRouter = Router();
const locationsController = new LocationsController();

locationsRouter.post('/', locationsController.create);
locationsRouter.get('/list_by_type', locationsController.listByType);

locationsRouter.get('/', async (request, response) => {
  const locRep = await getRepository(Location);
  const locs = await locRep.find();
  return response.json(locs);
});

export default locationsRouter;
