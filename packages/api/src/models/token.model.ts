import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenModel {
  @Field()
  sub!: number;

  @Field()
  iat!: number;

  @Field()
  exp!: number;
}
