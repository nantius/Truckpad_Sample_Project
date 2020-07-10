import FakeDriversRepository from '@modules/drivers/repositories/fakes/FakeDriversRepository';
import CreateDriverService from '@modules/drivers/services/CreateDriverService';
import FakeVehicleTypesRepository from '@modules/drivers/repositories/fakes/FakeVehicleTypesRepository';
import FakeLocationsRepository from '../repositories/fakes/FakeLocationsRepository';
import FakeTripsRepository from '../repositories/fakes/FakeTripsRepository';
import CreateTripService from './CreateTripService';
import FindLocationsByTypeService from './FindLocationsByTypeService';

let fakeLocationsRepository: FakeLocationsRepository;
let fakeDriversRepository: FakeDriversRepository;
let fakeTripsRepository: FakeTripsRepository;
let fakeVehicleTypesRepository: FakeVehicleTypesRepository;
let createDriver: CreateDriverService;
let createTrip: CreateTripService;
let findLocations: FindLocationsByTypeService;

describe('FindLocationsByType', () => {
  beforeEach(() => {
    fakeLocationsRepository = new FakeLocationsRepository();
    fakeDriversRepository = new FakeDriversRepository();
    fakeTripsRepository = new FakeTripsRepository();
    fakeVehicleTypesRepository = new FakeVehicleTypesRepository();
    createDriver = new CreateDriverService(
      fakeDriversRepository,
      fakeVehicleTypesRepository,
    );
    createTrip = new CreateTripService(
      fakeTripsRepository,
      fakeDriversRepository,
      fakeLocationsRepository,
    );

    findLocations = new FindLocationsByTypeService(fakeLocationsRepository);
  });

  it('should be able to find locations ordered by type', async () => {
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

    const startLocation = await fakeLocationsRepository.createByType(
      {
        latitude: '-23.5549682',
        longitude: '-46.6650893',
      },
      'origin',
    );

    const endLocation = await fakeLocationsRepository.createByType(
      {
        latitude: '-50.5549682',
        longitude: '-70.6650893',
      },
      'destination',
    );

    await createTrip.execute({
      driverId: driver.uuid,
      startLocationId: startLocation.uuid,
      endLocationId: endLocation.uuid,
      startDateTime: new Date(),
    });

    const foundlocations = await findLocations.execute();

    expect(foundlocations.origin).toContain(startLocation);
    expect(foundlocations.destination).toContain(endLocation);
    expect(foundlocations.origin).not.toContain(endLocation);
  });
});
