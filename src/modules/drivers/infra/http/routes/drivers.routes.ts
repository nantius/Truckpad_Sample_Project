import { Router } from 'express';
import DriversController from '../controllers/DriversController';

const driversRouter = Router();
const driversController = new DriversController();

driversRouter.post('/', driversController.create);
driversRouter.put('/:uuid', driversController.update);
driversRouter.get('/no_cargo', driversController.findDriversWithoutCargo);
driversRouter.get(
  '/own_vehicle',
  driversController.findNumberOfDriversWithOwnVehicle,
);

export default driversRouter;
