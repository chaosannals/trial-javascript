import { Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { User } from '../entity/user';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Provide()
export class UserService {

  @InjectEntityModel(User)
  useModel: ReturnModelType<typeof User>;

  async addUser() {
    const { _id: id } = await this.useModel.create({
      name: 'aaaaa',
      jobs: ['a', 'b'],
    } as User);
    console.log(id)
  }

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}
