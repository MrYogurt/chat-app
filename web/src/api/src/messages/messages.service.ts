import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Messages } from '../../src/entity/messages';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private usersRepository: Repository<Messages>,
  ) {}

  async addMessage(sender_id: string, sender_name: string, msg: string) {
    try {
      const result = await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(Messages)
        .values([
          { sender_id: sender_id, sender_name: sender_name, message: msg },
        ])
        .execute();

      return {
        id: result.generatedMaps[0].id,
        sender_id: sender_id,
        sender_name: sender_name,
        message: msg,
        send_date: result.generatedMaps[0].send_date,
      };
    } catch (err) {
      console.log('add message error:', err);
    }
  }

  async findAll(): Promise<Messages[]> {
    return await this.usersRepository.find();
  }

  async initializeMessages(): Promise<any> {
    return await this.usersRepository
      .createQueryBuilder('messages')
      .orderBy('messages.id', 'DESC')
      .limit(20)
      .getMany();
  }

  async fetchMoreMessages(offset: number, limit: number): Promise<any> {
    return await this.usersRepository
      .createQueryBuilder('messages')
      .orderBy('messages.id', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();
  }
}
