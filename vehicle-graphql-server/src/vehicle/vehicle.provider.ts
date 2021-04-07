import { Vehicle } from "./entity/vehicle.entity";

export const VehicleProviders = [
    {
      provide: 'VEHICLE_REPOSITORY',
      useValue: Vehicle,
    },
  ];