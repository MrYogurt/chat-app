import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessagesModel {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  sender_name?: string;

  @Field(() => Int, { nullable: true })
  sender_id?: number;

  @Field({ nullable: true })
  send_date?: string;
}
