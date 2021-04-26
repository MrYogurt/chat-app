import { Args, Query, Resolver } from '@nestjs/graphql';
import { MessageInput } from '../inputs/message.input';
import { MessageModel } from '../models/message.model';
import { MessagesService } from './messages.service';

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
  async fetchMore(@Args('count') count: number) {
    return await this.messagesService.fetchMoreMessages(count);
  }
}
