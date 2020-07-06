import { Router } from 'express';
import DriversController from '../controllers/DriversController';

const driversRouter = Router();
const driversController = new DriversController();

driversRouter.post('/', driversController.create);
driversRouter.put('/:uuid', driversController.update);
driversRouter.get('/nocargo', driversController.findDriversWithoutCargo);
driversRouter.get(
  '/ownvehicle',
  driversController.findNumberOfDriversWithOwnVehicle,
);

export default driversRouter;
