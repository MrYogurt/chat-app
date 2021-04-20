import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth')
  async catchData(@Body() data: { nickname: string; password: string }) {
    const resultFindUser = await this.userService.checkExistenceUser(data);

    if (resultFindUser) {
      return true;
    }

    if (resultFindUser === undefined) {
      const result = await this.userService.addUser(data);

      if (result) {
        return true;
      }
    }
  }
}
