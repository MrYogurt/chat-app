import { UserModel } from './../models/user.model';
import { UserService } from './user.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/local-auth.guard';
import { CurrentUser } from 'src/auth/curent.user.decorator';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @Query(() => UserModel, { name: 'catchData' })
  // async catchData(
  //   @Args('nickname') nickname: string,
  //   @Args('password') password: string,
  // ) {
  //   const resultFindUser = await this.userService.checkExistenceUser(nickname);

  //   if (resultFindUser) {
  //     if (resultFindUser.password === password) {
  //       const filteredResult = {
  //         id: resultFindUser.id,
  //         nickname: resultFindUser.nickname,
  //         registration_date: resultFindUser.registration_date,
  //       };

  //       return filteredResult;
  //     }

  //     if (resultFindUser.password !== password) {
  //       return undefined;
  //     }
  //   }

  //   if (resultFindUser === undefined) {
  //     const result = await this.userService.addUser(nickname, password);

  //     if (result) {
  //       return result;
  //     }
  //   }
  // }

  // @Query(() => UserModel)
  // @UseGuards(GqlAuthGuard)
  // whoAmI(@CurrentUser() user: UserModel) {
  //   return this.userService.checkExistenceUser(user.nickname);
  // }
}
