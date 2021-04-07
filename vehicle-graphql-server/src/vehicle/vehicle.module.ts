import { Module } from "@nestjs/common";
import { VehicleController } from "./vehicle.controller";
import { VehicleProviders } from "./vehicle.provider";
import { VehicleResolver } from "./vehicle.resolver";
import { VehicleService } from "./vehicle.service";

@Module({
    imports: [],
    controllers: [VehicleController],
    providers: [VehicleResolver , VehicleService , ...VehicleProviders],
  })
export class VehicleModule{}


