/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    })
  );

  // const configService = app.get(ConfigService);

  // const user = configService.get('RABBITMQ_USER');
  // const password = configService.get('RABBITMQ_PASSWORD');
  // const host = configService.get('RABBITMQ_HOST');
  // const queueName = configService.get('RABBITMQ_QUEUE_NAME');

  // await app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [`amqp://${user}:${password}@${host}`],
  //     queue: queueName,
  //     queueOptions: {
  //       durable: true,
  //     },
  //   },
  // });
  // await app.startAllMicroservices();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.DELIVERIES_PORT || 3333;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
