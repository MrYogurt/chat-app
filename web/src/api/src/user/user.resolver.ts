import { UserModel } from './../models/user.model';
import { UserService } from './user.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from '../inputs/user.input';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel, { name: 'catchData' })
  async catchData(@Args('data') data: UserInput) {
    const resultFindUser = await this.userService.checkExistenceUser(data);

    if (resultFindUser) {
      if (resultFindUser.password === data.password) {
        const filteredResult = {
          id: resultFindUser.id,
          nickname: resultFindUser.nickname,
          registration_date: resultFindUser.registration_date,
        };

        return filteredResult;
      }

      if (resultFindUser.password !== data.password) {
        return undefined;
      }
    }

    if (resultFindUser === undefined) {
      const result = await this.userService.addUser(data);

      if (result) {
        return result;
      }
    }
  }
}
