import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessagesService } from '../../src/messages/messages.service';
import { MessagesController } from '../../src/messages/messages.controller';
import { Messages } from '../../src/entity/messages';

@Module({
  imports: [TypeOrmModule.forFeature([Messages])],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [TypeOrmModule],
})
export class MessagesModule {}
