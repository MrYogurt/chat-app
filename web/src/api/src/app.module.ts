import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { User } from '../src/entity/user';
import { UsersModule } from '../src/user/user.module';

import { Messages } from '../src/entity/messages';
import { MessagesModule } from '../src/messages/messages.module';
import { join } from 'path';
import { UserResolver } from './user/user.resolver';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '228228228',
      database: 'admin',
      autoLoadEntities: true,
      entities: [User, Messages],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UsersModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
