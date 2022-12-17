import { Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { User } from '../entity/user';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Provide()
export class UserService {

  @InjectEntityModel(User)
  useModel: ReturnModelType<typeof User>;

  async addUser(user: User) {
    const { _id: id } = await this.useModel.create(user);
    return id;
  }

  async getUser(options: IUserOptions) {
    return await this.useModel.findById(options.uid);
  }

  async findUser() {
    return await this.useModel.find({ name: /a/i});
  }
}
