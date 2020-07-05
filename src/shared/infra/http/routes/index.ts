import { Router } from 'express';
import driversRouter from '@modules/drivers/infra/http/routes/drivers.routes';

const routes = Router();

routes.use('/drivers', driversRouter);

export default routes;
