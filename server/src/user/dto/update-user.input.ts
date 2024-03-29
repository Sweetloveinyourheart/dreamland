import { Field, InputType } from "@nestjs/graphql";
import { Sex, UserRole } from "../enum/user.enum";

@InputType()
export class UpdateUserInput {
    @Field({ nullable: true })
    email?: string

    @Field({ nullable: true })
    password?: string

    @Field({ nullable: true })
    name?: string

    @Field({ nullable: true })
    avatar?: string

    @Field(type => Date, { nullable: true })
    birthday?: Date

    @Field(type => Sex, { nullable: true })
    sex?: Sex

    @Field({ nullable: true })
    address?: string

    @Field(type => [UserRole], { nullable: true })
    roles: UserRole[]
}

@InputType()
export class UpdateDevice {
    @Field()
    OS: string

    @Field()
    expoPushToken: string
}