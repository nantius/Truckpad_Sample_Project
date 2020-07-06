/* eslint-disable import/order */
import FakeDriversRepository from '../repositories/fakes/FakeDriversRepository';
import FakeVehicleTypesRepository from '../repositories/fakes/FakeVehicleTypesRepository';
import CreateDriverService from '@modules/drivers/services/CreateDriverService';
import FindNumberOfDriversWithOwnVehicleService from './FindNumberOfDriversWithOwnVehicleService';

let fakeDriversRepository: FakeDriversRepository;
let fakeVehicleTypesRepository: FakeVehicleTypesRepository;
let createDriver: CreateDriverService;
let findDrivers: FindNumberOfDriversWithOwnVehicleService;

describe('FindNumberOfDriversWithOwnVehicle', () => {
  beforeEach(() => {
    fakeDriversRepository = new FakeDriversRepository();
    fakeVehicleTypesRepository = new FakeVehicleTypesRepository();

    createDriver = new CreateDriverService(
      fakeDriversRepository,
      fakeVehicleTypesRepository,
    );

    findDrivers = new FindNumberOfDriversWithOwnVehicleService(
      fakeDriversRepository,
    );
  });

  it('should be able to find the number of drivers with own vehicle', async () => {
    await fakeVehicleTypesRepository.create('Caminhão 3/4');

    await createDriver.execute({
      name: 'Test Driver',
      age: 20,
      hasOwnVehicle: true,
      isLoaded: true,
      sex: 'M',
      vehicleLicenseType: 'D',
      vehicleTypeId: 1,
    });

    await createDriver.execute({
      name: 'Test Driver',
      age: 20,
      hasOwnVehicle: false,
      isLoaded: false,
      sex: 'M',
      vehicleLicenseType: 'D',
      vehicleTypeId: 1,
    });

    const drivers = await findDrivers.execute();

    expect(drivers).toBe(1);
  });
});
