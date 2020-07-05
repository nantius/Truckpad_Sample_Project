import { getRepository, Repository } from 'typeorm';
import IVehicleTypesRepository from '@modules/drivers/repositories/IVehicleTypesRepository';
import VehicleType from '../entities/VehicleType';

class VehicleTypesRepository implements IVehicleTypesRepository {
  private ormRepository: Repository<VehicleType>;

  constructor() {
    this.ormRepository = getRepository(VehicleType);
  }

  public async findById(id: number): Promise<VehicleType | undefined> {
    const vehicleType = await this.ormRepository.findOne(id);
    return vehicleType;
  }

  public async create(type: string): Promise<VehicleType> {
    const vehicleType = this.ormRepository.create({ type });
    await this.ormRepository.save(vehicleType);
    return vehicleType;
  }
}

export default VehicleTypesRepository;
