/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '../entity/user';

import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

interface IUser {
  id?: number;
  nickname?: string;
  token?: string;
  registration_date?: any;
  password?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<IUser> {
    const user = await this.checkExistenceUser(username);

    if (user) {
      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(pass, saltOrRounds);

      const isMatch = await bcrypt.compare(pass, hashPassword);

      if (isMatch) {
        return user;
      }

      if (!isMatch) {
        return null;
      }
    }

    return null;
  }

  async checkExistenceUser(name: string): Promise<IUser> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.nickname = :nickname', { nickname: name })
      .getOne();
  }

  async addUser(username: string, pass: string): Promise<IUser | void> {
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
  ): Promise<IUser | undefined> {
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
          registration_date: result.generatedMaps[0].registration_date,
        };

        return user;
      }
    } catch (err) {
      console.log('error add user:', err);
    }
  }

  login(user: IUser) {
    const secret = this.configService.get('JWT_SECRET');

    const payload = { username: user.nickname, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, secret),
    };
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
