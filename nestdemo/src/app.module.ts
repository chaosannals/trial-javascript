import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatModule } from './cat/cat.module';
import { LoggerMiddleware } from './logger.middleware';
import { AuthMiddleware } from './auth.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { RolesGuard } from './roles.guard';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
  imports: [
    // 这个 URL 是因为配置了分布式，直连的是可以读写的主机。
    MongooseModule.forRoot('mongodb://root:rootpwd@localhost:27003/?replicaSet=sn&directConnection=true'),
    // MongooseModule.forRoot('mongodb://root:rootpwd@localhost:27003,localhost:27002,localhost:27001/admin&replicaSet=sn'),
    CatModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cat');
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'login', method: RequestMethod.POST, },
      );
  }
}
