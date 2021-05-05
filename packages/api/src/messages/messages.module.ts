import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessagesService } from './messages.service';

import { Messages } from '../entity/messages';

import { MessagesResolver } from './messages.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Messages])],
  providers: [MessagesService, MessagesResolver],
  exports: [TypeOrmModule, MessagesService],
})
export class MessagesModule {}
