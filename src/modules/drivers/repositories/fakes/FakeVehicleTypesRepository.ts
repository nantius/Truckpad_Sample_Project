import VehicleType from '@modules/drivers/infra/typeorm/entities/VehicleType';
import IVehicleTypesRepository from '../IVehicleTypesRepository';

class FakeVehicleTypesRepository implements IVehicleTypesRepository {
  private id_counter = 1;

  private vehicleTypes: VehicleType[] = [];

  public async findById(id: number): Promise<VehicleType | undefined> {
    const findVehicleType = this.vehicleTypes.find(
      vehicleType => vehicleType.id === id,
    );

    return findVehicleType;
  }

  public async create(type: string): Promise<VehicleType> {
    const vehicleType = new VehicleType();
    vehicleType.id = this.id_counter;
    vehicleType.type = type;
    this.id_counter += 1;
    this.vehicleTypes.push(vehicleType);
    return vehicleType;
  }
}

export default FakeVehicleTypesRepository;
