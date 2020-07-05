import VehicleType from '../infra/typeorm/entities/VehicleType';

export default interface IVehicleTypesRepository {
  findById(id: number): Promise<VehicleType | undefined>;
  create(type: string): Promise<VehicleType>;
}
