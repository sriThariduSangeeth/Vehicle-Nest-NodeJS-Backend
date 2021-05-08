import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Count {

    @Field(() => Int)
    totalCount: number;
}