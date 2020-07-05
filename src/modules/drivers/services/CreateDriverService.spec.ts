/* eslint-disable import/order */
import FakeDriversRepository from '../repositories/fakes/FakeDriversRepository';
import FakeVehicleTypesRepository from '../repositories/fakes/FakeVehicleTypesRepository';
import CreateDriverService from '@modules/drivers/services/CreateDriverService';
import AppError from '@shared/errors/AppError';

let fakeDriversRepository: FakeDriversRepository;
let fakeVehicleTypesRepository: FakeVehicleTypesRepository;
let createDriver: CreateDriverService;

describe('CreateDriver', () => {
  beforeEach(() => {
    fakeDriversRepository = new FakeDriversRepository();
    fakeVehicleTypesRepository = new FakeVehicleTypesRepository();

    createDriver = new CreateDriverService(
      fakeDriversRepository,
      fakeVehicleTypesRepository,
    );
  });

  it('should be able to create a new driver', async () => {
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

    expect(driver).toHaveProperty('uuid');
  });

  it('should not be able to create a new driver with an invalid vehicleTypeId', async () => {
    await expect(
      createDriver.execute({
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
});
