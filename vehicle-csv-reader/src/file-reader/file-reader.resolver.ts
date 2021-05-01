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

    /**
     * @access GraphQL client
     * @param getVehicle vehicleId or vinNumber
     * @returns Vehicle object
     */
    @Query(() => Vehicle, { name: 'vehicle' })
    async getVehicle(@Args() getVehicle: GetVehicleByIdArgs): Promise<Vehicle> {
        this.logger.log("Call get Vehucle by id." + getVehicle.vehicleId);
        return this.fileReaderService.getVehicle(getVehicle)
    }

    /**
     * @access GraphQL client
     * @returns All Vehicle obj list
     */
    @Query(() => [Vehicle], { name: 'vehicles', nullable: "items" })
    async getAllVehicles(): Promise<Vehicle[]> {
        this.logger.log("Call get all Vehucle.");
        return this.fileReaderService.getAllVehicles();
    }

    /**
     * @access GraphQL client
     * @param createVehicle new Vehicle() 
     * @returns new created Vehicle Obj
     */
    @Mutation(() => Vehicle)
    async createVehicle(@Args('createVehicleData') createVehicle: CreateVehicleInput): Promise<Vehicle> {
        this.logger.log("create vehicle endpoint");
        return this.fileReaderService.cretaeVehicle(createVehicle);
    }

    /**
     * @access GraphQL client
     * @param updateVehicle Vehicle ID
     * @returns updated Vehicle obj
     */
    @Mutation(() => Vehicle)
    async updateVehicle(@Args('updateVehicleData') updateVehicle: UpdateVehicleInput): Promise<Vehicle> {
        this.logger.log("update vehicle endpoint");
        return this.fileReaderService.updateVehicle(updateVehicle);
    }

    /**
     * @access GraphQL client
     * @param deleteVehicle Vehicle ID  
     * @returns deleted Vehicle obj
     */
    @Mutation(() => Vehicle)
    async deleteVehicle(@Args('deleteVehicle') deleteVehicle: DeleteVehicleInput): Promise<Vehicle> {
        this.logger.log("delete vehicle endpoint");
        return this.fileReaderService.deleteVehicle(deleteVehicle);
    }


}