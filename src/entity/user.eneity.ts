import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    name: 'userName',
  })
  userName: string;

  @Column({
    name: 'isSubscribe',
  })
  isSubscribe: boolean;

  @Column({
    type: 'bigint',
    name: 'CreateTime',
  })
  CreateTime: number;
}
