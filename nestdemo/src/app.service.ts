import { Injectable, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy, OnApplicationBootstrap, OnApplicationShutdown {
  onApplicationShutdown(signal?: string) {
    console.log('app shutdown:', signal);
  }
  onApplicationBootstrap() {
    console.log('app bootstrap');
  }
  onModuleDestroy() {
    console.log('module destroy');
  }
  async onModuleInit(): Promise<void> {
    console.log('module init');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
