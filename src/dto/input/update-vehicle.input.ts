
import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

@InputType()
export class UpdateVehicleInput {

    @Field(() => Int)
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Field({ nullable: true })
    @IsNotEmpty()
    firstName: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    lastName: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    carMake: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    carModel: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    vinNumber: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    manufacturedDate: string;
}