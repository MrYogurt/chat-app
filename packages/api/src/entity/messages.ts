import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Messages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  message?: string;

  @Column()
  sender_name?: string;

  @Column()
  sender_id?: string;

  @CreateDateColumn()
  send_date?: number;
}
