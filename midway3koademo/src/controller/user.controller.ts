import { Controller, Get, Query } from "@midwayjs/core";
import { Inject, Put } from "@midwayjs/decorator";
import { UserService } from "../service/user.service";
import { faker } from '@faker-js/faker';
import { User } from '../entity/user';

faker.locale = 'zh_CN';

@Controller('/user')
export class UserController {
    @Inject()
    userService: UserService;

    @Get('/find')
    async find() {
        let users = await this.userService.findUser();
        return { success: true, message: 'OK', data: users };
    }

    @Get('/info')
    async info(@Query('id') id: number) {
        let user = await this.userService.getUser({uid: "639bcba0d011615ecc437ce6"});
        return { success: true, message: 'OK', data: user };
    }

    @Put("/add")
    async add() {
        let data = {
            name: faker.internet.userName(),
            jobs: Array(4).fill(1).map(() => faker.internet.domainName()),
        } as User;
        let user = await this.userService.addUser(data);
        return { success: true, message: 'OK', data: user };
    }
}