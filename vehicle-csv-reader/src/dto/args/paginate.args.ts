import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

@ArgsType()
export class PaginateArgs {

    @Field(() => Int, { nullable: true })
    @IsNotEmpty()
    @IsNumber()
    first?: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty()
    @IsNumber()
    offset?: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty()
    @IsNumber()
    last?: number;

}