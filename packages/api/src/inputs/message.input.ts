import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class MessageInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int)
  sender_id!: string;

  @Field()
  sender_name!: string;

  @Field()
  message!: string;

  @Field({ nullable: true })
  send_date?: string;
}
