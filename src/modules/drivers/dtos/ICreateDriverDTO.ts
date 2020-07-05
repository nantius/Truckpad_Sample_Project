export default interface ICreateDriverDTO {
  name: string;
  age: number;
  sex: 'M' | 'F' | 'Other';
  hasOwnVehicle: boolean;
  vehicleLicenseType: string;
  isLoaded: boolean;
  vehicleTypeId: number;
}
