import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

@ArgsType()
export class GetAllVehicleByAgeArgs {

    @Field(() => Int, { nullable: true })
    @IsNotEmpty()
    @IsNumber()
    vehicleAge?: number;

    @Field({ nullable: true })
    @IsNotEmpty()
    vehicleModel?: string;
}