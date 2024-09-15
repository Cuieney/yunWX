import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user.eneity';
import { Repository } from 'typeorm';
@Provide()
export class UserService {
  @InjectEntityModel(User)
  dataModel: Repository<User>;
  async saveUser(userName, isSubscribe) {
    return null;
    let result = null;
    const isExist = await this.dataModel.findOne({
      where: {
        userName,
      },
    });
    if (isExist) {
      isExist.userName = userName;
      isExist.CreateTime = Date.now();
      isExist.isSubscribe = isSubscribe;
      result = await this.dataModel.save(isExist);
    } else {
      const data = new User();
      data.userName = userName;
      data.CreateTime = Date.now();
      data.isSubscribe = isSubscribe;
      result = await this.dataModel.save(data);
    }
    return result;
  }
  async findAll() {
    return null;
    return await this.dataModel.find();
  }
  async updateUser(userName) {
    return null;
    const UserToUpdate = await this.dataModel.findOne({
      where: {
        userName,
      },
    });
    UserToUpdate.userName = userName;
    const UserResult = await this.dataModel.save(UserToUpdate);
    return UserResult;
  }
  async deleteUser(userName) {
    return null;
    const datas = await this.dataModel.find({
      where: {
        userName,
      },
    });
    const deleteResult = await this.dataModel.remove(datas);
    console.log(deleteResult);
  }
  async findUser(userName) {
    return null;
    const allDatas = await this.dataModel.find({
      where: { userName },
    });
    return allDatas;
  }
}
