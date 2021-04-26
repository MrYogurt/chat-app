import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  nickname!: string;

  @Field()
  password!: string;
}
