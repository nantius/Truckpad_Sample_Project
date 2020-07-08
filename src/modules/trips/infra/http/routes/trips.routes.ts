import { Router } from 'express';
import { getRepository } from 'typeorm';
import TripsController from '../controllers/TripsController';
import Trip from '../../typeorm/entities/Trip';

const tripsRouter = Router();
const tripsController = new TripsController();

tripsRouter.post('/', tripsController.create);
tripsRouter.get('/by_driver/:driverId', tripsController.findTripsByDriver);

// TODO temporário
tripsRouter.get('/', async (request, response) => {
  const findQuery = getRepository(Trip);
  const trips = await findQuery.find();
  return response.json(trips);
});

export default tripsRouter;
