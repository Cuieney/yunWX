import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Message } from '../entity/message.eneity';
import { Repository } from 'typeorm';

@Provide()
export class MessageService {
  @InjectEntityModel(Message)
  dataModel: Repository<Message>;
  async saveMessage(any) {
    return null;
    const message = new Message();
    message.Content = any.Content;
    message.Event = any.Event;
    message.ToUserName = any.ToUserName;
    message.FromUserName = any.FromUserName;
    message.MsgType = any.MsgType;
    message.CreateTime = any.CreateTime;
    message.PicUrl = any.PicUrl;
    const messageResult = await this.dataModel.save(message);
    return messageResult;
  }
  async findAll() {
    return null;
    return await this.dataModel.find();
  }
  async updateMessage(FromUserName, MsgType) {
    return null;
    const messageToUpdate = await this.dataModel.findOne({
      where: {
        FromUserName,
        MsgType,
      },
    });
    messageToUpdate.Content = 'Me, my friends and polar bears';
    const messageResult = await this.dataModel.save(messageToUpdate);
    return messageResult;
  }
  async deleteMessage(FromUserName) {
    return null;
    const datas = await this.dataModel.find({
      where: {
        FromUserName,
      },
    });
    const deleteResult = await this.dataModel.remove(datas);
    console.log(deleteResult);
  }
  async findMessage(FromUserName) {
    return null;
    const allDatas = await this.dataModel.find({
      where: { FromUserName },
    });
    return allDatas;
  }
}
