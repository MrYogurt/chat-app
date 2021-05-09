/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { TokenModel } from '../models/token.model';
import { UserModel } from '../models/user.model';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

import * as bcrypt from 'bcrypt';
import { CurrentUser } from './curent.user.decorator';

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserModel, { nullable: true })
  async login(
    @Args('nickname') nickname: string,
    @Args('password') password: string,
  ) {
    const resultSearchUser = await this.authService.validateUser(
      nickname,
      password,
    );

    if (!resultSearchUser) {
      return null;
    }

    if (resultSearchUser) {
      const token = this.authService.login(resultSearchUser);

      const result = {
        id: resultSearchUser.id,
        nickname: resultSearchUser.nickname,
        registration_date: resultSearchUser.registration_date,
        access_token: token.access_token,
      };

      return result;
    }
  }

  @Mutation(() => UserModel, { nullable: true })
  async register(
    @Args('nickname') nickname: string,
    @Args('password') password: string,
  ) {
    const resultSearchUser = await this.authService.validateUser(
      nickname,
      password,
    );

    if (resultSearchUser) {
      return null;
    }

    if (!resultSearchUser) {
      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltOrRounds);

      const resultAddUser = await this.authService.addUser(
        nickname,
        hashPassword,
      );

      if (resultAddUser) {
        const token = this.authService.login(resultAddUser);

        const result = {
          id: resultAddUser.id,
          nickname: resultAddUser.nickname,
          registration_date: resultAddUser.registration_date,
          access_token: token.access_token,
        };

        return result;
      }
    }
  }

  @Query(() => TokenModel, { nullable: true })
  async checkAuth(@Args('token') token: string) {
    return await this.authService.checkAuth(token);
  }

  @Query(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async whoAmI(@CurrentUser() user: { userId: number; username: string }) {
    const { password, ...rest } = await this.authService.checkExistenceUser(
      user.username,
    );

    return rest;
  }
}
