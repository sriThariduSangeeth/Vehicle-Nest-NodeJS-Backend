import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

@ArgsType()
export class GetAllVehicleByManuYearArgs {

    @Field()
    @IsNotEmpty()
    @IsNumber()
    vehicleYear?: string;

}