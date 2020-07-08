import FakeDriversRepository from '@modules/drivers/repositories/fakes/FakeDriversRepository';
import CreateDriverService from '@modules/drivers/services/CreateDriverService';
import FakeVehicleTypesRepository from '@modules/drivers/repositories/fakes/FakeVehicleTypesRepository';
import AppError from '@shared/errors/AppError';
import FakeLocationsRepository from '../repositories/fakes/FakeLocationsRepository';
import CreateLocationService from './CreateLocationService';
import FakeTripsRepository from '../repositories/fakes/FakeTripsRepository';
import CreateTripService from './CreateTripService';

let fakeLocationsRepository: FakeLocationsRepository;
let fakeDriversRepository: FakeDriversRepository;
let fakeTripsRepository: FakeTripsRepository;
let fakeVehicleTypesRepository: FakeVehicleTypesRepository;
let createLocation: CreateLocationService;
let createDriver: CreateDriverService;
let createTrip: CreateTripService;

describe('CreateTrip', () => {
  beforeEach(() => {
    fakeLocationsRepository = new FakeLocationsRepository();
    fakeDriversRepository = new FakeDriversRepository();
    fakeTripsRepository = new FakeTripsRepository();
    fakeVehicleTypesRepository = new FakeVehicleTypesRepository();
    createDriver = new CreateDriverService(
      fakeDriversRepository,
      fakeVehicleTypesRepository,
    );
    createLocation = new CreateLocationService(fakeLocationsRepository);
    createTrip = new CreateTripService(
      fakeTripsRepository,
      fakeDriversRepository,
      fakeLocationsRepository,
    );
  });

  it('should be able to create a new valid trip', async () => {
    await fakeVehicleTypesRepository.create('Caminhão 3/4');

    const driver = await createDriver.execute({
      age: 30,
      hasOwnVehicle: true,
      isLoaded: true,
      name: 'Test Driver',
      sex: 'M',
      vehicleLicenseType: 'D',
      vehicleTypeId: 1,
    });

    const startLocation = await createLocation.execute({
      latitude: '-23.5549682',
      longitude: '-46.6650893',
    });

    const endLocation = await createLocation.execute({
      latitude: '-50.5549682',
      longitude: '-70.6650893',
    });

    const trip = await createTrip.execute({
      driverId: driver.uuid,
      startLocationId: startLocation.uuid,
      endLocationId: endLocation.uuid,
      startDateTime: new Date(),
    });

    expect(trip).toHaveProperty('uuid');
  });

  it('should not be able to create a trip passing an invalid driverId', async () => {
    const startLocation = await createLocation.execute({
      latitude: '-23.5549682',
      longitude: '-46.6650893',
    });

    const endLocation = await createLocation.execute({
      latitude: '-50.5549682',
      longitude: '-70.6650893',
    });

    expect(
      createTrip.execute({
        driverId: 'invaliduuid',
        startLocationId: startLocation.uuid,
        endLocationId: endLocation.uuid,
        startDateTime: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a trip passing an invalid startLocationId', async () => {
    await fakeVehicleTypesRepository.create('Caminhão 3/4');

    const driver = await createDriver.execute({
      age: 30,
      hasOwnVehicle: true,
      isLoaded: true,
      name: 'Test Driver',
      sex: 'M',
      vehicleLicenseType: 'D',
      vehicleTypeId: 1,
    });

    const endLocation = await createLocation.execute({
      latitude: '-50.5549682',
      longitude: '-70.6650893',
    });

    expect(
      createTrip.execute({
        driverId: driver.uuid,
        startLocationId: 'invaliduuid',
        endLocationId: endLocation.uuid,
        startDateTime: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a trip passing an invalid endLocationId', async () => {
    await fakeVehicleTypesRepository.create('Caminhão 3/4');

    const driver = await createDriver.execute({
      age: 30,
      hasOwnVehicle: true,
      isLoaded: true,
      name: 'Test Driver',
      sex: 'M',
      vehicleLicenseType: 'D',
      vehicleTypeId: 1,
    });

    const startLocation = await createLocation.execute({
      latitude: '-23.5549682',
      longitude: '-46.6650893',
    });

    expect(
      createTrip.execute({
        driverId: driver.uuid,
        startLocationId: startLocation.uuid,
        endLocationId: 'invaliduuid',
        startDateTime: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a trip passing the same id for startLocationId and endLocationId', async () => {
    await fakeVehicleTypesRepository.create('Caminhão 3/4');

    const driver = await createDriver.execute({
      age: 30,
      hasOwnVehicle: true,
      isLoaded: true,
      name: 'Test Driver',
      sex: 'M',
      vehicleLicenseType: 'D',
      vehicleTypeId: 1,
    });

    const startLocation = await createLocation.execute({
      latitude: '-23.5549682',
      longitude: '-46.6650893',
    });

    expect(
      createTrip.execute({
        driverId: driver.uuid,
        startLocationId: startLocation.uuid,
        endLocationId: startLocation.uuid,
        startDateTime: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
