import { Injectable } from '@nestjs/common';
import {
  Column,
  Connection,
  createConnection,
  Entity,
  getConnection,
  getRepository,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './entity/user';

@Injectable()
export class AppService {
  async checkExistenceUser(data: any): Promise<any> {
    const IUsers = new Users();

    const user = await getConnection()
      .createQueryBuilder()
      .select('nickname')
      .from(IUsers, 'users')
      .where('users.nickname = :nickname', {
        nickname: data.nickname,
      })
      .getOne();
  }
}
