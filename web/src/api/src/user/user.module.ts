import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '../../src/user/user.service';
// import { UserController } from '../../src/user/user.controller';
import { User } from '../../src/entity/user';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver],
  // controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UsersModule {}
