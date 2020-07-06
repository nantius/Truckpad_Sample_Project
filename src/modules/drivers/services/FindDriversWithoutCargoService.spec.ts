/* eslint-disable import/order */
import FakeDriversRepository from '../repositories/fakes/FakeDriversRepository';
import FakeVehicleTypesRepository from '../repositories/fakes/FakeVehicleTypesRepository';
import CreateDriverService from '@modules/drivers/services/CreateDriverService';
import FindDriversWithoutCargoService from './FindDriversWithoutCargoService';

let fakeDriversRepository: FakeDriversRepository;
let fakeVehicleTypesRepository: FakeVehicleTypesRepository;
let createDriver: CreateDriverService;
let findDrivers: FindDriversWithoutCargoService;

describe('FindDriversWithoutCargo', () => {
  beforeEach(() => {
    fakeDriversRepository = new FakeDriversRepository();
    fakeVehicleTypesRepository = new FakeVehicleTypesRepository();

    createDriver = new CreateDriverService(
      fakeDriversRepository,
      fakeVehicleTypesRepository,
    );

    findDrivers = new FindDriversWithoutCargoService(fakeDriversRepository);
  });

  it('should be able to find all the drivers without cargo', async () => {
    await fakeVehicleTypesRepository.create('Caminhão 3/4');

    const driver_one = await createDriver.execute({
      name: 'Test Driver',
      age: 20,
      hasOwnVehicle: true,
      isLoaded: true,
      sex: 'M',
      vehicleLicenseType: 'D',
      vehicleTypeId: 1,
    });

    const driver_two = await createDriver.execute({
      name: 'Test Driver',
      age: 20,
      hasOwnVehicle: true,
      isLoaded: false,
      sex: 'M',
      vehicleLicenseType: 'D',
      vehicleTypeId: 1,
    });

    const drivers = await findDrivers.execute();

    expect(drivers).toContain(driver_two);
    expect(drivers).not.toContain(driver_one);
  });
});
