import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessagesService } from '../../src/messages/messages.service';
import { MessagesController } from '../../src/messages/messages.controller';
import { Messages } from '../../src/entity/messages';
import { MessagesResolver } from './messages.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Messages])],
  providers: [MessagesService, MessagesResolver],
  controllers: [MessagesController],
  exports: [TypeOrmModule, MessagesService],
})
export class MessagesModule {}
