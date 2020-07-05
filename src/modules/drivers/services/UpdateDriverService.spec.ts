/* eslint-disable import/order */
import FakeDriversRepository from '../repositories/fakes/FakeDriversRepository';
import FakeVehicleTypesRepository from '../repositories/fakes/FakeVehicleTypesRepository';
import CreateDriverService from '@modules/drivers/services/CreateDriverService';
import AppError from '@shared/errors/AppError';
import UpdateDriverService from './UpdateDriverService';

let fakeDriversRepository: FakeDriversRepository;
let fakeVehicleTypesRepository: FakeVehicleTypesRepository;
let createDriver: CreateDriverService;
let updateDriver: UpdateDriverService;

describe('UpdateDriver', () => {
  beforeEach(() => {
    fakeDriversRepository = new FakeDriversRepository();
    fakeVehicleTypesRepository = new FakeVehicleTypesRepository();

    createDriver = new CreateDriverService(
      fakeDriversRepository,
      fakeVehicleTypesRepository,
    );

    updateDriver = new UpdateDriverService(
      fakeDriversRepository,
      fakeVehicleTypesRepository,
    );
  });

  it('should be able to update a driver', async () => {
    await fakeVehicleTypesRepository.create('Caminhão 3/4');

    const driver = await createDriver.execute({
      name: 'Test Driver',
      age: 20,
      hasOwnVehicle: true,
      isLoaded: true,
      sex: 'M',
      vehicleLicenseType: 'D',
      vehicleTypeId: 1,
    });

    const updatedDriver = await updateDriver.execute({
      uuid: driver.uuid,
      vehicleTypeId: 1,
      vehicleLicenseType: 'D',
      sex: 'M',
      isLoaded: true,
      hasOwnVehicle: true,
      age: 30,
      name: 'Updated test driver',
    });

    expect(updatedDriver.name).toBe('Updated test driver');
  });

  it('should not be able to update a non existing driver', async () => {
    await fakeVehicleTypesRepository.create('Caminhão 3/4');
    await expect(
      updateDriver.execute({
        uuid: 'fakeuuid',
        name: 'Test Driver',
        age: 20,
        hasOwnVehicle: true,
        isLoaded: true,
        sex: 'M',
        vehicleLicenseType: 'D',
        vehicleTypeId: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update driver passing an invalid vehicleTypeId', async () => {
    await fakeVehicleTypesRepository.create('Caminhão 3/4');
    const driver = await createDriver.execute({
      name: 'Test Driver',
      age: 20,
      hasOwnVehicle: true,
      isLoaded: true,
      sex: 'M',
      vehicleLicenseType: 'D',
      vehicleTypeId: 1,
    });

    await expect(
      updateDriver.execute({
        uuid: driver.uuid,
        name: 'Test Driver',
        age: 20,
        hasOwnVehicle: true,
        isLoaded: true,
        sex: 'M',
        vehicleLicenseType: 'D',
        vehicleTypeId: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
