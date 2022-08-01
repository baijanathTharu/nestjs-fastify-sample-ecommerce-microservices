import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @EventPattern('ping')
  async message(@Payload() msg, @Ctx() context: RmqContext) {
    try {
      console.log('msg new', msg);

      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);

      return msg;
    } catch (error) {
      console.log('message receiving error');
      throw new Error('message receiving error');
    }
  }
}
