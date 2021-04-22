import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '../../src/user/user.service';
import { UserController } from '../../src/user/user.controller';
import { User } from '../../src/entity/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
