import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { MessageInput } from 'src/inputs/message.input';
import { Repository } from 'typeorm';

import { Messages } from '../entity/messages';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private usersRepository: Repository<Messages>,
  ) {}

  async addMessage(
    sender_id: string,
    sender_name: string,
    message: string,
  ): Promise<MessageInput> {
    try {
      const result = await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(Messages)
        .values([
          { sender_id: sender_id, sender_name: sender_name, message: message },
        ])
        .execute();

      return {
        id: result.generatedMaps[0].id,
        sender_id: sender_id,
        sender_name: sender_name,
        message: message,
        send_date: result.generatedMaps[0].send_date,
      };
    } catch (err) {
      console.log('add message error:', err);
    }
  }

  async findAll(): Promise<Messages[]> {
    return await this.usersRepository.find();
  }

  async initializeMessages(): Promise<Messages[]> {
    return await this.usersRepository
      .createQueryBuilder('messages')
      .orderBy('messages.id', 'DESC')
      .limit(20)
      .getMany();
  }

  async fetchMoreMessages(offset: number, limit: number): Promise<Messages[]> {
    return await this.usersRepository
      .createQueryBuilder('messages')
      .orderBy('messages.id', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();
  }
}
