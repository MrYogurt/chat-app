import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('auth')
  catchData(@Body() data: any) {
    console.log('data:', data);

    return this.appService.checkExistenceUser(data);
  }
}
