import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

@ArgsType()
export class GetVehicleByIdArgs {

    @Field({ nullable: true })
    @IsNotEmpty()
    @IsNumber()
    vehicleId?: number;

    @Field({ nullable: true })
    @IsNotEmpty()
    vinNumber?: string;



}