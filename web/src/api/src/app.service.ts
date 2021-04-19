import { Injectable } from '@nestjs/common';
import {
  Column,
  Connection,
  createConnection,
  createQueryBuilder,
  Entity,
  getConnection,
  getManager,
  getRepository,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './entity/user';

@Injectable()
export class AppService {
  async checkExistenceUser(data: any): Promise<any> {
    const IUsers: any = new Users();
    const name = data.nickname;

    // const user = await getConnection()
    //   .createQueryBuilder()
    //   .select('users')
    //   .from(IUsers, 'users')
    //   .where(`users.nickname = :${data.nickname}`)
    //   .getOne();

    const result = createQueryBuilder('users').where(
      'users.nickname = :nickname',
      {
        nickname: data.nickname,
      },
    );

    // const user = await getConnection()
    // .createQueryBuilder()
    // .select('nickname')
    // .from(IUsers, 'user')
    // .where(`users.nickname = :${data.nickname}`, {
    //   nickname: data.nickname,
    // })
    // .getOne();

    console.log('data228:', result);
  }
}
