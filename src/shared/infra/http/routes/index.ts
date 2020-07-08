import { Router } from 'express';
import driversRouter from '@modules/drivers/infra/http/routes/drivers.routes';
import locationsRouter from '@modules/trips/infra/http/routes/locations.routes';
import tripsRouter from '@modules/trips/infra/http/routes/trips.routes';

const routes = Router();

routes.use('/drivers', driversRouter);
routes.use('/locations', locationsRouter);
routes.use('/trips', tripsRouter);

export default routes;
