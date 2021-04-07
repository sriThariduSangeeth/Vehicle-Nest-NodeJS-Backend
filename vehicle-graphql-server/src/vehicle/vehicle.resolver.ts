import { Resolver } from "@nestjs/graphql";
import { Vehicle } from "src/models/vehicle";


@Resolver(() => Vehicle)
export class VehicleResolver{}