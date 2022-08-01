import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    // ClientsModule.register([
    //   {
    //     name: 'SUBSCRIBERS_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://localhost:5672'],
    //       queue: 'orders_queue',
    //       queueOptions: {
    //         durable: false,
    //       },
    //     },
    //   },
    // ]),
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'SUBSCRIBERS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = configService.get('RABBITMQ_USER');
        const password = configService.get('RABBITMQ_PASSWORD');
        const host = configService.get('RABBITMQ_HOST');
        const queueName = configService.get('RABBITMQ_QUEUE_NAME');

        try {
          const c = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${user}:${password}@${host}`],
              queue: queueName,
              queueOptions: {
                durable: false,
              },
            },
          });

          console.log('creating...');

          // c.send(
          //   {
          //     cmd: 'ping',
          //   },
          //   {
          //     msg: 'hello',
          //   }
          // );

          return c;
        } catch (error) {
          console.log('error', error);
          throw new Error('rabbit mq connection error:');
        }
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
