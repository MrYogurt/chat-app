import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nickname?: string;

  @Column()
  password?: string;

  @Column({ nullable: true })
  token?: string;

  @CreateDateColumn()
  registration_date?: number;
}
