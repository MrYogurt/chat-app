import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { TokenModel } from '../../src/models/token.model';
import { UserModel } from '../../src/models/user.model';
import { AuthService } from './auth.service';
import { CurrentUser } from './curent.user.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserModel)
  async login(
    @Args('nickname') nickname: string,
    @Args('password') password: string,
  ) {
    const resultSearchUser = await this.authService.validateUser(
      nickname,
      password,
    );

    if (!resultSearchUser) {
      const resultAddUser = await this.authService.addUser(nickname, password);

      const token = this.authService.login(resultAddUser);

      const result = {
        id: resultAddUser.id,
        nickname: resultAddUser.nickname,
        registration_date: resultAddUser.registration_date,
        access_token: token.access_token,
      };

      this.authService.checkAuth(token.access_token);

      return result;
    }

    const token = this.authService.login(resultSearchUser);

    const result = {
      id: resultSearchUser.id,
      nickname: resultSearchUser.nickname,
      registration_date: resultSearchUser.registration_date,
      access_token: token.access_token,
    };

    return result;
  }

  @Query(() => TokenModel, { nullable: true })
  async checkAuth(@Args('token') token: string) {
    return await this.authService.checkAuth(token);
  }

  @Query(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async whoAmI(@CurrentUser() nickname: string) {
    console.log(await this.authService.checkExistenceUser(nickname));
    // const { password, ...rest } = await this.authService.checkExistenceUser(
    //   nickname,
    // );

    // return rest;
  }
}