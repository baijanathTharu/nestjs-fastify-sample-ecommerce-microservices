import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('SUBSCRIBERS_SERVICE') private subscribersService: ClientProxy
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('/message')
  async sendMessage(@Body() req) {
    try {
      console.log('test');
      // console.log('subscribersService', this.subscribersService);
      await lastValueFrom(this.subscribersService.emit('ping', req));
      return { done: true };
    } catch (error) {
      console.log('server', error);
    }
  }
}
