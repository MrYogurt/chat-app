import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { MessageInput } from '../inputs/message.input';
import { MessageModel } from '../models/message.model';
import { MessagesService } from './messages.service';

const pubSub = new PubSub();

@Resolver(() => MessageModel)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Query(() => MessageModel, { name: 'sendMessage' })
  async sendMessage(@Args('data') data: MessageInput) {
    return await this.messagesService.addMessage(
      data.sender_id,
      data.sender_name,
      data.message,
    );
  }

  @Query(() => [MessageModel], { name: 'initializeMessages' })
  async initializeMessages() {
    return await this.messagesService.initializeMessages();
  }

  @Query(() => [MessageModel], { name: 'fetchMore' })
  async fetchMore(
    @Args('offset') offset: number,
    @Args('limit') limit: number,
  ) {
    console.log('kavo:', offset, limit);
    return await this.messagesService.fetchMoreMessages(offset, limit);
  }

  @Subscription(() => MessageModel)
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }
}
