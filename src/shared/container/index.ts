import { container } from 'tsyringe';

import IDriversRepository from '@modules/drivers/repositories/IDriversRepository';
import DriversRepository from '@modules/drivers/infra/typeorm/repositories/DriversRepository';

import IVehicleTypesRepository from '@modules/drivers/repositories/IVehicleTypesRepository';
import VehicleTypesRepository from '@modules/drivers/infra/typeorm/repositories/VehicleTypesRepository';

import ILocationsRepository from '@modules/trips/repositories/ILocationsRepository';
import LocationsRepository from '@modules/trips/infra/typeorm/repositories/LocationsRepository';

import ITripsRepository from '@modules/trips/repositories/ITripsRepository';
import TripsRepository from '@modules/trips/infra/typeorm/repositories/TripsRepository';

container.registerSingleton<IDriversRepository>(
  'DriversRepository',
  DriversRepository,
);

container.registerSingleton<IVehicleTypesRepository>(
  'VehicleTypesRepository',
  VehicleTypesRepository,
);

container.registerSingleton<ILocationsRepository>(
  'LocationsRepository',
  LocationsRepository,
);

container.registerSingleton<ITripsRepository>(
  'TripsRepository',
  TripsRepository,
);
