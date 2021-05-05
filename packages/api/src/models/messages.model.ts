import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessagesModel {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  message!: string;

  @Field()
  sender_name!: string;

  @Field(() => Int)
  sender_id!: number;

  @Field({ nullable: true })
  send_date?: string;
}
