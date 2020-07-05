import { container } from 'tsyringe';

import IDriversRepository from '@modules/drivers/repositories/IDriversRepository';
import DriversRepository from '@modules/drivers/infra/typeorm/repositories/DriversRepository';

import IVehicleTypesRepository from '@modules/drivers/repositories/IVehicleTypesRepository';
import VehicleTypesRepository from '@modules/drivers/infra/typeorm/repositories/VehicleTypesRepository';

container.registerSingleton<IDriversRepository>(
  'DriversRepository',
  DriversRepository,
);

container.registerSingleton<IVehicleTypesRepository>(
  'VehicleTypesRepository',
  VehicleTypesRepository,
);
