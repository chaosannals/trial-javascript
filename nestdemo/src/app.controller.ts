import { Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  login(): any {
    return {
      code: 0,
      tip: '登录成功',
    }
  }

  @Get('logout')
  logout(@User(123, /* 第一个是 data 之后的必须是管道 */) user: any) {
    console.log(user);
  }

  @Get('make-error')
  makeError() {
    throw new HttpException('forbideen', HttpStatus.FORBIDDEN);
  }
}
