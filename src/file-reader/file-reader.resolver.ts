import { Logger } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GetVehicleByIdArgs } from "src/dto/args/get-vehicleById.args";
import { CreateVehicleInput } from "src/dto/input/create-vehicle.input";
import { DeleteVehicleInput } from "src/dto/input/delete-vehicle.input";
import { UpdateVehicleInput } from "src/dto/input/update-vehicle.input";
import { Vehicle } from "../model/vehicle"
import { FileReaderService } from "./file-reader.service";

@Resolver(() => Vehicle)
export class FileReaderResolver {

    private readonly logger = new Logger(this.constructor.name);

    constructor(private readonly fileReaderService: FileReaderService) { }

    @Query(() => Vehicle, { name: 'vehicle' })
    async getVehicle(@Args() getVehicle: GetVehicleByIdArgs): Promise<Vehicle> {
        return this.fileReaderService.getVehicle(getVehicle)
    }

    @Query(() => [Vehicle], { name: 'vehicles', nullable: "items" })
    async getAllVehicles(): Promise<Vehicle[]> {
        this.logger.log("Call get all Vehucle.");
        return this.fileReaderService.getAllVehicles();
    }

    @Mutation(() => Vehicle)
    async createVehicle(@Args('createVehicle') createVehicle: CreateVehicleInput): Promise<Vehicle> {
        this.logger.log("create vehicle endpoint");
        return this.fileReaderService.cretaeVehicle(createVehicle);
    }

    @Mutation(() => Vehicle)
    async updateVehicle(@Args('updateVehicle') updateVehicle: UpdateVehicleInput): Promise<Vehicle> {
        this.logger.log("update vehicle endpoint");
        return this.fileReaderService.updateVehicle(updateVehicle);
    }

    @Mutation(() => Vehicle)
    async deleteVehicle(@Args('deleteVehicle') deleteVehicle: DeleteVehicleInput): Promise<Vehicle> {
        this.logger.log("delete vehicle endpoint");
        return this.fileReaderService.deleteVehicle(deleteVehicle);
    }


}