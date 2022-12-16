import { Controller, Get, Query } from "@midwayjs/core";
import { Inject, Put } from "@midwayjs/decorator";
import { UserService } from "../service/user.service";

@Controller('/user')
export class UserController {
    @Inject()
    userService: UserService;

    @Get('/find')
    async find() {
        return { success: true, message: 'OK' };
    }

    @Put("/add")
    async add() {
        let user = await this.userService.addUser();
        return { success: true, message: 'OK', data: user };
    }

    @Get('/info')
    async info(@Query('id') id: number) {
        
    }
}