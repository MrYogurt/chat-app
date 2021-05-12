import { UseGuards } from '@nestjs/common';

import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { MessageInput } from '../inputs/message.input';

import { MessageModel } from '../models/message.model';

import { MessagesService } from './messages.service';

const pubSub = new PubSub();

@Resolver(() => MessageModel)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => MessageModel, { name: 'sendMessage' })
  @UseGuards(JwtAuthGuard)
  async sendMessage(@Args('data') data: MessageInput) {
    return await this.messagesService.addMessage(data).then((message) => {
      pubSub.publish('messageAdded', { messageAdded: message });

      return message;
    });
  }

  @Query(() => [MessageModel], { name: 'initializeMessages' })
  @UseGuards(JwtAuthGuard)
  async initializeMessages() {
    return await this.messagesService.initializeMessages();
  }

  @Query(() => [MessageModel], { name: 'fetchMore' })
  @UseGuards(JwtAuthGuard)
  async fetchMore(
    @Args('offset') offset: number,
    @Args('limit') limit: number,
  ) {
    return await this.messagesService.fetchMoreMessages(offset, limit);
  }

  @Subscription(() => MessageModel)
  // @UseGuards(JwtAuthGuard)
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }
}
