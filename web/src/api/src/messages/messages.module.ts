import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Messages } from '../entity/messages';

@Module({
  imports: [TypeOrmModule.forFeature([Messages])],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [TypeOrmModule],
})
export class MessagesModule {}
