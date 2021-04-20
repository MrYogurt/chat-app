import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import {
  Column,
  Connection,
  createConnection,
  createQueryBuilder,
  Entity,
  getConnection,
  getManager,
  getRepository,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { User } from './entity/user';

@Injectable()
@Dependencies(getRepositoryToken(User))
export class AppService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  // async checkExistenceUser(data: any): Promise<any> {
  //   const result = this.usersRepository.findOne(data.nickname);

  //   console.log('data228:', result);
  // }
}
