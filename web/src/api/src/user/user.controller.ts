import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../src/user/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('auth')
  // async catchData(@Body() data: { nickname: string; password: string }) {
  //   const resultFindUser = await this.userService.checkExistenceUser(data);

  //   if (resultFindUser) {
  //     if (resultFindUser.password === data.password) {
  //       const filteredResult = {
  //         id: resultFindUser.id,
  //         nickname: resultFindUser.nickname,
  //         registration_date: resultFindUser.registration_date,
  //       };

  //       return filteredResult;
  //     }

  //     if (resultFindUser.password !== data.password) {
  //       return undefined;
  //     }
  //   }

  //   if (resultFindUser === undefined) {
  //     const result = await this.userService.addUser(data);

  //     if (result) {
  //       return result;
  //     }
  //   }
  // }
}
