import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenModel {
  @Field({ nullable: true })
  sub!: number;

  @Field({ nullable: true })
  iat!: number;

  @Field({ nullable: true })
  exp!: number;
}
