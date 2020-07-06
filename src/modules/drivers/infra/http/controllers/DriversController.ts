import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateDriverService from '@modules/drivers/services/CreateDriverService';
import UpdateDriverService from '@modules/drivers/services/UpdateDriverService';
import FindDriversWithoutCargoService from '@modules/drivers/services/FindDriversWithoutCargoService';
import FindNumberOfDriversWithOwnVehicleService from '@modules/drivers/services/FindNumberOfDriversWithOwnVehicleService';

export default class DriversController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      age,
      sex,
      hasOwnVehicle,
      vehicleLicenseType,
      isLoaded,
      vehicleTypeId,
    } = request.body;

    const createDriver = container.resolve(CreateDriverService);

    const driver = await createDriver.execute({
      name,
      age,
      sex,
      hasOwnVehicle,
      vehicleLicenseType,
      isLoaded,
      vehicleTypeId,
    });
    return response.status(201).json(driver);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params;
    const {
      name,
      age,
      sex,
      hasOwnVehicle,
      vehicleLicenseType,
      isLoaded,
      vehicleTypeId,
    } = request.body;
    const updateDriver = container.resolve(UpdateDriverService);
    const editedVehicle = await updateDriver.execute({
      uuid,
      name,
      age,
      sex,
      hasOwnVehicle,
      vehicleLicenseType,
      isLoaded,
      vehicleTypeId,
    });

    return response.json(editedVehicle);
  }

  public async findDriversWithoutCargo(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const driversWithoutCargo = container.resolve(
      FindDriversWithoutCargoService,
    );

    const drivers = await driversWithoutCargo.execute();

    if (drivers.length > 0) {
      return response.json(drivers);
    }
    return response.status(204).json(drivers);
  }

  public async findNumberOfDriversWithOwnVehicle(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const driversWithOwnVehicle = container.resolve(
      FindNumberOfDriversWithOwnVehicleService,
    );

    const drivers = await driversWithOwnVehicle.execute();
    return response.json(drivers);
  }
}
