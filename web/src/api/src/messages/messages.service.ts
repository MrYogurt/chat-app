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

  async addMessage(data: {
    sender_id?: string;
    sender_name?: string;
    msg?: string;
  }) {
    const senderId = data.sender_id;
    const senderName = data.sender_name;
    const msg = data.msg;

    try {
      await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(Messages)
        .values([
          { sender_id: senderId, sender_name: senderName, message: msg },
        ])
        .execute();
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

  async fetchMoreMessages(count: number): Promise<any> {
    return await this.usersRepository
      .createQueryBuilder('messages')
      .orderBy('messages.id', 'DESC')
      .skip(count)
      .take(20)
      .getMany();
  }
}
