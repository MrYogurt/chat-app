import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '../../src/entity/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async checkExistenceUser(name: string): Promise<any> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.nickname = :nickname', { nickname: name })
      .getOne();
  }

  async addUser(nickname: string, password: string): Promise<any> {
    try {
      const result = await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([{ nickname: nickname, password: password }])
        .execute();

      if (result) {
        const user = {
          id: result.generatedMaps[0].id,
          nickname: nickname,
          password: password,
          regTime: result.generatedMaps[0].registration_date,
        };

        return user;
      }
    } catch (err) {
      console.log('error add user:', err);
    }
  }
}
