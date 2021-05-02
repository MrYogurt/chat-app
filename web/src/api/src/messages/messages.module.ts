import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessagesService } from '../../src/messages/messages.service';

import { Messages } from '../../src/entity/messages';

import { MessagesResolver } from './messages.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Messages])],
  providers: [MessagesService, MessagesResolver],
  exports: [TypeOrmModule, MessagesService],
})
export class MessagesModule {}
