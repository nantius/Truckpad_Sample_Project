import { Router } from 'express';
import DriversController from '../controllers/DriversController';

const driversRouter = Router();
const driversController = new DriversController();

driversRouter.post('/', driversController.create);
driversRouter.put('/:uuid', driversController.update);

export default driversRouter;
