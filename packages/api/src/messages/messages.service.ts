import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessageModel } from 'src/models/message.model';

import { Messages } from '../entity/messages';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private messagesRepository: Repository<Messages>,
  ) {}

  async addMessage(data: any): Promise<MessageModel> {
    try {
      const result = await this.messagesRepository
        .createQueryBuilder()
        .insert()
        .into(Messages)
        .values([
          {
            sender_id: data.sender_id,
            sender_name: data.sender_name,
            message: data.message,
          },
        ])
        .execute();

      return {
        id: result.generatedMaps[0].id,
        sender_id: data.sender_id,
        sender_name: data.sender_name,
        message: data.message,
        send_date: result.generatedMaps[0].send_date,
      };
    } catch (err) {
      console.log('add message error:', err);
    }
  }

  async findAll(): Promise<Messages[]> {
    return await this.messagesRepository.find();
  }

  async initializeMessages(): Promise<Messages[]> {
    return await this.messagesRepository
      .createQueryBuilder('messages')
      .orderBy('messages.id', 'DESC')
      .limit(20)
      .getMany();
  }

  async fetchMoreMessages(offset: number, limit: number): Promise<Messages[]> {
    return await this.messagesRepository
      .createQueryBuilder('messages')
      .orderBy('messages.id', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();
  }
}
