import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateDriverService from '@modules/drivers/services/CreateDriverService';
import UpdateDriverService from '@modules/drivers/services/UpdateDriverService';

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
}
