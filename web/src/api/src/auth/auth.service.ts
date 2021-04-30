import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../src/entity/user';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.checkExistenceUser(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async checkExistenceUser(name: string): Promise<any> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.nickname = :nickname', { nickname: name })
      .getOne();
  }

  async addUser(username: string, pass: string): Promise<any> {
    const result = await this.regUser(username, pass);

    if (!result) {
      return console.log('Error: user create failed');
    }

    if (result) {
      return result;
    }
  }

  async regUser(nickname: string, password: string): Promise<any> {
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

  login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async checkAuth(token: string) {
    return await this.jwtService
      .verifyAsync(token)
      .then((result) => {
        return result;
      })
      .catch(() => {
        return null;
      });
  }
}
