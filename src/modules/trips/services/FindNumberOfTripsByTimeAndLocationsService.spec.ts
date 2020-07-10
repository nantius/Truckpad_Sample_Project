import FakeDriversRepository from '@modules/drivers/repositories/fakes/FakeDriversRepository';
import CreateDriverService from '@modules/drivers/services/CreateDriverService';
import FakeVehicleTypesRepository from '@modules/drivers/repositories/fakes/FakeVehicleTypesRepository';
import AppError from '@shared/errors/AppError';
import FakeLocationsRepository from '../repositories/fakes/FakeLocationsRepository';
import CreateLocationService from './CreateLocationService';
import FakeTripsRepository from '../repositories/fakes/FakeTripsRepository';
import CreateTripService from './CreateTripService';
import FindNumberOfTripsByTimeAndLocationService from './FindNumberOfTripsByTimeAndLocationService';
import FinishTripService from './FinishTripService';

let fakeLocationsRepository: FakeLocationsRepository;
let fakeDriversRepository: FakeDriversRepository;
let fakeTripsRepository: FakeTripsRepository;
let fakeVehicleTypesRepository: FakeVehicleTypesRepository;
let createLocation: CreateLocationService;
let createDriver: CreateDriverService;
let createTrip: CreateTripService;
let findTrip: FindNumberOfTripsByTimeAndLocationService;
let finishTrip: FinishTripService;

describe('FindNumberOfTrips', () => {
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

    findTrip = new FindNumberOfTripsByTimeAndLocationService(
      fakeTripsRepository,
      fakeLocationsRepository,
    );

    finishTrip = new FinishTripService(fakeTripsRepository);
  });

  it('should be able to find the number of trips passing valid locationId and Dates', async () => {
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

    const location1 = await createLocation.execute({
      latitude: '-23.5549682',
      longitude: '-46.6650893',
    });

    const location2 = await createLocation.execute({
      latitude: '-23.5549682',
      longitude: '-46.6650893',
    });

    await createTrip.execute({
      driverId: driver.uuid,
      startLocationId: location1.uuid,
      endLocationId: location2.uuid,
      startDateTime: new Date('2020-01-03'),
    });

    const trip2 = await createTrip.execute({
      driverId: driver.uuid,
      startLocationId: location2.uuid,
      endLocationId: location1.uuid,
      startDateTime: new Date('2020-01-01'),
    });

    await finishTrip.execute({
      tripId: trip2?.uuid,
      finishDate: new Date('2020-01-05'),
    });

    await createTrip.execute({
      driverId: driver.uuid,
      startLocationId: location2.uuid,
      endLocationId: location1.uuid,
      startDateTime: new Date('2020-02-01'),
    });

    const foundTrips = await findTrip.execute({
      locationId: location1.uuid,
      startDate: new Date('2020-01-01'),
      endDate: new Date('2020-01-05'),
    });

    expect(foundTrips).toBe(2);
  });

  it('should not be able to find the number of trips passing an invalid locationId', async () => {
    await expect(
      findTrip.execute({
        locationId: 'invalidId',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2020-01-05'),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to find the number of trips passing an endDate that comes before the startDate', async () => {
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

    const location1 = await createLocation.execute({
      latitude: '-23.5549682',
      longitude: '-46.6650893',
    });

    const location2 = await createLocation.execute({
      latitude: '-23.5549682',
      longitude: '-46.6650893',
    });

    await createTrip.execute({
      driverId: driver.uuid,
      startLocationId: location1.uuid,
      endLocationId: location2.uuid,
      startDateTime: new Date('2020-01-03'),
    });

    await expect(
      findTrip.execute({
        locationId: location1.uuid,
        startDate: new Date('2020-01-05'),
        endDate: new Date('2020-01-01'),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
