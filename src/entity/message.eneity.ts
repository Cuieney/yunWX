import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    name: 'Event',
    nullable: true,
  })
  Event: string;

  @Column({
    type: 'text',
    name: 'ToUserName',
  })
  ToUserName: string;

  @Column({
    type: 'text',
    name: 'FromUserName',
  })
  FromUserName: string;

  @Column({
    type: 'text',
    name: 'PicUrl',
    nullable: true,
  })
  PicUrl: string;

  @Column({
    type: 'text',
    name: 'MsgType',
  })
  MsgType: string;

  @Column({
    type: 'text',
    name: 'Content',
  })
  Content: string;

  @Column('CreateTime')
  @Column({
    type: 'bigint',
    name: 'CreateTime',
  })
  CreateTime: number;
}
