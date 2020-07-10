import FakeDriversRepository from '@modules/drivers/repositories/fakes/FakeDriversRepository';
import CreateDriverService from '@modules/drivers/services/CreateDriverService';
import FakeVehicleTypesRepository from '@modules/drivers/repositories/fakes/FakeVehicleTypesRepository';
import AppError from '@shared/errors/AppError';
import FakeLocationsRepository from '../repositories/fakes/FakeLocationsRepository';
import CreateLocationService from './CreateLocationService';
import FakeTripsRepository from '../repositories/fakes/FakeTripsRepository';
import CreateTripService from './CreateTripService';
import FinishTripService from './FinishTripService';

let fakeLocationsRepository: FakeLocationsRepository;
let fakeDriversRepository: FakeDriversRepository;
let fakeTripsRepository: FakeTripsRepository;
let fakeVehicleTypesRepository: FakeVehicleTypesRepository;
let createLocation: CreateLocationService;
let createDriver: CreateDriverService;
let createTrip: CreateTripService;
let finishTrip: FinishTripService;

describe('FinishTrip', () => {
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
    finishTrip = new FinishTripService(fakeTripsRepository);
  });

  it('should be able to finish a valid trip', async () => {
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
      startDateTime: new Date('2020-01-01'),
    });

    const finishDate = new Date('2020-01-05');

    await finishTrip.execute({
      tripId: trip.uuid,
      finishDate,
    });

    expect(trip.endDateTime).toBe(finishDate);
  });

  it('should not be able to finish a trip passing an invalid tripId', async () => {
    await expect(
      finishTrip.execute({
        tripId: 'invalidId',
        finishDate: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should not be able to finish a trip passing a finishDate which is before the trip's startDateTime`, async () => {
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
      startDateTime: new Date('2020-01-05'),
    });

    await expect(
      finishTrip.execute({
        tripId: trip.uuid,
        finishDate: new Date('2020-01-01'),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
