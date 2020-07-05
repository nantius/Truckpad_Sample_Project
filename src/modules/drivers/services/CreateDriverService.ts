import { injectable, inject } from 'tsyringe';
import Driver from '@modules/drivers/infra/typeorm/entities/Driver';
import AppError from '@shared/errors/AppError';
import IDriversRepository from '../repositories/IDriversRepository';
import IVehicleTypesRepository from '../repositories/IVehicleTypesRepository';

interface IRequestDTO {
  name: string;
  age: number;
  sex: 'M' | 'F' | 'Other';
  hasOwnVehicle: boolean;
  vehicleLicenseType: string;
  isLoaded: boolean;
  vehicleTypeId: number;
}

@injectable()
class CreateDriverService {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository,

    @inject('VehicleTypesRepository')
    private vehicleTypesRepository: IVehicleTypesRepository,
  ) {}

  public async execute(driversData: IRequestDTO): Promise<Driver> {
    const vehicleType = await this.vehicleTypesRepository.findById(
      driversData.vehicleTypeId,
    );

    if (!vehicleType) {
      throw new AppError('Invalid Vehicle Type');
    }

    const driver = await this.driversRepository.create(driversData);
    return driver;
  }
}
export default CreateDriverService;
