import { injectable, inject } from 'tsyringe';

import Driver from '@modules/drivers/infra/typeorm/entities/Driver';
import AppError from '@shared/errors/AppError';
import IDriversRepository from '../repositories/IDriversRepository';
import IVehicleTypesRepository from '../repositories/IVehicleTypesRepository';

interface IRequestDTO {
  uuid: string;
  name: string;
  age: number;
  sex: 'M' | 'F' | 'Other';
  hasOwnVehicle: boolean;
  vehicleLicenseType: string;
  isLoaded: boolean;
  vehicleTypeId: number;
}

@injectable()
class UpdateDriverService {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository,

    @inject('VehicleTypesRepository')
    private vehicleTypesRepository: IVehicleTypesRepository,
  ) {}

  public async execute({
    uuid,
    name,
    age,
    sex,
    hasOwnVehicle,
    vehicleLicenseType,
    isLoaded,
    vehicleTypeId,
  }: IRequestDTO): Promise<Driver> {
    const driver = await this.driversRepository.findByUuid(uuid);

    if (!driver) {
      throw new AppError('Driver does not exist.');
    }

    const vehicleType = await this.vehicleTypesRepository.findById(
      vehicleTypeId,
    );

    if (!vehicleType) {
      throw new AppError('Invalid Vehicle Type');
    }

    const editedDriver = Object.assign(driver, {
      name,
      age,
      sex,
      hasOwnVehicle,
      vehicleLicenseType,
      isLoaded,
      vehicleTypeId,
    });

    const returnDriver = await this.driversRepository.save(editedDriver);

    return returnDriver;
  }
}
export default UpdateDriverService;
