import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class DeleteVehicleInput {
    @Field(() => Int)
    @IsNotEmpty()
    vehicleId?: number;
}