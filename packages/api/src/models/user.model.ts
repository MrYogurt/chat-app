import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  nickname!: string;

  @Field()
  password!: string;

  @Field({ nullable: true })
  registration_date?: number;

  @Field()
  access_token!: string;

  @Field({ nullable: true })
  token?: string;
}
