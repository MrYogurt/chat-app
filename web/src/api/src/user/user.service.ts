import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  //   async remove(id: string): Promise<void> {
  //     await this.usersRepository.delete(id);
  //   }

  async checkExistenceUser(data: any): Promise<any> {
    const result = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.nickname = :nickname', { nickname: data.nickname })
      .getOne();

    return result;
  }

  async addUser(data: { nickname: string; password: string }): Promise<any> {
    const nickname = data.nickname;
    const password = data.password;
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
