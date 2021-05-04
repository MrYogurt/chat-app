/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '../entity/user';

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
    return await this.regUser(username, pass)
      .then((result) => {
        return result;
      })
      .catch(() => {
        return console.log('Error: user create failed');
      });
  }

  async regUser(
    nickname: string,
    password: string,
  ): Promise<{ id: number; nickname: string; regTime: any } | undefined> {
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
          regTime: result.generatedMaps[0].registration_date,
        };

        return user;
      }
    } catch (err) {
      console.log('error add user:', err);
    }
  }

  async addToken(id: number, key: string) {
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ token: key })
      .where('id = :id', { id: id })
      .execute();
  }

  login(user: { username: string; id: number }) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async whoAmIService(token: string) {
    const result = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.token = :token', { token: token })
      .getOne();

    const parsed = {
      id: result?.id,
      nickname: result?.nickname,
      registration_date: result?.registration_date,
    };
    return parsed;
  }

  async checkAuth(token: string) {
    return this.jwtService
      .verifyAsync(token)
      .then((result) => {
        return result;
      })
      .catch(() => {
        return null;
      });
  }
}
