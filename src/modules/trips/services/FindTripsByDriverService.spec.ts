import FakeDriversRepository from '@modules/drivers/repositories/fakes/FakeDriversRepository';
import CreateDriverService from '@modules/drivers/services/CreateDriverService';
import FakeVehicleTypesRepository from '@modules/drivers/repositories/fakes/FakeVehicleTypesRepository';
import AppError from '@shared/errors/AppError';
import FakeLocationsRepository from '../repositories/fakes/FakeLocationsRepository';
import CreateLocationService from './CreateLocationService';
import FakeTripsRepository from '../repositories/fakes/FakeTripsRepository';
import CreateTripService from './CreateTripService';
import FindTripsByDriverService from './FindTripsByDriverService';

let fakeLocationsRepository: FakeLocationsRepository;
let fakeDriversRepository: FakeDriversRepository;
let fakeTripsRepository: FakeTripsRepository;
let fakeVehicleTypesRepository: FakeVehicleTypesRepository;
let createLocation: CreateLocationService;
let createDriver: CreateDriverService;
let createTrip: CreateTripService;
let findTrip: FindTripsByDriverService;

describe('FindTripsByDriver', () => {
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

    findTrip = new FindTripsByDriverService(
      fakeTripsRepository,
      fakeDriversRepository,
    );
  });

  it('should be able to find trips passing valid driverId', async () => {
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

    const foundTrips = await findTrip.execute({ driverId: driver.uuid });

    expect(foundTrips).toContain(trip);
  });

  it('should not be able to find a trip passing an invalid driverId', async () => {
    expect(findTrip.execute({ driverId: 'invalidId' })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
