import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppService } from './app.service';

import { User } from './entity/user';
import { Messages } from './entity/messages';

import { MessagesModule } from './messages/messages.module';

import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_URL || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'admin',
        password: process.env.DB_PASSWORD || '228228228',
        database: process.env.DB_DATABASE || 'admin',
        autoLoadEntities: true,
        entities: [User, Messages],
        synchronize: true,
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
    }),
    AuthModule,
    MessagesModule,
  ],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
