import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Vehicle } from "./vehicle";

@ObjectType()
export class PaginateVehicle {

    @Field(() => Int)
    totalCount: number;


    @Field(() => [Vehicle])
    vehicles: Vehicle[];

}